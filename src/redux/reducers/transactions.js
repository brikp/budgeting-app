import { ADD_TRANSACTION } from '../actionTypes';

const initialState = {
  allIds: [],
  byIds: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TRANSACTION: {
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
    default:
      return state;
  }
}
