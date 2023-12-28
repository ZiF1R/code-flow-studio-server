import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import {Message} from "./message.model";
import {MediaType} from "./media-type.model";

interface MessageMediaAttributes {
  id: number;
  messageId: number;
  typeId: number;
  link: string;
}

interface MessageMediaCreationAttributes extends MessageMediaAttributes {
  messageId: number;
  typeId: number;
  link: string;
}

@Table({tableName: "messagesMedia"})
export class MessageMedia extends Model<MessageMediaAttributes, MessageMediaCreationAttributes> {
  @ApiProperty({required: true})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({required: true})
  @ForeignKey(() => Message)
  @Column({ field: 'messageId', type: DataType.INTEGER, allowNull: false })
  messageId: number;

  @ApiProperty({required: true})
  @ForeignKey(() => MediaType)
  @Column({ field: 'typeId', type: DataType.INTEGER, allowNull: false })
  typeId: number;

  @ApiProperty({required: true})
  @Column({ type: DataType.STRING, allowNull: false })
  link: string;
}
