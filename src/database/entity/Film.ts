import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  Check,
} from 'typeorm';

import { MinLength, MaxLength, IsString, IsInt, IsDate, IsUrl } from 'class-validator';
import Actor from './Actor';

@Entity()
@Check(`"rating" >= 1 AND "rating" <= 100`)
export default class Film {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Index()
  id!: number;

  @Column({
    unique: true,
    length: 256,
  })
  @IsString({ message: 'Title must be a string type' })
  @MinLength(1, {
    message: 'Title is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  @MaxLength(256, {
    message: 'Title is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  title!: string;

  @Column({
    type: 'smallint',
    default: 1,
  })
  @IsInt({ message: 'Rating must be an int type' })
  @MinLength(1, {
    message: 'Rating is too low. Minimal rating is $constraint1, but actual is $value',
  })
  @MaxLength(100, {
    message: 'Rating is too high, Maximal rating is $constraint1, but actual is $value',
  })
  rating!: number;

  @Column({ type: 'date' })
  @IsDate({ message: 'Release Date must be a Date type' })
  releaseDate!: Date;

  @Column({
    length: 256,
  })
  @IsUrl()
  poster!: string;

  @CreateDateColumn()
  createDate!: Date;

  @UpdateDateColumn()
  updateDate!: Date;

  // eslint-disable-next-line no-unused-vars
  @ManyToMany((type) => Actor)
  @JoinTable()
  actors!: Actor[];
}
