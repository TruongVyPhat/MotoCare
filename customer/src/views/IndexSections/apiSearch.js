import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import { Search, Grid } from 'semantic-ui-react';
import axios from 'axios';

const source = [];
const asource = () => {
	// {
	//   "title": "Oberbrunner, Rice and Roob",
	//   "description": "Mandatory full-range projection",
	//   "image": "https://s3.amazonaws.com/uifaces/faces/twitter/michaelmartinho/128.jpg",
	//   "price": "$36.26"
	// },
	// {
	//   "title": "Prohaska - Grant",
	//   "description": "Ergonomic responsive matrix",
	//   "image": "https://s3.amazonaws.com/uifaces/faces/twitter/overcloacked/128.jpg",
	//   "price": "$89.38"
	// },
	// {
	//   "title": "Jakubowski - Howe",
	//   "description": "Universal asynchronous toolset",
	//   "image": "https://s3.amazonaws.com/uifaces/faces/twitter/linux29/128.jpg",
	//   "price": "$5.45"
	// },
	// {
	//   "title": "Mosciski - Pouros",
	//   "description": "Diverse homogeneous framework",
	//   "image": "https://s3.amazonaws.com/uifaces/faces/twitter/mattbilotti/128.jpg",
	//   "price": "$80.29"
	// },
	// {
	//   "title": "Prohaska Group",
	//   "description": "Public-key upward-trending productivity",
	//   "image": "https://s3.amazonaws.com/uifaces/faces/twitter/stevedesigner/128.jpg",
	//   "price": "$89.15"
	// }
};

const SearchExampleStandard = () => {
    const initialState = { isLoading: false, results: [], value: '' };
    const [curState, setCurState] = useState(initialState);
    const [source, setSource] = useState([]);
    

	const handleResultSelect = (e, { result }) => setCurState({ isLoading: false, results: [], value: result.title });

	const handleSearchChange = (e, { value }) => {
        setSource([]);
        setCurState({ isLoading: true, value: value, results: source});
        setTimeout(() => {
            axios.get(`http://localhost:9000/api/products/search?keyword=${value}`)
            .then(res => {
                setSource(res.data.data);
                console.log(res.data.data);
            }).catch((error) => {
                console.log(error);
            });
            setCurState({ isLoading: false, value: value, results: source});
        }, 300);       
		
		console.log(curState)
		// setTimeout(() => {
		// 	if (curState.value.length < 1) return setCurState(initialState);

		// 	const re = new RegExp(_.escapeRegExp(curState.value), 'i');
		// 	const isMatch = (result) => re.test(result.name);

		// 	setCurState({
		// 		isLoading: false,
        //         results: _.filter(source, isMatch),
        //         value: value
		// 	});
		// }, 300);
	};

	return (
        <Grid>
            <Search
                style={{ paddingTop: '1.3rem' }}
                loading={curState.isLoading}
                onResultSelect={handleResultSelect}
                onSearchChange={_.debounce(handleSearchChange, 500, {
                    leading: true
                })}
                results={curState.results}
                value={curState.value}
            />
        </Grid>
    );
}
export default SearchExampleStandard;