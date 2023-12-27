import {
  BelongsTo, BelongsToMany,
  Column,
  DataType,
  ForeignKey, HasMany,
  Model,
  Table
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "./user.model";
import { TeamMember } from "./team-member.model";
import {Invitation} from "./invitation.model";
import {UserPermissions} from "./user-permissions.model";

interface TeamAttributes {
  id: number;
  adminId: number;
  name: string;
  picture?: string;
}

interface TeamCreationAttributes extends TeamAttributes {
  adminId: number;
  name: string;
  picture?: string;
}

@Table({tableName: "teams"})
export class Team extends Model<TeamAttributes, TeamCreationAttributes> {
  @ApiProperty({required: true})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({required: true})
  @Column({type: DataType.STRING, allowNull: false})
  name: string;

  @ApiProperty({required: true})
  @ForeignKey(() => User)
  @Column({ field: 'adminId', type: DataType.INTEGER, allowNull: false })
  adminId: number;

  @BelongsTo(() => User, 'adminId')
  admin: User;

  @ApiProperty({required: false})
  @Column({type: DataType.STRING})
  picture: string;

  @BelongsToMany(() => User, () => TeamMember)
  memberOfTeam: TeamMember[];

  @BelongsToMany(() => User, () => Invitation)
  teamInvitations: Invitation[];

  @BelongsToMany(() => User, () => UserPermissions)
  teamUserPermissions: UserPermissions[];
}
