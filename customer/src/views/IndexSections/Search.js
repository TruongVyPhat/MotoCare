import _ from 'lodash';
//import faker from 'faker';
import React, { Component } from 'react';
import { Search, Grid } from 'semantic-ui-react';

const initialState = { isLoading: false, results: [], value: '' };

// const source = _.times(5, () => ({
// 	title: faker.company.companyName(),
// 	description: faker.company.catchPhrase(),
// 	image: faker.internet.avatar(),
// 	price: faker.finance.amount(0, 100, 2, '$')
// }));

const source = [
    {
      "title": "Oberbrunner, Rice and Roob",
      "description": "Mandatory full-range projection",
      "image": "https://s3.amazonaws.com/uifaces/faces/twitter/michaelmartinho/128.jpg",
      "price": "$36.26"
    },
    {
      "title": "Prohaska - Grant",
      "description": "Ergonomic responsive matrix",
      "image": "https://s3.amazonaws.com/uifaces/faces/twitter/overcloacked/128.jpg",
      "price": "$89.38"
    },
    {
      "title": "Jakubowski - Howe",
      "description": "Universal asynchronous toolset",
      "image": "https://s3.amazonaws.com/uifaces/faces/twitter/linux29/128.jpg",
      "price": "$5.45"
    },
    {
      "title": "Mosciski - Pouros",
      "description": "Diverse homogeneous framework",
      "image": "https://s3.amazonaws.com/uifaces/faces/twitter/mattbilotti/128.jpg",
      "price": "$80.29"
    },
    {
      "title": "Prohaska Group",
      "description": "Public-key upward-trending productivity",
      "image": "https://s3.amazonaws.com/uifaces/faces/twitter/stevedesigner/128.jpg",
      "price": "$89.15"
    }
  ];

export default class SearchExampleStandard extends Component {
	state = initialState;

	handleResultSelect = (e, { result }) => this.setState({ value: result.title });

	handleSearchChange = (e, { value }) => {
		this.setState({ isLoading: true, value });

		setTimeout(() => {
			if (this.state.value.length < 1) return this.setState(initialState);

			const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
			const isMatch = (result) => re.test(result.title);

			this.setState({
				isLoading: false,
				results: _.filter(source, isMatch)
			});
		}, 300);
	};

	render() {
		const { isLoading, value, results } = this.state;

		return (
			<Grid>
				<Search style={{paddingTop: "1.3rem"}}
						loading={isLoading}
						onResultSelect={this.handleResultSelect}
						onSearchChange={_.debounce(this.handleSearchChange, 500, {
							leading: true
						})}
						results={results}
						value={value}
						{...this.props}
					/>
			</Grid>
		);
	}
}
