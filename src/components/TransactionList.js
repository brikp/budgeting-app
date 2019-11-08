import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Transaction from './Transaction';
import { getTransactions } from '../redux/selectors';

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

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.number,
    amount: PropTypes.number,
    id: PropTypes.number,
  })).isRequired,
  categories: PropTypes.shape({
    [PropTypes.number]: PropTypes.shape({
      name: PropTypes.string,
      balance: PropTypes.number,
    }),
  }).isRequired,
};

export default connect(
  (state) => ({ transactions: getTransactions(state), categories: state.categories.byIds }),
)(TransactionList);
