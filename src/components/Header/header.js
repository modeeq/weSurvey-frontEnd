import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

class Header extends React.Component {
	logout = () => {
		sessionStorage.removeItem('token');
		window.location = '/';
	};

	render() {
		return (
			<div className='header'>
				<p className='logo' onClick={() => (window.location = '/')}>
					weSurvey
				</p>
				<div className='nav'>
					<ul>
						<Link to='/dashboard'>
							<li>
								<i class='fa fa-tachometer' aria-hidden='true'></i>Dashboard
							</li>
						</Link>
						<Link to='/mySurveys'>
							<li>
								<i class='fa fa-list-alt' aria-hidden='true'></i>My Surveys
							</li>
						</Link>
						<Link to='/survey/create'>
							<li>
								<i class='fa fa-plus-square-o' aria-hidden='true'></i>Create
								Survey
							</li>
						</Link>
					</ul>
				</div>

				<div className='user'>
					<p>
						<i class='fa fa-user-circle-o' aria-hidden='true'></i>
						{this.props.User.username}
						<i class='fa fa-chevron-down' aria-hidden='true'></i>
					</p>
					<div class='user-options'>
						<Link to='/myAccount'>
							<i class='fa fa-cog' aria-hidden='true'></i>
							my account
						</Link>
						<Link to='/' onClick={this.logout}>
							<i class='fa fa-sign-out' aria-hidden='true'></i>
							Logout
						</Link>
					</div>
				</div>
				{/* hamburger menu for smaller screens */}
				<div className='menu'>
					<i class='fa fa-list' id='icon'></i>
					<div className='list'>
						<p>
							<i class='fa fa-user-circle-o' aria-hidden='true'></i>
							{this.props.User.username}
						</p>
						<Link to='/myAccount'>
							<li>
								<i class='fa fa-cog' aria-hidden='true'></i>
								my account
							</li>
						</Link>
						<Link to='/dashboard'>
							<li>
								<i class='fa fa-tachometer' aria-hidden='true'></i>Dashboard
							</li>
						</Link>
						<Link to='/mySurveys'>
							<li>
								<i class='fa fa-list-alt' aria-hidden='true'></i>My Surveys
							</li>
						</Link>
						<Link to='/survey/create'>
							<li>
								<i class='fa fa-plus-square-o' aria-hidden='true'></i>Create
								Survey
							</li>
						</Link>

						<Link to='/' onClick={this.logout}>
							<li>
								<i class='fa fa-sign-out' aria-hidden='true'></i>
								Logout
							</li>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}
export default Header;
