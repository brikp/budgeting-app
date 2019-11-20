/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle
import { modifyCategoryBalance } from '../categories/categoriesSlice';

const initialState = {
  allIds: [1000, 1001, 1002, 1003],
  byIds: {
    1000: { category: 100, amount: 100 },
    1001: { category: 100, amount: 10 },
    1002: { category: 101, amount: 50 },
    1003: { category: 102, amount: 1230 },
  },
};

let nextTransactionId = 0;

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransactionEntry: {
      reducer(state, action) {
        const { id, category, amount } = action.payload;
        const { allIds, byIds } = state;
        allIds.push(id);
        byIds[id] = { category, amount };
      },
      prepare({ category, amount }) {
        nextTransactionId += 1;
        return { payload: { category, amount, id: nextTransactionId } };
      },
    },
    modifyTransactionCategory(state, action) {
      const { id, category } = action.payload;
      state.byIds[id].category = category;
    },
    modifyTransactionAmount(state, action) {
      const { id, amount } = action.payload;
      state.byIds[id].amount = amount;
    },
    removeTransactionEntry(state, action) {
      const { id } = action.payload;
      state.allIds.filter((transactionId) => transactionId !== id);
      delete state.byIds[id];
    },
  },
});

export const {
  addTransactionEntry,
  modifyTransactionCategory,
  modifyTransactionAmount,
  removeTransactionEntry,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;

// Thunks

export const addTransaction = (categoryId, amount) => (dispatch) => {
  if (categoryId === 0) { // Add income
    dispatch(addTransactionEntry({ category: 0, amount }));
    dispatch(modifyCategoryBalance({ id: 0, balanceChange: amount }));
  } else {
    dispatch(addTransactionEntry({ category: categoryId, amount }));
    dispatch(modifyCategoryBalance({ id: categoryId, balanceChange: (amount * -1) }));
  }
};

export const changeTransactionCategory = (id, newCategoryId) => (dispatch, getState) => {
  const { category, amount } = getState().transactions.byIds[id];
  dispatch(modifyTransactionCategory({ id, category: newCategoryId }));
  dispatch(modifyCategoryBalance({ id: category, balanceChange: (amount * -1) }));
  dispatch(modifyCategoryBalance({ id: newCategoryId, balanceChange: amount }));
};

export const changeTransactionAmount = (id, newAmount) => (dispatch, getState) => {
  const { category, amount } = getState().transactions.byIds[id];
  const amountDifference = newAmount - amount;
  dispatch(modifyTransactionAmount({ id, amount: newAmount }));
  dispatch(modifyCategoryBalance({ id: category, balanceChange: amountDifference }));
};

export const removeTransaction = (id) => (dispatch, getState) => {
  const { category, amount } = getState().transactions.byIds[id];
  dispatch(removeTransactionEntry({ id }));
  dispatch(modifyCategoryBalance({ id: category, balanceChange: (amount * -1) }));
};

// Selectors

export const getTransactionList = (store) => (
  store && store.transactions
    ? store.transactions.allIds
    : []
);

export const getTransactionsById = (store, id) => (
  store && store.transactions && store.transactions.byIds
    ? { ...store.transactions.byIds[id], id }
    : {}
);

export const getTransactions = (store) => (
  getTransactionList(store).map((id) => getTransactionsById(store, id))
);

export const getTransactionIdsOfCategory = (store, categoryId) => (
  getTransactions(store)
    .reduce((result, transaction) => {
      if (transaction && transaction.category === categoryId) {
        return [...result, transaction.id];
      } return result;
    }, [])
);
