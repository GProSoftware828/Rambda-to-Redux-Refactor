import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ViewItem extends Component {
  render() {
		const { aqi, city, coords, agency, source, informant, informantLink } = this.props;
    return (				
    	<div data-test="SearchComponent">
      	<div className="pv2 ph3 flex justify-between">
        	{city}
          <div>
            ({coords[0]}, {coords[1]})
          </div>
      	</div>
        <div className="h4 pv2 ph3 flex justify-center items-center f1">
          {aqi}
        </div>
        <div className="f7 pv2">
          <div className="flex justify-between pv1 ph3">
            <div>{agency}</div>
            <div className="blue pl3">{source}</div>
          </div>
          <div className="flex justify-between pv1 ph3">
            <div>{informant}</div>
            <div className="blue pl3">{informantLink}</div>
          </div>
          <div className="flex justify-between pv1 ph3">
					  <div>World Air Quality Index Project</div>
					  <div className="blue pl3">https://waqi.info/</div>
          </div>
			  </div>
      </div>
    );
  }
}

ViewItem.propTypes = {
  informant: PropTypes.string
};

export default ViewItem;
