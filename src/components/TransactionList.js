import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Transaction from './Transaction';
import { getTransactions } from '../redux/selectors';

const TransactionList = ({ transactions }) => (
  <div>
    <ul>
      {transactions && transactions.length > 0
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

export default connect((state) => ({ transactions: getTransactions(state) }))(TransactionList);
