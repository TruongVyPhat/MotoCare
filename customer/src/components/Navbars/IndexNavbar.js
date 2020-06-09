import React from 'react';
import { Link } from 'react-router-dom';
import anime3 from 'assets/img/anime3.png';
import defaultavatar from 'assets/img/defaultavatar.png';

// reactstrap components
import {
	Collapse,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	NavbarBrand,
	Navbar,
	NavItem,
	NavLink,
	Nav,
	Container,
	Row,
	Col
} from 'reactstrap';
import Badge from '@material-ui/core/Badge';
import Axios from 'axios';

class ComponentsNavbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLogin: false,
			collapseOpen: false,
			color: 'navbar-transparent'
		};
	}
	componentDidMount() {
		Axios.get(`http://localhost:9000/api/users/me`, { headers: { authorization: localStorage.getItem('access_token') } })
			.then(res => {
			}).catch(error => {
				console.log(error);
				window.localStorage.clear();
			});
		window.addEventListener('scroll', this.changeColor);
		if (localStorage.getItem('access_token') !== null && localStorage.getItem('role_id') !== null) {
			this.setState({
				isLogin: true
			});
		}
	}
	componentWillUnmount() {
		window.removeEventListener('scroll', this.changeColor);
	}
	changeColor = () => {
		if (document.documentElement.scrollTop > 99 || document.body.scrollTop > 99) {
			this.setState({
				color: 'bg-info'
			});
		} else if (document.documentElement.scrollTop < 100 || document.body.scrollTop < 100) {
			this.setState({
				color: 'navbar-transparent'
			});
		}
	};
	toggleCollapse = () => {
		document.documentElement.classList.toggle('nav-open');
		this.setState({
			collapseOpen: !this.state.collapseOpen
		});
	};
	onCollapseExiting = () => {
		this.setState({
			collapseOut: 'collapsing-out'
		});
	};
	onCollapseExited = () => {
		this.setState({
			collapseOut: ''
		});
	};
	handleClick = () => {
		window.localStorage.clear();
	};
	scrollToDownload = () => {
		document.getElementById('download-section').scrollIntoView({ behavior: 'smooth' });
	};
	render() {
		return (
			<Navbar className={'fixed-top ' + this.state.color} color-on-scroll="100" expand="lg">
				<Container>
					<div className="navbar-translate">
						<NavbarBrand to="/" tag={Link} id="navbar-brand">
							<span>MotorCare</span>
						</NavbarBrand>
					</div>
					<Collapse
						className={'justify-content-end ' + this.state.collapseOut}
						navbar
						isOpen={this.state.collapseOpen}
						onExiting={this.onCollapseExiting}
						onExited={this.onCollapseExited}
					>
						<div className="navbar-collapse-header">
							<Row>
								<Col className="collapse-brand" xs="6">
									<a href="#pablo" onClick={(e) => e.preventDefault()}>
										MotorCare•React
									</a>
								</Col>
								<Col className="collapse-close text-right" xs="6">
									<button
										aria-expanded={this.state.collapseOpen}
										className="navbar-toggler"
										onClick={this.toggleCollapse}
									>
										<i className="tim-icons icon-simple-remove" />
									</button>
								</Col>
							</Row>
						</div>
						<Nav navbar>
							<NavItem className="p-0">
								<NavLink
									data-placement="bottom"
									href="/my-cart"
									rel="noopener noreferrer"
								>
									<Badge badgeContent={window.localStorage.getItem('myCart') ? JSON.parse(window.localStorage.getItem('myCart')).data.orders.length : 0} color="secondary">
										<i className="fas fa-cart-plus" />
									</Badge>
									<p className="d-lg-none d-xl-none">Twitter</p>
								</NavLink>
							</NavItem>
							<UncontrolledDropdown nav>
								<DropdownToggle
									caret
									color="default"
									data-toggle="dropdown"
									href="#pablo"
									nav
									onClick={(e) => e.preventDefault()}
								>
									<i className="fa fa-cogs d-lg-none d-xl-none" />
									{this.state.isLogin ?
										<div className="photo">
											<img src={anime3} alt="anime3" />
										</div>
										: <div className="photo">
											<img src={defaultavatar} alt="defaultavatar" />
										</div>}

								</DropdownToggle>
								<DropdownMenu className="dropdown-with-icons">
									{this.state.isLogin ? "" :
										<DropdownItem tag={Link} to="/register-page">
											<i className="tim-icons icon-bullet-list-67" />
										Register
									</DropdownItem>}


									{this.state.isLogin ? "" :
										<DropdownItem tag={Link} to="/signin">
											<i className="tim-icons icon-single-02" />
										Sign in
									</DropdownItem>}

									{this.state.isLogin ?
										<DropdownItem tag={Link} to="/profile-page">
											<i className="tim-icons icon-badge" />
										Profile Page
									</DropdownItem> : ""}

									{this.state.isLogin ?
										<DropdownItem tag={Link} to="/orders-page">
											<i className="tim-icons icon-badge" />
										Orders
									</DropdownItem> : ""}

									{this.state.isLogin ?
										<DropdownItem onClick={this.handleClick} tag={Link} to="/">
											<i className="tim-icons icon-button-power" />
										Log out
									</DropdownItem> : ""}

								</DropdownMenu>
							</UncontrolledDropdown>
						</Nav>
					</Collapse>
				</Container>
			</Navbar>
		);
	}
}

export default ComponentsNavbar;
