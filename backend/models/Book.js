
import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../db.js'; 



export const Book = sequelize.define("Book", {
  book_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  book_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  genre: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  author_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "author", 
      key: "author_id",
    },
    onDelete: "CASCADE", 
  },
}, {timestamps: false,});


export default Book;
