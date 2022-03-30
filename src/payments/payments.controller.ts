import { Controller, Get, Header, Query, Res } from '@nestjs/common';
import { ApiHeader, ApiHeaders, ApiParam, ApiProduces, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { PaymentsService } from './payments.service';
import { ParseDatePipe } from './pipes/parse-date.pipe';

@Controller('payments')
@ApiTags('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  @ApiParam({
    name: 'date',
    description: 'Date to get payments for',
    type: 'string',
    format: 'date',
    required: false,
  })
  getPayments(@Query('date', ParseDatePipe) date: Date): string[] {
    return this.getPaymentDates(date);
  }

  @Get('/csv')
  @Header('Content-Type', 'text/csv')
  @ApiParam({
    name: 'date',
    description: 'Date to get payments for',
    type: 'string',
    format: 'date',
    required: false,
  })
  getPaymentsCSV(@Query('date', ParseDatePipe) date: Date, @Res() res: Response): void {
    const paymentDates = this.getPaymentDates(date);
    res.attachment('payments.csv');
    res.send(paymentDates.join('\n'));
  }

  private getPaymentDates(date: Date = new Date()): string[] {
    const paymentDates = this.paymentsService.getPaymentDates(date);
    return paymentDates.map((paymentDate) => paymentDate.toISOString().split('T')[0]);
  }
}
