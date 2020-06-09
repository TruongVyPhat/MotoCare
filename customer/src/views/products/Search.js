import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Search, Grid } from 'semantic-ui-react';
import axios from 'axios';

const SearchExampleStandard = ({ updateSearch }) => {
    const initialState = { isLoading: false, results: [], value: '' };
    const [curState, setCurState] = useState(initialState);
    const [source, setSource] = useState([]);
    useEffect(() => {
        axios.get(`https://motorcare-api.herokuapp.com/api/products/data-search`)
            .then(res => {
                setSource(res.data.data);
            }).catch((error) => {
                console.log(error);
            });
    }, []);

    const handleResultSelect = (e, { result }) => {
        setCurState({ isLoading: false, results: [], value: result.title });
        window.location.href = `https://motorcare-api.herokuapp.com/product-detail/${result.id}`;
    }

    const handleSearchChange = (e, { value }) => {
        setCurState({ isLoading: true, value: value, results: [] });
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
        <Grid >
            {/* <Form onSubmit={handleFormSubmit(curState.value)}> */}
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
            {/* </Form> */}
        </Grid>
    );
}
export default SearchExampleStandard;