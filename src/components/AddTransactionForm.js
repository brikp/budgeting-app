import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addTransaction } from '../redux/actionsThunk';

const AddTransactionForm = (props) => {
  const handleAddTran = (name) => {
    props.addTransaction(name, 100);
  };

  return (
    <div>
      <button type="submit" onClick={() => handleAddTran(102)}>
        Add Rent category transaction
      </button>
      <button type="submit" onClick={() => handleAddTran(101)}>
        Add Food category transaction
      </button>
    </div>
  );
};

AddTransactionForm.propTypes = {
  addTransaction: PropTypes.func.isRequired,
};

export default connect(
  null,
  { addTransaction },
)(AddTransactionForm);
