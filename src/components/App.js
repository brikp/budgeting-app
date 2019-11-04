import React from 'react';
import TransactionList from './TransactionList';
import AddTransactionForm from './AddTransactionForm';

const App = () => (
  <div>
    <AddTransactionForm />
    <TransactionList />
  </div>
);

export default App;
