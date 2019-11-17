/* eslint-disable camelcase */
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

import { MinLength, MaxLength, IsString, IsInt, IsUrl, Min, Max, IsDate } from 'class-validator';
// eslint-disable-next-line import/no-cycle
import Actor from './Actor';

@Entity({ name: 'film' })
@Check(`"rating" BETWEEN 1 AND 100`)
export default class Film {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  @Index()
  id!: number;

  @Column({ name: 'title', unique: true, length: 256 })
  @IsString({ message: '$property must be a string type' })
  @MinLength(1, {
    message:
      '$property is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  @MaxLength(256, {
    message:
      '$property is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  title!: string;

  @Column({ name: 'rating', type: 'smallint' })
  @IsInt({ message: '$property must be an int type' })
  @Min(1, {
    message: '$property is too low. Minimal rating is $constraint1, but actual is $value',
  })
  @Max(100, {
    message: '$property is too high, Maximal rating is $constraint1, but actual is $value',
  })
  rating!: number;

  @Column({ name: 'release_date', type: 'date' })
  @IsDate({ message: '$property must be a Date type' })
  release_date!: Date;

  @Column({ name: 'poster', length: 256, unique: true })
  @IsUrl()
  poster!: string;

  @CreateDateColumn({ name: 'create_date' })
  create_date!: Date;

  @UpdateDateColumn({ name: 'update_date' })
  update_date!: Date;

  // eslint-disable-next-line no-unused-vars
  @ManyToMany((type) => Actor, (actor) => actor.films, {
    primary: true,
    nullable: false,
  })
  @JoinTable({
    name: 'film_actor',
    joinColumn: {
      name: 'film_id',
    },
    inverseJoinColumn: {
      name: 'actor_id',
    },
  })
  actors!: Actor[];
}
