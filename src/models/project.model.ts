import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import {UserPermissions} from "./user-permissions.model";
import {Team} from "./team.model";
import {User} from "./user.model";
import {Folder} from "./folder.model";
import {FilesFolder} from "./files-folder.model";

interface ProjectAttributes {
  id: number;
  userId: number;
  teamId?: number;
  folderId: number;
  name: string;
  codeName: string;
  template: boolean;
  public: boolean;
  description: string;
  freezed: boolean;
}

interface ProjectCreationAttributes extends ProjectAttributes {
  userId: number;
  teamId?: number;
  name: string;
  codeName: string;
  template: boolean;
  public: boolean;
  freezed: boolean;
}

@Table({tableName: "projects"})
export class Project extends Model<ProjectAttributes, ProjectCreationAttributes> {
  @ApiProperty({required: true})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

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
  @Column({ field: 'folderId', type: DataType.INTEGER, allowNull: true })
  folderId: number;

  // @BelongsToMany(() => Project, () => UserPermissions)
  // projectUserPermissions: UserPermissions[];
  //
  // @BelongsToMany(() => Project, () => FilesFolder)
  // projectFilesFolders: FilesFolder[];

  @ApiProperty({required: true})
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({required: true})
  @Column({ type: DataType.STRING, allowNull: false })
  code_name: string;

  @ApiProperty({required: false})
  @Column({ type: DataType.STRING, allowNull: true })
  description: string;

  @ApiProperty({required: true})
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  template: boolean;

  @ApiProperty({required: true})
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  public: boolean;

  @ApiProperty({required: true})
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  freezed: boolean;
}
