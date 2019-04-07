import { Table, Model, PrimaryKey, Column, AutoIncrement, Unique, AllowNull, BelongsToMany, ForeignKey, BelongsTo, CreatedAt, UpdatedAt, Default } from 'sequelize-typescript';
import { User } from './User';
import { Article } from './Article';
import { UsersLikeComments } from './UsersLikeComments';
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

  @Default(true)
  @Column
  isVisible?: boolean;
  
  @ForeignKey(() => User)
  @Column
  commentWriterId!: number;

  @Column
  toBeDeleted?: boolean;

  @Column
  toBeDeletedBy?: Date;

  @BelongsToMany(() => User, () => UsersLikeComments, 'userId', 'commentId')
  likedUsers?: User[];

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
