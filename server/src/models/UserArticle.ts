import { Table, Model, ForeignKey, PrimaryKey, Column } from "sequelize-typescript";
import { User, Article } from ".";

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
}

@Table
export class UsersDislikeArticles extends Model<UsersDislikeArticles> {
  @ForeignKey(() => User)
  @PrimaryKey
  @Column
  userId!: number;

  @ForeignKey(() => Article)
  @PrimaryKey
  @Column
  articleId!: number;
}