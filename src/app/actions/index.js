let todoIndex = 0;

export const addToDo = (text) => {
  return {
    type: 'ADD_TODO',
    id: todoIndex++,
    text
  };
};

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  };
};

export const toggleToDo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  };
};
