import { PromModule } from '@digikare/nestjs-prom';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    PaymentsModule,
    PromModule.forRoot({
      withDefaultsMetrics: true,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
