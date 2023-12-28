import {
  Column,
  DataType, ForeignKey,
  Model,
  Table
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import {Task} from "./task.model";
import {User} from "./user.model";

interface TasksAssignAttributes {
  id: number;
  userId: number;
  taskId: number;
}

interface TasksAssignCreationAttributes extends TasksAssignAttributes {
  name: string;
  projectId: number;
}

@Table({tableName: "tasksAssigns"})
export class TasksAssign extends Model<TasksAssignAttributes, TasksAssignCreationAttributes> {
  @ApiProperty({required: true})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({required: true})
  @ForeignKey(() => User)
  @Column({ field: 'userId', type: DataType.INTEGER, allowNull: false })
  userId: number;

  @ApiProperty({required: true})
  @ForeignKey(() => Task)
  @Column({ field: 'taskId', type: DataType.INTEGER, allowNull: false })
  taskId: number;
}
