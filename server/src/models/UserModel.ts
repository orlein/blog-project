import { Table, Column, Model, HasMany, PrimaryKey, CreatedAt, UpdatedAt, Scopes } from 'sequelize-typescript';

@Scopes({
  
})

@Table
class UserModel extends Model<UserModel> {
  
  @PrimaryKey
  @Column
  id!: string;

  @Column
  name!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

}