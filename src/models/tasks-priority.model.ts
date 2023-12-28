import {
  Column,
  DataType, ForeignKey,
  Model,
  Table
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface TasksPriorityAttributes {
  id: number;
  name: string;
}

interface TasksPriorityCreationAttributes extends TasksPriorityAttributes {
  name: string;
}

@Table({tableName: "tasksPriorities"})
export class TasksPriority extends Model<TasksPriorityAttributes, TasksPriorityCreationAttributes> {
  @ApiProperty({required: true})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({required: true})
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
}
