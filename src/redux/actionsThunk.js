import { addTransactionEntry, modifyTransactionCategory, modifyTransactionAmount, removeTransactionEntry, addCategoryEntry, modifyCategoryName, setCategoryBalance as setCategoryBalanceSimple, modifyCategoryBalance, removeCategoryEntry } from './actionsSimple';
import { getTransactionIdsOfCategory } from './selectors';


export const addIncome = (amount) => (dispatch) => {
  dispatch(addTransactionEntry(0, amount));
  dispatch(modifyCategoryBalance(0, amount));
};

export const addTransaction = (categoryId, amount) => (dispatch) => {
  if (categoryId === 0) dispatch(addIncome(amount));
  else {
    dispatch(addTransactionEntry(categoryId, amount));
    dispatch(modifyCategoryBalance(categoryId, (amount * -1)));
  }
};

export const changeTransactionCategory = (id, newCategoryId) => (dispatch, getState) => {
  const { category, amount } = getState().transactions.byIds[id];
  dispatch(modifyTransactionCategory(id, newCategoryId));
  dispatch(modifyCategoryBalance(category, (amount * -1)));
  dispatch(modifyCategoryBalance(newCategoryId, amount));
};

export const changeTransactionAmount = (id, newAmount) => (dispatch, getState) => {
  const { category, amount } = getState().transactions.byIds[id];
  const amountDifference = newAmount - amount;
  dispatch(modifyTransactionAmount(id, newAmount));
  dispatch(modifyCategoryBalance(category, amountDifference));
};

export const removeTransaction = (id) => (dispatch, getState) => {
  const { category, amount } = getState().transactions.byIds[id];
  dispatch(removeTransactionEntry(id));
  dispatch(modifyCategoryBalance(category, (amount * -1)));
};

export const addCategory = (name) => (dispatch) => {
  dispatch(addCategoryEntry(name));
};

export const changeCategoryName = (id, newName) => (dispatch) => {
  dispatch(modifyCategoryName(id, newName));
};

export const changeCategoryBalance = (id, balanceChange) => (dispatch) => {
  // Modify base category (To budget) balance
  dispatch(modifyCategoryBalance(0, (balanceChange * -1)));
  dispatch(modifyCategoryBalance(id, balanceChange));
};

export const setCategoryBalance = (id, balance, balanceChange) => (dispatch) => {
  // Modify base category (To budget) balance
  dispatch(modifyCategoryBalance(0, (balanceChange * -1)));
  dispatch(setCategoryBalanceSimple(id, balance));
};

// This seems expensive and may cause weird results for bigger dataset
export const removeCategory = (categoryId) => (dispatch, getState) => {
  const ids = getTransactionIdsOfCategory(getState(), categoryId);
  const transactionsByIds = getState().transactions.byIds;
  ids.forEach((id) => {
    const transactionAmount = transactionsByIds[id].amount;
    dispatch(modifyTransactionCategory(id, -1));
    dispatch(modifyCategoryBalance(categoryId, (transactionAmount * -1)));
    dispatch(removeTransactionEntry(id));
  });
  const remainingBalance = getState().categories.byIds[categoryId].balance;
  dispatch(modifyCategoryBalance(0, remainingBalance));
  dispatch(removeCategoryEntry(categoryId));
};
