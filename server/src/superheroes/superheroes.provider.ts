import { Superhero } from './superhero.entity';

export const superheroesProviders = [
  {
    provide: 'SUPERHEROES_REPOSITORY',
    useValue: Superhero,
  },
];
