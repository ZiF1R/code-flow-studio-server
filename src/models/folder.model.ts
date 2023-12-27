import {
  Column,
  DataType,
  ForeignKey, Index,
  Model,
  Table
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import {Team} from "./team.model";
import {User} from "./user.model";

interface FolderAttributes {
  id: number;
  name: string;
  teamId: number;
  userId: number;
  parentId?: number;
}

interface FolderCreationAttributes extends FolderAttributes {
  name: string;
  teamId: number;
  userId: number;
}

@Table({tableName: "folders"})
export class Folder extends Model<FolderAttributes, FolderCreationAttributes> {
  @ApiProperty({required: true})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({required: true})
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({required: true})
  @ForeignKey(() => User)
  @Column({ field: 'userId', type: DataType.INTEGER, allowNull: false })
  userId: number;

  @ApiProperty({required: false})
  @ForeignKey(() => Team)
  @Column({ field: 'teamId', type: DataType.INTEGER, allowNull: true })
  teamId: number;

  @ApiProperty({required: false})
  @ForeignKey(() => Folder)
  @Column({ field: 'parentId', type: DataType.INTEGER, allowNull: true })
  parentId: number;
}
