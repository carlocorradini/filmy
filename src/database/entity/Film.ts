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
import { MinLength, MaxLength, IsString, IsInt, IsUrl, Min, Max, IsISO8601 } from 'class-validator';
// eslint-disable-next-line import/no-cycle
import Actor from './Actor';

@Entity({ name: 'film' })
@Check(`"rating" BETWEEN 1 AND 100`)
export default class Film {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  @Index()
  id!: number;

  @Column({ name: 'title', length: 256 })
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
  @IsISO8601({ message: '$property must be a valid Date' })
  release_date!: string;

  @Column({ name: 'poster', length: 256, unique: true })
  @IsUrl()
  poster!: string;

  @CreateDateColumn({ name: 'create_date' })
  create_date!: Date;

  @UpdateDateColumn({ name: 'update_date' })
  update_date!: Date;

  @ManyToMany(
    // eslint-disable-next-line no-unused-vars
    (type) => Actor,
    (actor) => actor.films,
    { primary: true, nullable: false }
  )
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
