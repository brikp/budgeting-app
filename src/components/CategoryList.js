import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Category from './Category';
import { getCategories } from '../redux/selectors';

const CategoryList = ({ categories }) => (
  <div>
    <ul>
      {categories && categories.length > 0
        ? categories.map((category) => {
          const { id, name, balance } = category;
          return (
            <li key={id}>
              <Category id={id} name={name} balance={balance} />
            </li>
          );
        })
        : 'Ciocia Empty' }
    </ul>
  </div>
);

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    balance: PropTypes.number,
    id: PropTypes.number,
  })).isRequired,
};

export default connect(
  (state) => ({ categories: getCategories(state) }),
)(CategoryList);
