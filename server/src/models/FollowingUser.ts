import { Table, Column, Model, HasMany, PrimaryKey, CreatedAt, UpdatedAt, Scopes, AllowNull, BelongsTo, AutoIncrement, Unique, ForeignKey, BelongsToMany, DefaultScope } from 'sequelize-typescript';
import { User } from './User';

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