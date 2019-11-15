import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  Check,
} from 'typeorm';

import { MinLength, MaxLength, IsString, IsDate, IsPositive, IsUrl, Equals } from 'class-validator';

@Entity()
@Check(`"gender" = 'M' OR "gender" = 'F'`)
export default class Actor {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Index()
  @IsPositive({ message: 'Id must be a positive number, but actual is $value' })
  id!: number;

  @Column({
    length: 128,
  })
  @IsString({ message: 'Name must be a string type' })
  @MinLength(1, {
    message: 'Name is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  @MaxLength(128, {
    message: 'Name is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  name!: string;

  @Column({
    length: 128,
  })
  @IsString({ message: 'Surname must be a string type' })
  @MinLength(1, {
    message:
      'Surname is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  @MaxLength(128, {
    message: 'Surname is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  surname!: string;

  @Column({
    type: 'character',
  })
  @IsString({ message: 'Genger must be a String type' })
  @Equals(['M', 'F'], { message: "Gender must be equals to 'M' or 'F'" })
  gender!: string;

  @Column({ type: 'date' })
  @IsDate({ message: 'Birth Date must be a Date type' })
  birthDate!: Date;

  @Column({
    type: 'date',
    nullable: true,
  })
  @IsDate({ message: 'Death Date must be a Date type' })
  deathDate!: Date;

  @Column({
    length: 128,
    default: 'empty.png',
  })
  @IsUrl()
  profile!: string;

  @CreateDateColumn()
  createDate!: Date;

  @UpdateDateColumn()
  updateDate!: Date;
}
