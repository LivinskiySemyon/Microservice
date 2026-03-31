import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class Article extends Model {
  public id!: string;
  public title!: string;
  public description!: string;
  public body!: string;
  public tagList!: string[];
  public slug!: string;
  public authorId!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Article.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tagList: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    authorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'articles',
    timestamps: true,
  }
);

Article.belongsTo(User, { as: 'author', foreignKey: 'authorId' });

export default Article;