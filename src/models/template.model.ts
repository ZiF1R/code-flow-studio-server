import {
  Column,
  DataType,
  Model,
  Table
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface TemplateAttributes {
  id: number;
  name: string;
  codeName?: string;
}

interface TemplateCreationAttributes extends TemplateAttributes {
  name: string;
  codeName?: string;
}

@Table({tableName: "templates"})
export class Template extends Model<TemplateAttributes, TemplateCreationAttributes> {
  @ApiProperty({required: true})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({required: true})
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({required: false})
  @Column({ type: DataType.STRING, allowNull: true })
  codeName: string;
}
