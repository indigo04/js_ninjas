/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SuperheroesModule } from './superheroes/superheroes.module';


@Module({
  imports: [SuperheroesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
