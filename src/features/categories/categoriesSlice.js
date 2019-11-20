/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle
import { modifyTransactionCategory, removeTransactionEntry, getTransactionIdsOfCategory } from '../transactions/transactionsSlice';

const initialState = {
  allIds: [-1, 0, 100, 101, 102],
  byIds: {
    '-1': { name: 'Temp', balance: 0 },
    0: { name: 'To balance', balance: 0 },
    100: { name: 'Bills', balance: 200 },
    101: { name: 'Food', balance: 540 },
    102: { name: 'Rent', balance: 1430 },
  },
};

let nextCategoryId = 0;

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategoryEntry: {
      reducer(state, action) {
        const { id, name } = action.payload;
        const { allIds, byIds } = state;
        allIds.push(id);
        byIds[id] = { name, balance: 0 };
      },
      prepare({ name }) {
        nextCategoryId += 1;
        return { payload: { name, id: nextCategoryId } };
      },
    },
    modifyCategoryName(state, action) {
      const { id, name } = action.payload;
      state.byIds[id].name = name;
    },
    setNewCategoryBalance(state, action) {
      const { id, newBalance } = action.payload;
      state.byIds[id].balance = newBalance;
    },
    modifyCategoryBalance(state, action) {
      const { id, balanceChange } = action.payload;
      state.byIds[id].balance += balanceChange;
    },
    removeCategoryEntry(state, action) {
      const { id } = action.payload;
      state.allIds.filter((categoryId) => categoryId !== id);
      delete state.byIds[id];
    },
  },
});

export const {
  addCategoryEntry,
  modifyCategoryName,
  setNewCategoryBalance,
  modifyCategoryBalance,
  removeCategoryEntry,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;

// Thunks

export const addCategory = (name) => (dispatch) => {
  dispatch(addCategoryEntry({ name }));
};

export const changeCategoryName = (id, newName) => (dispatch) => {
  dispatch(modifyCategoryName({ id, newName }));
};

export const changeCategoryBalance = (id, balanceChange) => (dispatch) => {
  // Modify base category (To budget) balance
  dispatch(modifyCategoryBalance({ id: 0, balanceChange: (balanceChange * -1) }));
  dispatch(modifyCategoryBalance({ id, balanceChange }));
};

export const setCategoryBalance = (id, balance, balanceChange) => (dispatch) => {
  // Modify base category (To budget) balance
  dispatch(modifyCategoryBalance({ id: 0, balanceChange: (balanceChange * -1) }));
  dispatch(setNewCategoryBalance({ id, balance }));
};

// This seems expensive and may cause weird results for bigger dataset
export const removeCategory = (categoryId) => (dispatch, getState) => {
  const ids = getTransactionIdsOfCategory(getState(), categoryId);
  const transactionsByIds = getState().transactions.byIds;
  ids.forEach((id) => {
    const transactionAmount = transactionsByIds[id].amount;
    dispatch(modifyTransactionCategory({ id, category: -1 }));
    dispatch(modifyCategoryBalance({ id: categoryId, balanceChange: (transactionAmount * -1) }));
    dispatch(removeTransactionEntry({ id }));
  });
  const remainingBalance = getState().categories.byIds[categoryId].balance;
  dispatch(modifyCategoryBalance({ id: 0, balanceChange: remainingBalance }));
  dispatch(removeCategoryEntry({ id: categoryId }));
};

// Selectors

export const getCategoryList = (store) => (
  store && store.categories
    ? store.categories.allIds
    : []
);

export const getCategoryById = (store, id) => (
  store && store.categories && store.categories.byIds
    ? { ...store.categories.byIds[id], id }
    : {}
);

export const getCategories = (store) => (
  getCategoryList(store).map((id) => getCategoryById(store, id))
);

export const getCategoryNames = (store) => (
  getCategoryList(store).map((id) => store.categories.byIds[id].name)
);

export const getCategoriesByName = (store) => (
  getCategoryList(store).reduce((result, categoryId) => {
    const category = getCategoryById(store, categoryId);
    return {
      ...result,
      [category.name]: {
        id: categoryId,
        balance: category.balance,
        name: category.name,
      },
    };
  }, {})
);
