import { Table, Column, Model, HasMany, PrimaryKey, CreatedAt, UpdatedAt, Scopes, AllowNull, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { User } from './User';
import { Comment } from './Comment';
import { Channel } from './Channel';

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

  @HasMany(() => Comment)
  comments?: Comment[];

  @BelongsTo(() => Channel)
  channel!: Channel;

}  