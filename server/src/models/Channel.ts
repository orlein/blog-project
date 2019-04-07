import { Table, Model, PrimaryKey, Column, AutoIncrement, Unique, AllowNull, HasMany, BelongsToMany, Max, Min } from 'sequelize-typescript';
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

  @Min(-1)
  @Max(50)
  @Column
  writeRestriction!: number

  @Min(-1)
  @Max(50)
  @Column
  readRestriction!: number

  @HasMany(() => Article, 'articleChannelId')
  articles!: Article[];

  @AllowNull(true)
  @Column
  description?: string;

  @BelongsToMany(() => User, () => UsersFollowChannels, 'userId', 'channelId')
  followers!: User[];

}