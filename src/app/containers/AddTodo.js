import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.selectNode = this.selectNode.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const value = this.input.value.trim();

    if (!value) return;

    this.props.dispatch(addTodo(value));
    this.input.value = '';
  };

  selectNode = node => {
    this.input = node;
  };

  render() {
    let input;

    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <input ref={this.selectNode}
            className="form-control"
            placeholder="Add todo here."
          />
        </div>
        <button type="submit" className="btn">
          Add Todo
        </button>
      </form>
    );
  }
}

AddTodo = connect()(AddTodo);

export default AddTodo;
