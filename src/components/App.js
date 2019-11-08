import React from 'react';
import Transactions from './Transactions';
import Categories from './Categories';

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
