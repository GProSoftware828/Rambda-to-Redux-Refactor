import _ from 'lodash';
import * as actionTypes from './actions';

export const initialState = {
	searchData: [],
	aqi: 'No AQI found',
	city: 'No city found',
	coords: 'No coords found',
	agency: 'No agency found',
	source: 'No source found',
	informant: 'No informant found',
	informantLink: 'No informantLink found'
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
		case actionTypes.SEARCH_RESULTS:
			return {
				...state,
				searchData: _.concat(state.searchData, action.searchData),
			};
		case actionTypes.REMOVE_CITY:
			return {
				...state,
				aqi: 'No AQI found',
				city: 'No city found',
				coords: 'No coords found',
				agency: 'No agency found',
				source: 'No source found',
				informant: 'No informant found',
				informantLink: 'No informantLink found'
			};
		case actionTypes.SHOW_CITY:
			const viewed = state.viewedItem;
			return {
				...state,
				viewedItem: _.concat(state.viewedItem, action.viewedItem),
				aqi: action.viewedItem.aqi,
				city: action.viewedItem.city.name,
				coords: action.viewedItem.city.geo,
				agency: action.viewedItem.attributions[0].name,
				source: action.viewedItem.attributions[0].url,
				informant: action.viewedItem.attributions[1].name,
				informantLink: action.viewedItem.attributions[1].url
			};
    default:
      return state;
  }
};

export default reducer;
