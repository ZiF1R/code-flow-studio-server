import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserAttributes {
  id: number;
  accessToken: string;
  githubAccessToken?: string;
  refreshToken?: string;
  email: string;
  username?: string;
  name?: string;
  surname?: string;
  picture?: string;
}

interface UserCreationAttributes extends UserAttributes {
  accessToken: string;
  email: string;
  username?: string;
  name?: string;
  surname?: string;
  picture?: string;
}

@Table({tableName: "users"})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  accessToken: string;

  @Column({type: DataType.STRING, unique: true})
  githubAccessToken: string;

  @Column({type: DataType.STRING, unique: true})
  refreshToken: string;

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string;

  @Column({type: DataType.STRING})
  username: string;

  @Column({type: DataType.STRING})
  name: string;

  @Column({type: DataType.STRING})
  surname: string;

  @Column({type: DataType.STRING})
  picture: string;
}
