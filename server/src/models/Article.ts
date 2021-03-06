import { Table, Column, Model, HasMany, PrimaryKey, CreatedAt, UpdatedAt, Scopes, AllowNull, BelongsTo, ForeignKey, Unique, AutoIncrement, BelongsToMany, Default, DefaultScope } from 'sequelize-typescript';
import { User } from './User';
import { Channel } from './Channel';
import { Comment } from './Comment';
import { UsersLikeArticles } from './UsersLikeArticles';

@DefaultScope({
  where: {
    toBeDeleted: false
  }
})
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
  isVisible!: boolean;
  
  @Default(false)
  @Column
  toBeDeleted?: boolean;

  @Column
  toBeDeletedBy?: Date;

  @ForeignKey(() => User)
  @Column
  writerId!: number;

  @BelongsTo(() => User, 'articleWriterId')
  writer!: User;

  @BelongsToMany(() => User, () => UsersLikeArticles, 'userId', 'articleId')
  likedUsers?: User[];

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