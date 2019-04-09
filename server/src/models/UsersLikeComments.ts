import { Table, Model, ForeignKey, PrimaryKey, Column, Max, Min } from 'sequelize-typescript';
import { User } from "./User";
import { Comment } from './Comment';
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
  
  @Max(1)
  @Min(-1)
  @Column
  likeOrDislike!: number; 
}
