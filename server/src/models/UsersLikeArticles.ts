import { Table, Model, ForeignKey, PrimaryKey, Column, Max, Min } from "sequelize-typescript";
import { User } from "./User";
import { Article } from "./Article";

@Table
export class UsersLikeArticles extends Model<UsersLikeArticles> {
  @ForeignKey(() => User)
  @PrimaryKey
  @Column
  userId!: number;

  @ForeignKey(() => Article)
  @PrimaryKey
  @Column
  articleId!: number;

  @Max(1)
  @Min(-1)
  @Column
  likeOrDislike!: number; 
}
