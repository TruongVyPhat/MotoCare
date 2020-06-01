
import React from 'react';
import classnames from 'classnames';
import GridViewProduct from './GridViewProducts';
import { Pagination } from 'semantic-ui-react';
import Search from './Search';
// reactstrap components
import {
	TabContent,
	TabPane,
	Container,
	Row,
	Col,
	Card,
	CardHeader,
	CardBody,
	Nav,
	NavItem,
	NavLink
} from 'reactstrap';
import GridViewService from './GridViewService';

class Tabs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			iconTabs: 1,
			textTabs: 4
		};
	}
	toggleTabs = (e, stateName, index) => {
		e.preventDefault();
		this.setState({
			[stateName]: index
		});
	};
	render() {
		return (
			<div className="section section-tabs" style={{ margin: '5%'}}>
				<Card>
					<CardHeader>
						<Nav className="nav-tabs-info" role="tablist" tabs>
							<NavItem>
								<NavLink
									className={classnames({
										active: this.state.iconTabs === 1
									})}
									onClick={(e) => this.toggleTabs(e, 'iconTabs', 1)}
									href="#pablo"
								>
									<i className="tim-icons icon-spaceship" />
									Products
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									className={classnames({
										active: this.state.iconTabs === 2
									})}
									onClick={(e) => this.toggleTabs(e, 'iconTabs', 2)}
									href="#pablo"
								>
									<i className="tim-icons icon-settings-gear-63" />
									Services
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									className={classnames({
										active: this.state.iconTabs === 3
									})}
									onClick={(e) => this.toggleTabs(e, 'iconTabs', 3)}
									href="#pablo"
								>
									<i className="tim-icons icon-bag-16" />
									Options
								</NavLink>
							</NavItem>
                            <Search/>
						</Nav>  
					</CardHeader>
					<CardBody>
						<TabContent className="tab-space" activeTab={'link' + this.state.iconTabs}>
							<TabPane tabId="link1">
								<GridViewProduct />
							</TabPane>
							<TabPane tabId="link2">
								<GridViewService />
							</TabPane>
							<TabPane tabId="link3">
								<p>
									Efficiently unleash cross-media information without cross-media value. Quickly
									maximize timely deliverables for real-time schemas. <br />
									<br />
									Dramatically maintain clicks-and-mortar solutions without functional solutions.
								</p>
							</TabPane>
						</TabContent>
						<Row >
                            <Pagination
                                style={{margin: "auto"}}
                                boundaryRange={0}
                                defaultActivePage={1}
                                ellipsisItem={null}
                                firstItem={null}
                                lastItem={null}
                                siblingRange={1}
                                totalPages={10}
                            />
                        </Row>
					</CardBody>
				</Card>
			</div>
		);
	}
}

export default Tabs;
