import { Injectable } from '@nestjs/common';

const MONTHS = 12;

@Injectable()
export class PaymentsService {
  getPaymentDates(date: Date): Date[] {
    const result = [];
    for (let i = 0; i < MONTHS; i++) {
      const paymentDate = new Date(date.getFullYear(), date.getMonth() + i, i > 0 ? 1 : date.getDate());
      result.push(this.getBasePaymentDate(paymentDate));
    }
    return result.filter(Boolean);
  }

  private isBusinessDay(date: Date): boolean {
    const weekday = date.getUTCDay();
    const SATURDAY = 6;
    const SUNDAY = 0;
    return weekday !== SUNDAY && weekday !== SATURDAY;
  }

  private getBasePaymentDate(date: Date): Date {
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    while (!this.isBusinessDay(lastDay)) {
      lastDay.setDate(lastDay.getDate() - 1);
    }
    return lastDay.getTime() > date.getTime() ? lastDay : null;
  }
}
