import { PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";

export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}