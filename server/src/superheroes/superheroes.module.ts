import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SuperheroesService } from './superheroes.service';
import { superheroesProviders } from './superheroes.provider';
import { SuperheroesController } from './superheroes.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [SuperheroesController],
  providers: [SuperheroesService, ...superheroesProviders],
})
export class SuperheroesModule {}
