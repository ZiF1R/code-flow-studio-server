import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserAttributes {
  email: string;
  token: string;
  name: string;
  surname: string;
}

@Table({tableName: "users"})
export class Users extends Model<Users, UserAttributes> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string;

  @Column({type: DataType.STRING, allowNull: false})
  token: string;

  @Column({type: DataType.STRING})
  nickname: string;

  @Column({type: DataType.STRING, allowNull: false})
  name: string;

  @Column({type: DataType.STRING, allowNull: false})
  surname: string;

  @Column({type: DataType.STRING, defaultValue: 'placeholder.png'})
  avatar_link: string;

  // @Column({type: DataType.DATE, allowNull: false})
  // created_date: string;
}
