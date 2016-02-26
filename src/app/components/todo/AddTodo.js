import React, { Component } from 'react';

class AddTodo extends Component {



  render() {
    return (
      <form onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input type="text"
          rel="input"
          placeholder="Add new todo here."
        />
        <button type="submit" className="btn">Add</button>
      </form>
    );
  }
}

export default AddTodo;
