
import React, {useEffect, useState} from 'react';
import classnames from 'classnames';
import GridViewProduct from './GridViewProducts';
import { Pagination } from 'semantic-ui-react';
import Search from './Search';
// reactstrap components
import {
	TabContent,
	TabPane,
	Row,
	Card,
	CardHeader,
	CardBody,
	Nav,
	NavItem,
	NavLink
} from 'reactstrap';
import GridViewService from './GridViewService';

const Tabs = () => {
	const [search, setSearch] = useState(null);
	const updateSearch = (keyword) => {
		setSearch(keyword);
	}
	const [iconTabs, seticonTabs] = useState(1);
	const [textTabs, settextTabs] = useState(4);
	const toggleTabs = (e, stateName, index) => {
		e.preventDefault();
		if (stateName === 'iconTabs')
			seticonTabs(index);
		else settextTabs(index);
	};

		return (
			<div className="section section-tabs" style={{ margin: '9%'}}>
				<Card>
					<CardHeader>
						<Nav className="nav-tabs-info" role="tablist" tabs>
							<NavItem>
								<NavLink
									className={classnames({
										active: iconTabs === 1
									})}
									onClick={(e) => toggleTabs(e, "iconTabs", 1)}
									href="#pablo"
								>
									<i className="tim-icons icon-spaceship" />
									Products
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									className={classnames({
										active: iconTabs === 2
									})}
									onClick={(e) => toggleTabs(e, "iconTabs", 2)}
									href="#pablo"
								>
									<i className="tim-icons icon-settings-gear-63" />
									Services
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									className={classnames({
										active: iconTabs === 3
									})}
									onClick={(e) => toggleTabs(e, "iconTabs", 3)}
									href="#pablo"
								>
									<i className="tim-icons icon-bag-16" />
									Options
								</NavLink>
							</NavItem>
                            <Search updateSearch={updateSearch}/>
						</Nav>  
					</CardHeader>
					<CardBody>
						<TabContent className="tab-space" activeTab={"link" + iconTabs}>
							<TabPane tabId="link1">
								<GridViewProduct search={search}/>
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

export default Tabs;
