import { PromModule } from '@digikare/nestjs-prom';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [
    PromModule.forRoot({
      withDefaultsMetrics: true,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
