import { Table, Column, Model, HasMany, PrimaryKey, CreatedAt, UpdatedAt, Scopes, AllowNull, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { User } from './User';
import { Comment, Channel } from '.';

@Table
export class Article extends Model<Article> {

  @PrimaryKey
  @Column
  id!: number;

  @Column
  title!: string;

  @Column
  content!: string;

  @ForeignKey(() => User)
  @Column
  writerId!: number;

  @BelongsTo(() => User)
  writer!: User;

  @BelongsTo(() => User, 'likedUserId')
  likedUsers?: User[];

  @HasMany(() => Comment)
  comments?: Comment[];

  @BelongsTo(() => Channel)
  channel!: Channel;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}  