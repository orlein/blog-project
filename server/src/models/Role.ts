import { Model, Table, PrimaryKey, AutoIncrement, Unique, Column, CreatedAt, UpdatedAt, Min, Max, BelongsToMany, HasMany, Default } from 'sequelize-typescript';
import { User } from './User';

@Table
export class Role extends Model<Role> {

  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  id!: number;

  @Column
  roleName!: string;;

  @HasMany(() => User, 'userId')
  usersHasRole?: User[];

  @Default(false)
  @Column
  toBeDeleted?: boolean;

  @Column
  toBeDeletedBy?: Date;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}