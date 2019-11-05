import { ADD_CATEGORY_ENTRY, MODIFY_CATEGORY_NAME, MODIFY_CATEGORY_BALANCE, REMOVE_CATEGORY_ENTRY } from '../actionTypes';
import { filterKeyFromObject } from '../../utils/commonFunctions';

const initialState = {
  allIds: [0, 100, 101, 102],
  byIds: {
    '-1': { name: 'Temp', balance: 0 },
    0: { name: 'To balance', balance: 0 },
    100: { name: 'Bills', balance: 200 },
    101: { name: 'Food', balance: 540 },
    102: { name: 'Rent', balance: 1430 },
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_CATEGORY_ENTRY: {
      const { id, name } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
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
        byIds: {
          ...state.byIds,
          [id]: {
            ...state.byIds[id],
            name,
          },
        },
      };
    }
    case MODIFY_CATEGORY_BALANCE: {
      const { id, balanceChange } = action.payload;
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: {
            ...state.byIds[id],
            balance: (state.byIds[id].balance) + balanceChange,
          },
        },
      };
    }
    case REMOVE_CATEGORY_ENTRY: {
      const { id } = action.payload;

      const byIdsCopy = {};
      Object.assign(byIdsCopy, state.byIds);
      delete byIdsCopy[id];

      return {
        ...state,
        allIds: state.allIds.filter((categoryId) => categoryId !== id),
        byIds: byIdsCopy,
      };
    }
    default:
      return state;
  }
}
