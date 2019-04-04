import { Table, Column, Model, HasMany, PrimaryKey, CreatedAt, UpdatedAt, Scopes, AllowNull, BelongsTo, AutoIncrement, Unique, ForeignKey, BelongsToMany } from 'sequelize-typescript';
import { Article } from './Article';
import { Channel } from './Channel';
@Table
export class User extends Model<User> {
  @PrimaryKey
  @Column
  @AutoIncrement
  @Unique
  id!: number;

  @Column
  nickname!: string;

  @Column
  email?: string;

  @Column
  @AllowNull(true)
  password?: string;

  @Column
  facebookId!: string;

  @HasMany(()=>Article)
  articlesWritten?: Article[];

  @HasMany(() => Channel)
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

@Table
export class FollowingUser extends Model<FollowingUser> {
  @ForeignKey(() => User)
  @PrimaryKey
  @Column
  followerId!: number;

  @ForeignKey(() => User)
  @PrimaryKey
  @Column
  followeeId!: number;
}

@Table
export class BlockingUser extends Model<BlockingUser> {
  @ForeignKey(() => User)
  @PrimaryKey
  @Column
  blockerId!: number;

  @ForeignKey(() => User)
  @PrimaryKey
  @Column
  blockeeId!: number; 
}