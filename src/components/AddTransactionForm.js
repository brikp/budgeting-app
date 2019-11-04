import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addTransaction } from '../redux/actionsSimple';
import { getCategoryNames } from '../redux/selectors';

const AddTransactionForm = (props) => {
  const { allCategories } = props;
  console.log(allCategories);

  const handleAddTran = (name) => {
    if (allCategories.includes(name)) {
      props.addTransaction(name, 100);
    } else {
      console.log('Category not on the list!');
    }
  };

  return (
    <div>
      <button type="submit" onClick={() => handleAddTran('Test')}>
        Add Test category transaction
      </button>
      <button type="submit" onClick={() => handleAddTran('Dummy')}>
        Add Dummy category transaction
      </button>
    </div>
  );
};

AddTransactionForm.propTypes = {
  allCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  addTransaction: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({ allCategories: getCategoryNames(state) }),
  { addTransaction },
)(AddTransactionForm);
