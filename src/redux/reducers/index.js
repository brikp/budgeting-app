import { combineReducers } from 'redux';
import transactions from './transactions';
import categories from './categories';

export default combineReducers({ transactions, categories });

/*
Categories {
  allCategories: [] - array of category names
  byName: {
    [name]: {
      balance, - number
    }
  }
}

Transactions {
  allIds: [] - array of ids
  byIds: {   - object with ids as keys
    [id]: {
      account, - number
      amount, - number
      category, - string
    }
  }
}
*/
