import { ADD_CATEGORY, ADD_TRANSACTION, REMOVE_CATEGORY, REMOVE_TRANSACTION } from './actionTypes';

let nextTransactionId = 0;

export const addTransaction = (category, amount) => {
  nextTransactionId += 1;
  return {
    type: ADD_TRANSACTION,
    payload: {
      id: nextTransactionId,
      category,
      amount,
    },
  };
};

export const addCategory = (name) => ({
  type: ADD_CATEGORY,
  payload: {
    name,
  },
});
