import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addCategory } from '../redux/actionsThunk';
import { getCategoryNames } from '../redux/selectors';

const AddCategoryForm = (props) => {
  const [categoryName, setCategoryName] = React.useState('');

  const handleChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.categoryNames.includes(categoryName)) {
      console.log('Category already exists!');
    } else {
      props.addCategory(categoryName);
      setCategoryName('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={categoryName} placeholder="Category name" onChange={handleChange} />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};

AddCategoryForm.propTypes = {
  addCategory: PropTypes.func.isRequired,
  categoryNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(
  (store) => ({ categoryNames: getCategoryNames(store) }),
  { addCategory },
)(AddCategoryForm);
