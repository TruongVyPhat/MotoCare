import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import anime3 from 'assets/img/anime3.png';

// reactstrap components
import {
	Button,
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
	Col,
	UncontrolledTooltip
} from 'reactstrap';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';

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
		window.addEventListener('scroll', this.changeColor);
		if (localStorage.getItem('access_token') !== null && localStorage.getItem('role_id') !== null) {
            // window.location.href = "/"
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
							<span>MotorCare• </span>
							Design System React
						</NavbarBrand>
						<UncontrolledTooltip placement="bottom" target="navbar-brand">
							Designed and Coded by HPT Group
						</UncontrolledTooltip>
						<button
							aria-expanded={this.state.collapseOpen}
							className="navbar-toggler navbar-toggler"
							onClick={this.toggleCollapse}
						>
							<span className="navbar-toggler-bar bar1" />
							<span className="navbar-toggler-bar bar2" />
							<span className="navbar-toggler-bar bar3" />
						</button>
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
									href="https://twitter.com/CreativeTim"
									rel="noopener noreferrer"
									target="_blank"
									title="Follow us on Twitter"
								>
									<Badge badgeContent={11} color="secondary">
										<i class="fas fa-cart-plus" />
									</Badge>
									<p className="d-lg-none d-xl-none">Twitter</p>
								</NavLink>
							</NavItem>
							<NavItem className="p-0">
								<NavLink
									data-placement="bottom"
									href="https://www.facebook.com/CreativeTim"
									rel="noopener noreferrer"
									target="_blank"
									title="Like us on Facebook"
								>
									<i className="fab fa-facebook-square" />
									<p className="d-lg-none d-xl-none">Facebook</p>
								</NavLink>
							</NavItem>
							<NavItem className="p-0">
								<NavLink
									data-placement="bottom"
									href="https://www.instagram.com/CreativeTimOfficial"
									rel="noopener noreferrer"
									target="_blank"
									title="Follow us on Instagram"
								>
									<i className="fab fa-instagram" />
									<p className="d-lg-none d-xl-none">Instagram</p>
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
									Dầu nhớt xe máy
								</DropdownToggle>
								<DropdownMenu className="dropdown-with-icons">
									<DropdownItem tag={Link} to="/product-detail/:id">
										<i className="tim-icons icon-user-run" />
										Xe số
									</DropdownItem>
									<DropdownItem tag={Link} to="/product-detail/:id">
										<i className="tim-icons icon-settings-gear-63" />
										Xe tay ga
									</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>

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
									Phụ trợ động cơ
								</DropdownToggle>
								<DropdownMenu className="dropdown-with-icons">
									<DropdownItem tag={Link} to="/product-detail/:id">
										<i className="tim-icons icon-atom" />
										Vệ sinh buồng đốt
									</DropdownItem>
									<DropdownItem tag={Link} to="/product-detail/:id">
										<i className="tim-icons icon-settings-gear-63" />
										Súc rửa động cơ
									</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>

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
									<div className="photo">
										<img src={anime3} alt="anime3" />
									</div>
								</DropdownToggle>
								<DropdownMenu className="dropdown-with-icons">
									<DropdownItem tag={Link} to="/register-page">
										<i className="tim-icons icon-bullet-list-67" />
										Register
									</DropdownItem>
									
									{this.state.isLogin? "": 
									<DropdownItem tag={Link} to="/signin">
										<i className="tim-icons icon-bullet-list-67" />
										Sign in
									</DropdownItem>}
									
									{this.state.isLogin? 
									<DropdownItem onClick = {this.handleClick} tag={Link} to="/">
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
