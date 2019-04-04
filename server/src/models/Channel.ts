import { Table, Model, PrimaryKey, Column, AutoIncrement, Unique, AllowNull, HasMany } from "sequelize-typescript";
import { Article } from "./Article";


@Table
export class Channel extends Model<Channel> {
  @PrimaryKey
  @Column
  @AutoIncrement
  @Unique
  id!: number;

  @Column
  @AllowNull(false)
  title!: string;

  @HasMany(() => Article)
  articles!: Article[];

}