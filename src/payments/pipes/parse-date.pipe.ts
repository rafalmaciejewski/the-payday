import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform<string> {
  transform(value: string): Date {
    if (!value) {
      return;
    }
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new BadRequestException('Invalid date');
    }
    return date;
  }
}
