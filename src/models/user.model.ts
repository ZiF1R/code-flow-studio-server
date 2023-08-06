import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Team } from "./team.model";
import { TeamMember } from "./team-member";

interface UserAttributes {
  id: number;
  accessToken: string;
  githubAccessToken?: string;
  refreshToken?: string;
  email: string;
  username?: string;
  name?: string;
  surname?: string;
  picture?: string;
}

interface UserCreationAttributes extends UserAttributes {
  accessToken: string;
  email: string;
  username?: string;
  name?: string;
  surname?: string;
  picture?: string;
}

@Table({tableName: "users"})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @ApiProperty({required: true})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({required: true})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string;

  @ApiProperty({required: false})
  @Column({type: DataType.STRING})
  username: string;

  @ApiProperty({required: false})
  @Column({type: DataType.STRING})
  name: string;

  @ApiProperty({required: false})
  @Column({type: DataType.STRING})
  surname: string;

  @ApiProperty({required: false})
  @Column({type: DataType.STRING})
  picture: string;

  @ApiProperty({required: true})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  accessToken: string;

  @ApiProperty({required: false})
  @Column({type: DataType.STRING, unique: true})
  githubAccessToken: string;

  @ApiProperty({required: false})
  @Column({type: DataType.STRING, unique: true})
  refreshToken: string;

  @HasMany(() => Team, 'adminId')
  adminOfTeams: Team[];

  @BelongsToMany(() => Team, () => TeamMember)
  userAsTeamMember: Team[];
}
