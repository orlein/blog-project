import { Table, Column, Model, HasMany, PrimaryKey, CreatedAt, UpdatedAt, Scopes, AllowNull, BelongsTo, ForeignKey, Unique, AutoIncrement, BelongsToMany, Default } from 'sequelize-typescript';
import { User } from './User';
import { Channel } from './Channel';
import { Comment } from './Comment';
import { UsersLikeArticles } from './UsersLikeArticles';
import { UsersDislikeArticles } from './UsersDislikeArticles';
@Table
export class Article extends Model<Article> {

  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  id!: number;

  @Column
  title!: string;

  @Column
  content!: string;

  @Default(true)
  @Column
  isCommentVisible!: boolean;

  @ForeignKey(() => User)
  @Column
  writerId!: number;

  @BelongsTo(() => User, 'articleWriterId')
  writer!: User;

  @BelongsToMany(() => User, () => UsersLikeArticles, 'userId', 'articleId')
  likedUsers?: User[];

  @BelongsToMany(() => User, () => UsersDislikeArticles, 'userId', 'articleId')
  dislikedUsers?: User[];

  @HasMany(() => Comment)
  comments?: Comment[];

  @ForeignKey(() => Channel)
  @Column
  channelId!: number;

  @BelongsTo(() => Channel, 'articleChannelId')
  channel!: Channel;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}  