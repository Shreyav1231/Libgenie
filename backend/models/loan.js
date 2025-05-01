import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

const Loan = sequelize.define('Loan', {
  loan_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  book_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  borrower_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  borrow_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  return_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
}, {
  tableName: 'loans', 
  timestamps: false, 
});

export default Loan;

