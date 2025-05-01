import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../db.js'; 
import { Book } from './Book.js';

const Author = sequelize.define('Author', {
  author_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  author_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  age: {
    type: Sequelize.INTEGER,
  },
},  
{
  timestamps: false,
  tableName: 'author' // Add this line to explicitly set the table name
});

Author.hasMany(Book, { foreignKey: "author_id", onDelete: "CASCADE" });
Book.belongsTo(Author, { foreignKey: "author_id" });

export default Author;