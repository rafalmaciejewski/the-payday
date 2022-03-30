import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  getPaymentDates(date: Date): Date[] {
    return [date];
  }
}
