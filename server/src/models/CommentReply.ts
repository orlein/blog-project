import { Table, Model, PrimaryKey, Column, AutoIncrement, Unique, AllowNull, BelongsToMany, ForeignKey, BelongsTo, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Comment } from './Comment';

@Table
export class CommentReply extends Model<CommentReply> {
  @ForeignKey(()=>Comment)
  @PrimaryKey
  @Column
  commentId!: number;

  @ForeignKey(()=>Comment)
  @PrimaryKey
  @Column
  replyId!: number;
}
