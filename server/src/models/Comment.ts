import { Table, Model, PrimaryKey, Column, AutoIncrement, Unique, AllowNull, BelongsToMany, ForeignKey, BelongsTo, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { User, Article, UsersLikeComments, UsersDislikeComments } from '.';


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

  @BelongsToMany(() => User, () => UsersLikeComments)
  likes?: Article[];

  @BelongsToMany(() => User, () => UsersDislikeComments )
  dislikes?: Article[];

  @BelongsToMany(()=>Comment, ()=>CommentReply, 'commentId', 'replyId')
  replies?: Comment[];

  @ForeignKey(() => Article)
  @Column
  articleId!: number;

  @BelongsTo(() => Article)
  article!: Article;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
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
