import {
  Column,
  DataType, ForeignKey,
  Model,
  Table
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import {Project} from "./project.model";

interface TasksColumnAttributes {
  id: number;
  name: string;
  projectId: number;
}

interface TasksColumnCreationAttributes extends TasksColumnAttributes {
  name: string;
  projectId: number;
}

@Table({tableName: "tasksColumns"})
export class TasksColumn extends Model<TasksColumnAttributes, TasksColumnCreationAttributes> {
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
}
