import { Table, Column, Model, HasMany, PrimaryKey, CreatedAt, UpdatedAt, Scopes, AllowNull, BelongsTo, AutoIncrement, Unique, ForeignKey, BelongsToMany, DefaultScope } from 'sequelize-typescript';
import { User } from './User';


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