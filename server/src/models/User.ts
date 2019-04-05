import { Table, Column, Model, HasMany, PrimaryKey, CreatedAt, UpdatedAt, Scopes, AllowNull, BelongsTo, AutoIncrement, Unique, ForeignKey, BelongsToMany, DefaultScope } from 'sequelize-typescript';
import { Article } from './Article';
import { Channel } from './Channel';
import sequelize from 'sequelize';
import { UsersLikeArticles } from './UsersLikeArticles';
import { UsersDislikeArticles } from './UsersDislikeArticles';
import { FollowingUser } from './FollowingUser';
import { BlockingUser } from './BlockingUser';
import { UsersFollowChannels } from './UsersFollowChannels';
@DefaultScope({
  attributes: ['id', 'nickname', 'email', 'createdAt']
})
@Scopes({
  followerCount: {
    attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'followers']],
    include: [{
      model: () => User,
      as: "followers"
    }],
    group: 'id'
  }
})
@Table
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  id!: number;

  @Column
  nickname!: string;

  @Column
  email?: string;

  @AllowNull(true)
  @Column
  password?: string;

  @AllowNull(true)
  @Column
  facebookAccessToken?: string;

  @AllowNull(true)
  @Column
  facebookRefreshToken?: string;

  @AllowNull(true)
  @Column
  googleAccessToken?: string;

  @AllowNull(true)
  @Column
  googleRefreshToken?: string;

  @HasMany(()=>Article, 'articleWriterId')
  articlesWritten?: Article[]

  @BelongsToMany(() => Article, () => UsersLikeArticles, 'userId', 'articleId')
  likeArticles?: Article[];

  @BelongsToMany(() => Article, () => UsersDislikeArticles, 'userId', 'articleId')
  dislikeArticles?: Article[];

  @BelongsToMany(() => Channel, () => UsersFollowChannels, 'userId', 'channelId')
  folloingChannels?: Channel[];

  @BelongsToMany(() => User, () => FollowingUser, 'followeeId', 'followerId')
  followers?: User[];

  @BelongsToMany(() => User, () => BlockingUser, 'blockeeId', 'blockerId')
  blockingUsers?: User[];
  
  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}