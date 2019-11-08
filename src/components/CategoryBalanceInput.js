import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setCategoryBalance } from '../redux/actionsThunk';

const CategoryBalanceInput = ({ id, balance, toggleEditable, ...rest }) => {
  const [newBalance, setNewBalance] = useState(balance);

  const handleChange = (event) => {
    setNewBalance(Number(event.target.value));
  };

  const handleSubmit = (event) => {
    const balanceChange = newBalance - balance;
    event.preventDefault();
    rest.setCategoryBalance(id, newBalance, balanceChange);
    toggleEditable();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" placeholder={balance} value={newBalance} onChange={handleChange} />
    </form>
  );
};

CategoryBalanceInput.propTypes = {
  id: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
  toggleEditable: PropTypes.func.isRequired,
};

export default connect(
  null,
  { setCategoryBalance },
)(CategoryBalanceInput);
