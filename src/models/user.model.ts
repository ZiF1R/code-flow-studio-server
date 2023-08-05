import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserAttributes {
  email: string;
  name?: string;
  surname?: string;
  avatar_link?: string;
}

@Table({tableName: "users"})
export class User extends Model<User, UserAttributes> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string;

  @Column({type: DataType.STRING})
  nickname: string;

  @Column({type: DataType.STRING})
  name: string;

  @Column({type: DataType.STRING})
  surname: string;

  @Column({type: DataType.STRING})
  avatar_link: string;
}
