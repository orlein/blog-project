import { Table, Model, ForeignKey, PrimaryKey, Column } from "sequelize-typescript";
import { User } from "./User";
import { Channel } from "./Channel";

@Table
export class UsersFollowChannels extends Model<UsersFollowChannels> {
  @ForeignKey(() => User)
  @PrimaryKey
  @Column
  userId!: number;

  @ForeignKey(() => Channel)
  @PrimaryKey
  @Column
  channelId!: number;
}