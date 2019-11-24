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
  @PrimaryGeneratedColumn()
  @Index()
  id!: number;

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

  @Column({ name: 'password', length: 128 })
  @IsString()
  @MaxLength(128)
  password!: string;

  @CreateDateColumn({ name: 'create_date' })
  create_date!: Date;

  @UpdateDateColumn({ name: 'update_date' })
  update_date!: Date;
}
