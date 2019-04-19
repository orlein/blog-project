import { Table, Model, ForeignKey, PrimaryKey, Column } from "sequelize-typescript";
import { User } from "./User";
import { Role } from "./Role";

@Table
export class UserHasRole extends Model<UserHasRole> {
  @ForeignKey(() => User)
  @PrimaryKey
  @Column
  userId!: number;

  @ForeignKey(() => Role)
  @PrimaryKey
  @Column
  roleId!: number;
}