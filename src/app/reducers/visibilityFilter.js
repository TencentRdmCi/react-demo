const visibilityFilter = (state = 'SHOW_ALL', action = {}) => {
  switch (state.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

export default visibilityFilter;
