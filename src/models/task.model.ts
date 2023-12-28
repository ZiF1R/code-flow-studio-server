import {
  Column,
  DataType, ForeignKey,
  Model,
  Table
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import {Project} from "./project.model";
import {User} from "./user.model";
import {TasksColumn} from "./tasks-column.model";

interface TaskAttributes {
  id: number;
  name: string;
  userId: number;
  projectId: number;
  columnId: number;
  parentId?: number;
  deadline?: Date;
}

interface TaskCreationAttributes extends TaskAttributes {
  name: string;
  userId: number;
  projectId: number;
  columnId: number;
}

@Table({tableName: "tasks"})
export class Task extends Model<TaskAttributes, TaskCreationAttributes> {
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

  @ApiProperty({required: true})
  @ForeignKey(() => Project)
  @Column({ field: 'projectId', type: DataType.INTEGER, allowNull: false })
  projectId: number;

  @ApiProperty({required: true})
  @ForeignKey(() => TasksColumn)
  @Column({ field: 'columnId', type: DataType.INTEGER, allowNull: false })
  columnId: number;

  @ApiProperty({required: false})
  @ForeignKey(() => Task)
  @Column({ field: 'parentId', type: DataType.INTEGER, allowNull: true })
  parentId: number;

  @ApiProperty({required: false})
  @Column({ field: 'deadline', type: DataType.DATE, allowNull: true })
  deadline: Date;
}
