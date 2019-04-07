import { Table, Model, ForeignKey, PrimaryKey, Column } from "sequelize-typescript";
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

  @Column
  likeOrDislike!: number; 
}
