/* eslint-disable camelcase */
import {
  Entity,
  PrimaryGeneratedColumn,
  Index,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';

@Entity('user')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id!: string;

  @Column({ name: 'name', length: 64 })
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  name!: string;

  @Column({ name: 'surname', length: 64 })
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  surname!: string;

  @Column({ name: 'username', length: 128, unique: true })
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  username!: string;

  @Column({ name: 'email', length: 128, unique: true })
  @IsEmail()
  @MaxLength(128)
  email!: string;

  @Column({ name: 'password', length: 72 })
  @IsString()
  @MinLength(8) // Real password min length
  @MaxLength(128) // Real password max length
  password!: string;

  @CreateDateColumn({ name: 'create_date' })
  create_date!: Date;

  @UpdateDateColumn({ name: 'update_date' })
  update_date!: Date;
}
