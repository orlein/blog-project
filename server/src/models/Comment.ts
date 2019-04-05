import { Table, Model, PrimaryKey, Column, AutoIncrement, Unique, AllowNull, BelongsToMany, ForeignKey, BelongsTo, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { User } from './User';
import { Article } from './Article';
import { UsersLikeComments } from './UsersLikeComments';
import { UsersDislikeComments } from './UsersDislikeComments';
import { CommentReply } from './CommentReply';


@Table
export class Comment extends Model<Comment> {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  id!: number;

  @AllowNull(false)
  @Column
  content!: string;
  
  @AllowNull(true)
  @Column
  imageUrl?: string;
  
  @ForeignKey(() => User)
  @Column
  commentWriterId!: number;

  @BelongsToMany(() => User, () => UsersLikeComments, 'userId', 'commentId')
  likedUsers?: User[];

  @BelongsToMany(() => User, () => UsersDislikeComments, 'userId', 'commentId')
  dislikedUsers?: User[];

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
