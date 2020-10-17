import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class SearchCities extends Component {
	state = {
		item: ''
	}
	
	componentDidMount() {
		this.setState({item: this.props.item});
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		if (this.state.item === nextProps.item) {
			return false;
		} else {
			return true;
		}
	}
	
  render() {
		const { onClick, item } = this.props;
    return (
      <button
        onClick={onClick}
        data-test="SearchComponent"
				className="pv2 ph3 flex-grow-0 flex-shrink-0 b-white ba-0 b--white tl w-100 border-box"
      >
					{console.log('Rerendered: ', item)}
					{item.station.name}
      </button>
    );
  }
}

SearchCities.propTypes = {
  item: PropTypes.object
};

export default SearchCities;
