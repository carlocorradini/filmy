/* eslint-disable camelcase */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  Check,
  ManyToMany,
} from 'typeorm';
import { MinLength, MaxLength, IsString, IsUrl, IsDate, IsIn, MaxDate } from 'class-validator';
// eslint-disable-next-line import/no-cycle
import Film from './Film';
//
@Entity({ name: 'actor' })
@Check(`"gender" = 'M' OR "gender" = 'F'`)
export default class Actor {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  @Index()
  id!: number;

  @Column({ name: 'name', length: 128 })
  @IsString({ message: '$property must be a string type' })
  @MinLength(1, {
    message:
      '$property is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  @MaxLength(128, {
    message:
      '$property is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  name!: string;

  @Column({ name: 'surname', length: 128 })
  @IsString({ message: '$property must be a string type' })
  @MinLength(1, {
    message:
      '$property is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  @MaxLength(128, {
    message:
      '$property is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  surname!: string;

  @Column({ name: 'gender', type: 'character' })
  @IsString({ message: '$property must be a String type' })
  @IsIn(['M', 'F'], { message: "$property must be equals to 'M' or 'F'" })
  gender!: string;

  @Column({ name: 'birth_date', type: 'date' })
  @IsDate({ message: '$property must be a Date type' })
  @MaxDate(new Date(), { message: '$property must be a valid Date' })
  birth_date!: Date;

  @Column({ name: 'death_date', type: 'date', nullable: true })
  @IsDate({ message: '$property must be a Date type' })
  @MaxDate(new Date(), { message: '$property must be a valid Date' })
  death_date!: Date;

  @Column({ name: 'profile', length: 256 })
  @IsUrl()
  profile!: string;

  @CreateDateColumn({ name: 'create_date' })
  create_date!: Date;

  @UpdateDateColumn({ name: 'update_date' })
  update_date!: Date;

  // eslint-disable-next-line no-unused-vars
  @ManyToMany((type) => Film, (film) => film.actors, {
    primary: true,
    nullable: false,
  })
  films!: Film[];
}
