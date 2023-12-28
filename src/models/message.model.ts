import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import {User} from "./user.model";
import {Project} from "./project.model";

interface MessageAttributes {
  id: number;
  userId: number;
  projectId: number;
  text?: string;
  read: boolean;
  replyToId?: number;
}

interface MessageCreationAttributes extends MessageAttributes {
  userId: number;
  projectId: number;
  text?: string;
  read: boolean;
}

@Table({tableName: "messages"})
export class Message extends Model<MessageAttributes, MessageCreationAttributes> {
  @ApiProperty({required: true})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({required: true})
  @ForeignKey(() => User)
  @Column({ field: 'userId', type: DataType.INTEGER, allowNull: false })
  userId: number;

  @ApiProperty({required: true})
  @ForeignKey(() => Project)
  @Column({ field: 'projectId', type: DataType.INTEGER, allowNull: false })
  projectId: number;

  @ApiProperty({required: false})
  @Column({ type: DataType.STRING, allowNull: true })
  text: string;

  @ApiProperty({required: true})
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  read: boolean;
}
