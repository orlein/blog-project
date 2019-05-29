import { Model, Table, PrimaryKey, AutoIncrement, Unique, Column, CreatedAt, UpdatedAt, Min, Max, BelongsToMany, HasMany, Default } from 'sequelize-typescript';
import { User } from './User';
import { UserHasRole } from './UserHasRole';

@Table
export class Role extends Model<Role> {

  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  id!: number;

  @Unique
  @Column
  roleName!: string;;

  @BelongsToMany(() => User, () => UserHasRole, 'userId', 'roleId')
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