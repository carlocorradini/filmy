import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
export default class Film {
  @PrimaryGeneratedColumn()
  @Index()
  id!: number;

  @Column({
    unique: true,
  })
  title!: string;
}
