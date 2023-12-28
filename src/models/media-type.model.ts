import {
  Column,
  DataType,
  Model,
  Table
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface MediaTypeAttributes {
  id: number;
  name: string;
}

interface MediaTypeCreationAttributes extends MediaTypeAttributes {
  name: string;
}

@Table({tableName: "mediaTypes"})
export class MediaType extends Model<MediaTypeAttributes, MediaTypeCreationAttributes> {
  @ApiProperty({required: true})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({required: true})
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
}
