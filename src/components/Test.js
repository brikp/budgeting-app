import React from 'react';
import { addTransaction, changeTransactionAmount, changeTransactionCategory, removeTransaction, addCategory, removeCategory, changeCategoryBalance, changeCategoryName } from '../redux/actionsThunk';
import { connect } from 'react-redux';

const Test = (props) => (
  <div>
    <button
      type="submit"
      onClick={() => props.addTransaction(0, 555)}
    >
      addTransaction(0, 555)
    </button>
    <br />
    <button
      type="submit"
      onClick={() => props.changeTransactionCategory(1, 100)}
    >
      changeTransactionCategory(1, 0)
    </button>
    <br />
    <button
      type="submit"
      onClick={() => props.changeTransactionAmount(1001, 252)}
    >
      changeTransactionAmount(1001, 252)
    </button>
    <br />
    <button
      type="submit"
      onClick={() => props.removeTransaction(1002)}
    >
      removeTransaction(1002)
    </button>
    <br />
    <button
      type="submit"
      onClick={() => props.addCategory('test')}
    >
      addCategory('test')
    </button>
    <br />
    <button
      type="submit"
      onClick={() => props.changeCategoryName(102, 'pupka')}
    >
      changeCategoryName(102, 'pupka')
    </button>
    <br />
    <button
      type="submit"
      onClick={() => props.changeCategoryBalance(102, 100)}
    >
      changeCategoryBalance(102, 100)
    </button>
    <br />
    <button
      type="submit"
      onClick={() => props.removeCategory(102)}
    >
      removeCategory(102)
    </button>
  </div>
);

export default connect(
  null,
  { addTransaction, changeTransactionAmount, changeTransactionCategory, removeTransaction, addCategory, removeCategory, changeCategoryBalance, changeCategoryName }
)(Test);