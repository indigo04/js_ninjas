import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
} from 'sequelize-typescript';

@Table({ tableName: 'superheroes' })
export class Superhero extends Model {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
  })
  declare id: number;

  @Column
  nickname: string;

  @Column
  real_name: string;

  @Column
  origin_description: string;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  superpowers: string[];

  @Column
  catch_phrase: string;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  images: string[];
}
