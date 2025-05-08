import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { Superhero } from './superhero.entity';
import { CreateHeroDto, RemoveHeroDTO, UpdateHeroDto } from './superhero.dto';

@Controller('superheroes')
export class SuperheroesController {
  constructor(private readonly superheroesService: SuperheroesService) {}

  @Get()
  getAll(): Promise<Superhero[]> {
    return this.superheroesService.findAll();
  }

  @Post('/create')
  createHero(@Body() superheroDTO: CreateHeroDto) {
    return this.superheroesService.createHero(superheroDTO);
  }

  @Patch('/edit/:id')
  updateHero(@Body() superheroDTO: UpdateHeroDto) {
    return this.superheroesService.editHero(superheroDTO);
  }

  @Delete('/remove/:id')
  removeHero(@Param() superheroDTO: RemoveHeroDTO) {
    return this.superheroesService.removeHero(superheroDTO.id);
  }
}
