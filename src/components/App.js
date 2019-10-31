import React from 'react';
import { connect } from 'react-redux';
import { addTransaction } from '../redux/actions';
import TransactionList from './TransactionList';

function App(props) {
  const handleAddTran = (name) => {
    props.addTransaction(name, 100);
  };

  return (
    <div>
      <p>Hello!</p>
      <button type="submit" onClick={() => handleAddTran('Test')}>
        Add Test category transaction
      </button>
      <button type="submit" onClick={() => handleAddTran('Dummy')}>
        Add Dummy category transaction
      </button>
      <TransactionList />
    </div>
  );
}

export default connect(null, { addTransaction })(App);
