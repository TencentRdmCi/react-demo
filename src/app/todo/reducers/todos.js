import { ADD_TODO, TOGGLE_TODO } from '../actions';

const todo = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        id: action.id,
        text: action.text,
        complete: false
      };
    case TOGGLE_TODO:
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, {
        complete: !state.complete
      });
    default:
      return state;
  }
};

const todos = (state = [], action = null) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        todo(undefined, action)
      ];
    case TOGGLE_TODO:
      return state.map(s =>
          todo(s, action)
      );
    default:
      return state;
  }
};

export default todos;
