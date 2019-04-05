import { Table, Model, ForeignKey, PrimaryKey, Column } from "sequelize-typescript";
import { User } from "./User";
import { Comment } from './Comment';


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