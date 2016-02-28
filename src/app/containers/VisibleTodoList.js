import { connect } from 'react-redux';
import { toggleToDo, VisibilityFilters } from '../actions';
import TodoList from '../components/todo/TodoList.js';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.complete);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.complete);
    case VisibilityFilters.SHOW_ALL:
    default :
      return todos;
  }
};

const mapStateToProps = (state) => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
});

const mapDispatchToProps = (dispatch) => ({
  onClickTodo: (id) => {
    dispatch(toggleToDo(id));
  }
});

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default VisibleTodoList;
