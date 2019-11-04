import { ADD_TRANSACTION_ENTRY, MODIFY_TRANSACTION_CATEGORY, MODIFY_TRANSACTION_AMOUNT, REMOVE_TRANSACTION_ENTRY, ADD_CATEGORY_ENTRY, MODIFY_CATEGORY_NAME, MODIFY_CATEGORY_BALANCE, REMOVE_CATEGORY_ENTRY } from './actionTypes';

let nextTransactionId = 0;
let nextCategoryId = 0;

export const addTransaction = (category, amount) => {
  nextTransactionId += 1;
  return {
    type: ADD_TRANSACTION_ENTRY,
    payload: {
      id: nextTransactionId,
      category,
      amount,
    },
  };
};

export const modifyTransactionCategory = (id, newCategory) => ({
  type: MODIFY_TRANSACTION_CATEGORY,
  payload: {
    id,
    category: newCategory,
  },
});

export const modifyTransactionAmount = (id, newAmount) => ({
  type: MODIFY_TRANSACTION_AMOUNT,
  payload: {
    id,
    amount: newAmount,
  },
});

export const removeTransaction = (id) => ({
  type: REMOVE_TRANSACTION_ENTRY,
  payload: {
    id,
  },
});

export const addCategory = (name) => {
  nextCategoryId += 1;
  return {
    type: ADD_CATEGORY_ENTRY,
    payload: {
      id: nextCategoryId,
      name,
    },
  };
};

export const modifyCategoryName = (id, newName) => ({
  type: MODIFY_CATEGORY_NAME,
  payload: {
    id,
    name: newName,
  },
});

export const modifyCategoryBalance = (id, balanceChange) => ({
  type: MODIFY_CATEGORY_BALANCE,
  payload: {
    id,
    balanceChange,
  },
});

export const removeCategory = (id) => ({
  type: REMOVE_CATEGORY_ENTRY,
  payload: {
    id,
  },
});