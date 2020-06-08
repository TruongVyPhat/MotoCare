import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import { Search, Grid } from 'semantic-ui-react';
import axios from 'axios';

const SearchExampleStandard = () => {
    const initialState = { isLoading: false, results: [], value: '' };
    const [curState, setCurState] = useState(initialState);
    const [source, setSource] = useState([]);
	useEffect(() => {
        axios.get(`http://localhost:9000/api/products/data-search`)
        .then(res => {
            setSource(res.data.data);
            
        }).catch((error) => {
            console.log(error);
        });
	}, []);

	const handleResultSelect = (e, { result }) => setCurState({ isLoading: false, results: [], value: result.title });

	const handleSearchChange = (e, { value }) => {
		setCurState({ isLoading: true, value: value, results: []});

		setTimeout(() => {
			
			if (value.length < 1) return setCurState(initialState);

			const re = new RegExp(_.escapeRegExp(value), 'i');
			const isMatch = (result) => re.test(result.title);

			setCurState({
				isLoading: false,
				results: _.filter(source, isMatch),
				value: value
			});
		}, 300);
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