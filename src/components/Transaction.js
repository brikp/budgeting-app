import React from 'react';
import PropTypes from 'prop-types';

const Transaction = ({ id, category, amount }) => (
  <div>
    <p>{`${id}: ${category}: ${amount}`}</p>
  </div>
);

Transaction.propTypes = {
  id: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};

export default Transaction;
