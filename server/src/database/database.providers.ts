import { Sequelize } from 'sequelize-typescript';
import { Superhero } from '../superheroes/superhero.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        username: 'postgres',
        password: 'jujuda1993',
        database: 'superheroes',
      });
      sequelize.addModels([Superhero]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
