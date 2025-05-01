// models/Borrower.js
import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Borrower = sequelize.define("Borrower", {
  borrower_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  borrower_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "borrowers",
  timestamps: false,
});

export default Borrower;
