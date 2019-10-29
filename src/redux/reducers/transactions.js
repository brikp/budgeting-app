import { ADD_TRANSACTION } from '../actionTypes';

const initialState = {
  transactions: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TRANSACTION: {
      const { id, content } = action.payload;
      const { category, account, amount } = content;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            category,
            account,
            amount,
          },
        },
      };
    }
    default:
      return state;
  }
}
