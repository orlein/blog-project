import { Table, Model, PrimaryKey, Column, AutoIncrement, Unique, AllowNull, BelongsToMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./User";
import { Article } from "./Article";


@Table
export class Comment extends Model<Comment> {
  @PrimaryKey
  @Column
  @AutoIncrement
  @Unique
  id!: number;

  @Column
  @AllowNull(false)
  content!: string;
  
  @Column
  @AllowNull(true)
  imageUrl?: string;
  
  @ForeignKey(() => User)
  @Column
  commentWriterId!: number;

  @BelongsToMany(()=>Comment, ()=>CommentReply, 'commentId', 'replyId')
  replies?: Comment[];

  @ForeignKey(() => Article)
  @Column
  articleId!: number;

  @BelongsTo(() => Article)
  article!: Article;
  
  
}

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
