import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addTransaction } from '../redux/actionsThunk';
import { getCategoriesByName, getCategoryNames } from '../redux/selectors';

const AddTransactionForm = (props) => {
  const [amount, setAmount] = React.useState(0);
  const [categoryName, setCategoryName] = React.useState('');


  const handleChange = (event) => {
    // setTransactionName(event.target.value);
    switch (event.target.name) {
      case 'categoryName':
        setCategoryName(event.target.value);
        break;
      case 'amount':
        setAmount(Number(event.target.value));
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.categoryNames.includes(categoryName)) {
      props.addTransaction(props.categoriesByName[categoryName].id, amount);
      setAmount(0);
      setCategoryName('');
    } else {
      console.log('Category does not exist!');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="categoryName"
          value={categoryName}
          placeholder="Category name"
          onChange={handleChange}
        />
        <input
          type="number"
          name="amount"
          value={amount}
          placeholder="Amount"
          onChange={handleChange}
        />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};

AddTransactionForm.propTypes = {
  addTransaction: PropTypes.func.isRequired,
  categoryNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  categoriesByName: PropTypes.shape({
    [PropTypes.string]: PropTypes.shape({
      id: PropTypes.number,
      balance: PropTypes.number,
      name: PropTypes.string,
    }),
  }).isRequired,
};

export default connect(
  (state) => (
    {
      categoryNames: getCategoryNames(state),
      categoriesByName: getCategoriesByName(state),
    }),
  { addTransaction },
)(AddTransactionForm);
