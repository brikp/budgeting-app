import { combineReducers } from 'redux';

import transactionsReducer from '../features/transactions/transactionsSlice';
import categoriesReducer from '../features/categories/categoriesSlice';

export default combineReducers({
  transactions: transactionsReducer,
  categories: categoriesReducer,
});
