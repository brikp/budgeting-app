import { ADD_CATEGORY_ENTRY, MODIFY_CATEGORY_NAME, MODIFY_CATEGORY_BALANCE, REMOVE_CATEGORY_ENTRY } from '../actionTypes';
import { filterKeyFromObject } from '../../utils/commonFunctions';

const initialState = {
  allIds: [100, 101, 102],
  byId: {
    100: { name: 'Bills', balance: 200 },
    101: { name: 'Food', balance: 540 },
    102: { name: 'Rent', balance: 1230 },
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_CATEGORY_ENTRY: {
      const { id, name } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byId: {
          ...state.byId,
          [id]: {
            name,
            balance: 0,
          },
        },
      };
    }
    case MODIFY_CATEGORY_NAME: {
      const { id, name } = action.payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: {
            ...state.byId[id],
            name,
          },
        },
      };
    }
    case MODIFY_CATEGORY_BALANCE: {
      const { id, balanceChange } = action.payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: {
            ...state.byId[id],
            balance: state.byId[id].balance + balanceChange,
          },
        },
      };
    }
    case REMOVE_CATEGORY_ENTRY: {
      const { id } = action.payload;
      return {
        ...state,
        allIds: state.allIds.filter((categoryId) => categoryId !== id),
        byId: filterKeyFromObject(state.byId, id),
      };
    }
    default:
      return state;
  }
}
