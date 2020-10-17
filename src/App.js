import React, { useState, useReducer, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { reducer, initialState } from './store/reducer';
import { SearchCities } from './Components/SearchCities';
import ViewItem from './Components/ViewItem';
import 'tachyons';

const App = () => {
	const [showView, setShowView] = useState(false);
	const [showList, setShowList] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
	const [feed, setFeed] = useState([]);
	const [search, setSearch] = useState([]);
	const [AQIh, setAQI] = useState('No AQI found');
	const [cityh, setCity] = useState('No city found');
	const [coordsh, setCoords] = useState('No coordinates found');
	const [agencyh, setAgency] = useState('No agency found');
	const [sourceh, setSource] = useState('No source found');
	const [informanth, setInformant] = useState('No informant found');
	const [informantLinkh, setInformantLink] = useState('No informant link found');
	
	useEffect(() => {
		setAQI(aqi);
		setCity(city);
		setCoords(coords);
		setAgency(agency);
		setSource(source);
		setInformant(informant);
		setInformantLink(informantLink);
	}, [])

	const searchAirs = (search) => {
		fetch(`http://api.waqi.info/search/?keyword=${search}&token=8d8e978e647d2b0a8c17c04ba331c0117cd06dc8`, {
			"method": "GET"
		})
	  .then(response => response.json())
	  .then(data => {
			setShowList(true);
			dispatch({ type: 'SEARCH_RESULTS', searchData: data.data})})
	  .catch(err => console.log(err))
	}

	const viewedItems = (item) => {
		const name = item.station.name;
		fetch(`http://api.waqi.info/feed/${name}/?token=8d8e978e647d2b0a8c17c04ba331c0117cd06dc8`, {
			"method": "GET"
		})
    .then(response => response.json())
		.then(dispatch({ type: 'REMOVE_CITY'}))
		.then(data => {
			setShowView(true);
			if (data.data.city.name === undefined) { return }
			else {
				dispatch({ type: 'SHOW_CITY', viewedItem: data.data })
			}
		})
    .catch(err => console.log(err))
	}
	
  const getAirData = (e) => {
		e.preventDefault();
		searchAirs(search);		
	}

  const { searchData, aqi, city, coords, agency, source, informant, informantLink } = state;
  return (
    <div className="flex flex-column">
			<header className="f2 pv3 ph4 bg-light-purple white flex-grow-0 flex-shrink-0">
				Air Quality Index
			</header>
			<div className="pa5 flex-grow-1 flex-shrink-0 flex items-start">
				<div>
					<form 
						className="flex"
						onSubmit={(e) => getAirData(e)}
					>
						<div className="w5 flex items-center">
  						<input
      					type="text"
								placeholder="Melbourne"
     	 	  			id="search"
     	 					required
      					onChange={(e) => setSearch(e.target.value)}
								className="br1 br--top br--left ba b--light-gray ph3 pv2 flex-grow-1 flex-shrink-1"
     		 	 		 	/>
				 	 		<button 
								className="br1 bl-0 br--top br--right b--light-gray white pa2 right-0 flex-grow-0 flex-shrink-0" 
								type='submit'>
								<span role="img" aria-label="search">🕵️</span>
						  </button>
		   			</div>
				  </form>	
					<div className="br1 br--bottom flex flex-column w5 bb bl br b--light-gray border-box">
            {showList ? (
							<div className="pv2">
								{searchData.map(item => (
                	<SearchCities
						      	key={item.uid}
                  	onClick={() =>
						  	    	viewedItems(item)
                 		}
						      	item={item}
                		/>
              	 ))}
							</div>
						) : (
            	<div className="ph3 pv2 silver h4 flex items-center justify-center">
              	<p>Search for a city</p>
            	</div>
						)}
					</div>
			  </div>
				{showView && (
          <div className="ba b--light-gray br1 ml5" style={{ width: 512 }}>
						<ViewItem
					   aqi={aqi}
						 city={city}
						 coords={coords}
						 agency={agency}
						 source={source}
						 informant={informant}
						 informantLink={informantLink}
             />
					</div>
				)} 
			</div>  	
	 </div>
  );
};

const mapStateToProps = state => {
  return {
		searchData: state.searchData,
		aqi: state.aqi,
		city: state.city,
		coords: state.coords,
		agency: state.agency,
		source: state.source,
		informant: state.informant,
		informantLink: state.informantLink
  };
};

export default connect(mapStateToProps)(App);
