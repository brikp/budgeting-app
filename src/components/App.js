import React from 'react';
import Transactions from '../features/transactions/Transactions';
import Categories from '../features/categories/Categories';

import '../styles.css';

const App = () => (
  <div>
    <div className="flex">
      <Transactions className="flex-row" />
      <Categories className="flex-row" />
    </div>
  </div>
);

export default App;
