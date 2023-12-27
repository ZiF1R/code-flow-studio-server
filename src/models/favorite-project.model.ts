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

interface FavoriteProjectAttributes {
  id: number;
  userId: number;
  projectId: number;
}

interface FavoriteProjectCreationAttributes extends FavoriteProjectAttributes {
  userId: number;
  projectId: number;
}

@Table({tableName: "favoriteProjects"})
export class FavoriteProject extends Model<FavoriteProjectAttributes, FavoriteProjectCreationAttributes> {
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
