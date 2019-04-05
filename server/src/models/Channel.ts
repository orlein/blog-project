import { Table, Model, PrimaryKey, Column, AutoIncrement, Unique, AllowNull, HasMany, BelongsToMany } from "sequelize-typescript";
import { Article } from "./Article";
import { User } from "./User";
import { UsersFollowChannels } from "./UsersFollowChannels";


@Table
export class Channel extends Model<Channel> {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  id!: number;

  @AllowNull(false)
  @Column
  title!: string;

  @HasMany(() => Article, 'articleChannelId')
  articles!: Article[];

  @AllowNull(true)
  @Column
  description?: string;

  @BelongsToMany(() => User, () => UsersFollowChannels, 'userId', 'channelId')
  followers!: User[];

}