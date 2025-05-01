// db.js
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("cs348_project", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export { sequelize };