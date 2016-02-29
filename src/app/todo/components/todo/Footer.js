import React, { Component } from 'react';

import FilterLink from '../../containers/FilterLink.js';
import { VisibilityFilters } from '../../actions';

export default class Footer extends Component {
  render() {
    return (
      <p>
        Show:
        {' '}
        <FilterLink filter={VisibilityFilters.SHOW_ALL}>
          All
        </FilterLink>
        {', '}
        <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>
          Active
        </FilterLink>
        {', '}
        <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>
          Complete
        </FilterLink>
      </p>
    );
  }
}
