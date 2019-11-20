import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CategoryBalanceInput from './CategoryBalanceInput';

const Category = ({ id, name, balance }) => {
  const [isEditable, setIsEditable] = useState(false);

  const toggleEditable = () => {
    setIsEditable(!isEditable);
  };

  return (
    <div>
      <p>
        <span>{`${id}: ${name}: `}</span>
        {isEditable
          ? <CategoryBalanceInput id={id} balance={balance} toggleEditable={toggleEditable} />
          : <span onDoubleClick={toggleEditable}>{balance}</span>}
      </p>
    </div>
  );
};

Category.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
};

export default Category;
