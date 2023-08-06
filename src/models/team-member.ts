import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Team } from "./team.model";
import { User } from "./user.model";

interface TeamMemberAttributes {
  id: number;
  teamId: number;
  userId: number;
}

interface TeamMemberCreationAttributes extends TeamMemberAttributes {
  teamId: number;
  userId: number;
}

@Table({tableName: "teamMembers"})
export class TeamMember extends Model<TeamMemberAttributes, TeamMemberCreationAttributes> {
  @ApiProperty({required: true})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({required: true})
  @ForeignKey(() => Team)
  @Column({ field: 'teamId', type: DataType.INTEGER, allowNull: false })
  teamId: number;

  @ApiProperty({required: true})
  @ForeignKey(() => User)
  @Column({ field: 'userId', type: DataType.INTEGER, allowNull: false })
  userId: number;
}
