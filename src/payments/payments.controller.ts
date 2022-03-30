import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { ParseDatePipe } from './pipes/parse-date.pipe';

@Controller('payments')
@ApiTags('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  getPayments(@Query('date', ParseDatePipe) date: Date): string[] {
    return this.getPaymentDates(date);
  }

  private getPaymentDates(date: Date = new Date()): string[] {
    const paymentDates = this.paymentsService.getPaymentDates(date);
    return paymentDates.map((paymentDate) => paymentDate.toISOString().split('T')[0]);
  }
}
