import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import {Project} from "./project.model";
import {User} from "./user.model";

interface VisitedProjectAttributes {
  id: number;
  userId: number;
  projectId: number;
}

interface VisitedProjectCreationAttributes extends VisitedProjectAttributes {
  userId: number;
  projectId: number;
}

@Table({tableName: "visitedProjects"})
export class VisitedProject extends Model<VisitedProjectAttributes, VisitedProjectCreationAttributes> {
  @ApiProperty({required: true})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({required: true})
  @ForeignKey(() => User)
  @Column({ field: 'userId', type: DataType.INTEGER, allowNull: false })
  userId: number;

  @ApiProperty({required: true})
  @ForeignKey(() => Project)
  @Column({ field: 'projectId', type: DataType.INTEGER, allowNull: false })
  projectId: number;
}
