
import sequelize from 'sequelize';
import { Table, Column, Model, HasMany, PrimaryKey, CreatedAt, UpdatedAt, Scopes, AllowNull, BelongsTo, AutoIncrement, Unique, ForeignKey, BelongsToMany, DefaultScope, Default, IsUrl, Max, Min } from 'sequelize-typescript';
import jwt from 'jsonwebtoken';
import { Article } from './Article';
import { Channel } from './Channel';
import { UsersLikeArticles } from './UsersLikeArticles';
import { Comment } from './Comment';
import { FollowingUser } from './FollowingUser';
import { BlockingUser } from './BlockingUser';
import { UsersFollowChannels } from './UsersFollowChannels';
import { UsersLikeComments } from './UsersLikeComments';
import { Role } from './Role';
import { jwtSecret } from '../config';
import { UserHasRole } from './UserHasRole';

@DefaultScope({
  attributes: {
    exclude: [
      "password", 
      "facebookAccessToken", 
      "facebookRefreshToken",
      "googleAccessToken", 
      "googleRefreshToken",
  ]}, where: {
    toBeDeleted: false
  }
})
@Scopes({
  followerCount: {
    attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'followers']],
    include: [{
      model: () => User,
      as: "followers"
    }],
    group: 'id'
  },
})
@Table
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  id!: number;

  @Column
  nickname!: string;

  @Column
  email?: string;

  @AllowNull(true)
  @Column
  password?: string;

  @Default('false')
  @Column
  isBlockedByAdmin?: boolean;

  @IsUrl
  @Column
  profileUrl?: string;

  @Column
  description?: string;

  @Default(0)
  @Column
  experience!: number;

  @Default(1)
  @Min(0)
  @Max(50)
  @Column
  level!: number;

  @BelongsToMany(() => Role, () => UserHasRole, 'userId', 'roleId')
  roles!: Role[];

  authorize(requiredRoles: string[]): boolean {
    let result = false;
    Role.findAll({
      include: [{
        model: User,
        where: { id: this.id }
       }]
    }).then((roles) => {
      result = roles.filter((role) => requiredRoles.includes(role.roleName)).length > 0;
    })
    return result;
  }

  @AllowNull(true)
  @Column
  localToken?: string;

  generateJWT() {
    const today = new Date();
    const expireDate = new Date(today);
    expireDate.setDate(today.getDate() + 60);
    return jwt.sign({
      id: this.id,
      email: this.email,
      exp: expireDate.getTime() / 1000,
      nickname: this.nickname
    }, jwtSecret)
  }  

  toAuthJson() {
    return {
      email: this.email,
      token: this.generateJWT(),
      activated: false
    }
  }

  @AllowNull(true)
  @Column
  facebookAccessToken?: string;

  @AllowNull(true)
  @Column
  facebookRefreshToken?: string;

  @AllowNull(true)
  @Column
  googleAccessToken?: string;

  @AllowNull(true)
  @Column
  googleRefreshToken?: string;

  @Default(false)
  @Column
  toBeDeleted?: boolean;

  @Column
  toBeDeletedBy?: Date;

  @HasMany(()=>Article, 'articleWriterId')
  articlesWritten?: Article[]

  @BelongsToMany(() => Article, () => UsersLikeArticles, 'userId', 'articleId')
  likeArticles?: Article[];

  @BelongsToMany(() => Comment, () => UsersLikeComments, 'userId', 'articleId')
  likeComments?: Article[];

  @BelongsToMany(() => Channel, () => UsersFollowChannels, 'userId', 'channelId')
  followingChannels?: Channel[];

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