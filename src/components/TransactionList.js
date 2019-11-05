import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Transaction from './Transaction';
import { getTransactions, getCategories } from '../redux/selectors';

const TransactionList = ({ transactions, categories }) => (
  <div>
    <ul>
      {transactions && transactions.length > 0
        ? transactions.map((transaction) => {
          const { id, category, amount } = transaction;
          const categoryName = categories[category].name;
          return (
            <li key={id}>
              <Transaction id={id} amount={amount} category={categoryName} />
            </li>
          );
        })
        : 'Ciocia Empty' }
    </ul>
  </div>
);

export default connect(
  (state) => ({ transactions: getTransactions(state), categories: state.categories.byIds }),
)(TransactionList);
