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

interface InvitationAttributes {
  id: number;
  teamId: number;
  fromUserId: number;
  toUserId: number;
  accepted: boolean;
}

interface InvitationCreationAttributes extends InvitationAttributes {
  teamId: number;
  fromUserId: number;
  toUserId: number;
}

@Table({tableName: "invitations"})
export class Invitation extends Model<InvitationAttributes, InvitationCreationAttributes> {
  @ApiProperty({required: true})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({required: true})
  @ForeignKey(() => Team)
  @Column({ field: 'teamId', type: DataType.INTEGER, allowNull: false })
  teamId: number;

  @ApiProperty({required: true})
  @ForeignKey(() => User)
  @Column({ field: 'fromUserId', type: DataType.INTEGER, allowNull: false })
  fromUserId: number;

  @ApiProperty({required: true})
  @ForeignKey(() => User)
  @Column({ field: 'toUserId', type: DataType.INTEGER, allowNull: false })
  toUserId: number;

  @ApiProperty({required: false, default: false})
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  accepted: boolean;
}
