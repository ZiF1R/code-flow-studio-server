import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import {Project} from "./project.model";

interface FilesFolderAttributes {
  id: number;
  name: string;
  projectId: number;
  parentId?: number;
}

interface FilesFolderCreationAttributes extends FilesFolderAttributes {
  name: string;
  projectId: number;
}

@Table({tableName: "filesFolders"})
export class FilesFolder extends Model<FilesFolderAttributes, FilesFolderCreationAttributes> {
  @ApiProperty({required: true})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({required: true})
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({required: true})
  @ForeignKey(() => Project)
  @Column({ field: 'projectId', type: DataType.INTEGER, allowNull: false })
  projectId: number;

  @ApiProperty({required: false})
  @ForeignKey(() => FilesFolder)
  @Column({ field: 'parentId', type: DataType.INTEGER, allowNull: true })
  parentId: number;
}
