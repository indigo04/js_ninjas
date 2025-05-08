import { Injectable, Inject } from '@nestjs/common';
import { Superhero } from './superhero.entity';
import { CreateHeroDto, UpdateHeroDto } from './superhero.dto';

@Injectable()
export class SuperheroesService {
  constructor(
    @Inject('SUPERHEROES_REPOSITORY')
    private superheroesRepository: typeof Superhero,
  ) {}

  async findAll(): Promise<Superhero[]> {
    return this.superheroesRepository.findAll<Superhero>();
  }

  async createHero(hero: CreateHeroDto): Promise<Superhero> {
    const {
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
      images,
    } = hero;
    return this.superheroesRepository.create<Superhero>({
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
      images,
    });
  }

  async removeHero(id: string): Promise<number> {
    return this.superheroesRepository.destroy<Superhero>({ where: { id } });
  }

  async editHero(newhero: UpdateHeroDto): Promise<[affectedCount: number]> {
    const { id } = newhero;
    return this.superheroesRepository.update<Superhero>(newhero, {
      where: { id },
    });
  }
}
