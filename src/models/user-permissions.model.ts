import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "./user.model";
import {Team} from "./team.model";
import {Project} from "./project.model";

interface UserPermissionsAttributes {
  id: number;
  userId: number;
  teamId: number;
  projectId: number;
  edit: boolean;
  chatRead: boolean;
  chatAccess: boolean;
  tasksRead: boolean;
  tasksAccess: boolean;
}

interface UserPermissionsCreationAttributes extends UserPermissionsAttributes {
  userId: number;
  teamId: number;
  projectId: number;
  edit: boolean;
  chatRead: boolean;
  chatAccess: boolean;
  tasksRead: boolean;
  tasksAccess: boolean;
}

@Table({tableName: "userPermissions"})
export class UserPermissions extends Model<UserPermissionsAttributes, UserPermissionsCreationAttributes> {
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
  @ForeignKey(() => Project)
  @Column({ field: 'projectId', type: DataType.INTEGER, allowNull: true })
  projectId: number;

  @ApiProperty({required: true})
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  edit: boolean;

  @ApiProperty({required: true})
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  chatRead: boolean;

  @ApiProperty({required: true})
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  chatAccess: boolean;

  @ApiProperty({required: true})
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  tasksRead: boolean;

  @ApiProperty({required: true})
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  tasksAccess: boolean;
}
