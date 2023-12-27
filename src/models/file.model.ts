import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import {Project} from "./project.model";
import {FilesFolder} from "./files-folder.model";

interface FileAttributes {
  id: number;
  name: string;
  content: typeof Blob;
  projectId: number;
  folderId?: number;
}

interface FileCreationAttributes extends FileAttributes {
  name: string;
  content: typeof Blob;
  projectId: number;
}

@Table({tableName: "files"})
export class File extends Model<FileAttributes, FileCreationAttributes> {
  @ApiProperty({required: true})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({required: true})
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({required: true})
  @Column({ type: DataType.BLOB, allowNull: false })
  content: typeof Blob;

  @ApiProperty({required: true})
  @ForeignKey(() => Project)
  @Column({ field: 'projectId', type: DataType.INTEGER, allowNull: false })
  projectId: number;

  @ApiProperty({required: false})
  @ForeignKey(() => FilesFolder)
  @Column({ field: 'folderId', type: DataType.INTEGER, allowNull: true })
  folderId: number;
}
