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
import { MinLength, MaxLength, IsString, IsUrl, IsIn, IsISO8601 } from 'class-validator';
// eslint-disable-next-line import/no-cycle
import Film from './Film';

@Entity({ name: 'actor' })
@Check(`"gender" = 'M' OR "gender" = 'F'`)
export default class Actor {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
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
  @IsISO8601({ message: '$property must be a valid Date, but actual is $value' })
  birth_date!: string;

  @Column({ name: 'death_date', type: 'date', nullable: true })
  @IsISO8601({ message: '$property must be a valid Date, but actual is $value' })
  death_date!: string;

  @Column({ name: 'profile', length: 256 })
  @IsUrl()
  profile!: string;

  @CreateDateColumn({ name: 'create_date' })
  create_date!: Date;

  @UpdateDateColumn({ name: 'update_date' })
  update_date!: Date;

  @ManyToMany(
    // eslint-disable-next-line no-unused-vars
    (type) => Film,
    (film) => film.actors,
    {
      primary: true,
      nullable: false,
    }
  )
  films!: Film[];
}
