import { Table, Model, ForeignKey, PrimaryKey, Column } from "sequelize-typescript";
import { User, Comment } from ".";

@Table
export class UsersLikeComments extends Model<UsersLikeComments> {
  @ForeignKey(() => User)
  @PrimaryKey
  @Column
  userId!: number;

  @ForeignKey(() => Comment)
  @PrimaryKey
  @Column
  commentId!: number;
}

@Table
export class UsersDislikeComments extends Model<UsersDislikeComments> {
  @ForeignKey(() => User)
  @PrimaryKey
  @Column
  userId!: number;

  @ForeignKey(() => Comment)
  @PrimaryKey
  @Column
  commentId!: number;
}