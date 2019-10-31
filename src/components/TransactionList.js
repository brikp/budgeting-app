import React from 'react';

import AddTransactionForm from './AddTransactionForm';
import Transaction from './Transaction';
import { getTransactions } from '../redux/selectors';
import { connect } from 'react-redux';

const TransactionList = ({ transactions }) => {
  return (
    <div>
      <ul>
        {transactions
          ? transactions.map((transaction) => {
            const { id, category, amount } = transaction;
            return (
              <li key={id}>
                <Transaction id={id} amount={amount} category={category} />
              </li>
            );
          })
          : 'Ciocia Empty' }
      </ul>
    </div>
  );
};

export default connect((state) => ({ transactions: getTransactions(state) }))(TransactionList);
