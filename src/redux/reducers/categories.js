import { ADD_CATEGORY, REMOVE_CATEGORY } from '../actionTypes';
import { filterKeyFromObject } from '../../utils/commonFunctions';

const initialState = {
  allCategories: ['Test'],
  byName: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_CATEGORY: {
      const { name } = action.payload;
      return {
        ...state,
        allCategories: [...state.categories, name],
        byName: {
          ...state.byName,
          [name]: {
            balance: 0,
          },
        },
      };
    }
    case REMOVE_CATEGORY: {
      const { name } = action.payload;
      return {
        ...state,
        allCategories: state.categories.filter((category) => category !== name),
        byName: filterKeyFromObject(state.byName, name),
      };
    }
    default:
      return state;
  }
}
