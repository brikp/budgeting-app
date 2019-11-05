import { ADD_TRANSACTION_ENTRY, MODIFY_TRANSACTION_CATEGORY, MODIFY_TRANSACTION_AMOUNT, REMOVE_TRANSACTION_ENTRY } from '../actionTypes';
import { filterKeyFromObject } from '../../utils/commonFunctions';

const initialState = {
  allIds: [1000, 1001, 1002, 1003],
  byIds: {
    1000: { category: 100, amount: 100 },
    1001: { category: 100, amount: 10 },
    1002: { category: 101, amount: 50 },
    1003: { category: 102, amount: 1230 },
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TRANSACTION_ENTRY: {
      const { id, category, amount } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            category,
            amount,
          },
        },
      };
    }
    case MODIFY_TRANSACTION_CATEGORY: {
      const { id, category } = action.payload;
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: {
            ...state.byIds[id],
            category,
          },
        },
      };
    }
    case MODIFY_TRANSACTION_AMOUNT: {
      const { id, amount } = action.payload;
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: {
            ...state.byIds[id],
            amount,
          },
        },
      };
    }
    case REMOVE_TRANSACTION_ENTRY: {
      const { id } = action.payload;

      const byIdsCopy = {};
      Object.assign(byIdsCopy, state.byIds);
      delete byIdsCopy[id];

      return {
        ...state,
        allIds: state.allIds.filter((transactionId) => transactionId !== id),
        byIds: byIdsCopy,
      };
    }
    default:
      return state;
  }
}
