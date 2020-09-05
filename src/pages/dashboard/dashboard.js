import React from 'react';
import './dashboard.css';
import Axios from 'axios';
import Loading from '../../components/Loading/loading';
export default class Dashboard extends React.Component {
	constructor() {
		super();
		this.state = {
			surveys: [],
			isLoaded: false
		};
	}
	componentDidMount() {
		Axios.get('/user/dashboard', {
			headers: { 'auth-Token': sessionStorage.getItem('token') }
		})
			.then(res => {
				this.setState({ surveys: res.data, isLoaded: true });
			})
			.catch(err => console.log(err));
	}
	weekDays = () => {
		let days = [
			'monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
			'Sunday'
		];
		return (
			<React.Fragment>
				{Object.entries(this.state.surveys.Daily_Average).map(
					([day, value], i) => (
						<div className='day' key={i}>
							<p>{days[i]}</p>
							<div class='s_bar'>
								<div
									class='s_bar_result'
									style={{
										width:
											(value / this.state.surveys.responders) * 100 || 0 + '%'
									}}
								>
									{Math.round((value / this.state.surveys.responders) * 100) ||
										0}
									%
								</div>
							</div>
						</div>
					)
				)}
			</React.Fragment>
		);
	};
	render() {
		return (
			<div className='dashboard'>
				{this.state.isLoaded ? (
					<React.Fragment>
						<div className='survey-nv'>
							<div className='item'>
								<div className='icon'>
									<i class='fa  fa-hashtag' aria-hidden='true'></i>
								</div>
								<p>
									{this.state.surveys.surveys}
									<span>Surveys</span>
								</p>
							</div>
							<div className='item'>
								<div className='icon'>
									<i class='fa fa-television' aria-hidden='true'></i>
								</div>
								<p>
									{this.state.surveys.active}
									<span>Active</span>
								</p>
							</div>
							<div className='item'>
								<div className='icon'>
									<i class='fa fa-users' aria-hidden='true'></i>
								</div>
								<p>
									{this.state.surveys.responders}
									<span>responders</span>
								</p>
							</div>
							<div className='item'>
								<div className='icon'>
									<i class='fa fa-at' aria-hidden='true'></i>
								</div>
								<p>
									{this.state.surveys.emails}
									<span>Emails </span>
								</p>
							</div>
						</div>

						<div className='main'>
							<div className='s-status'>
								<div className='s-item'>
									<p>Total views</p>
									<h1>{this.state.surveys.views}</h1>
								</div>
								<div className='s-item'>
									<p>Total Responses</p>
									<h1>{this.state.surveys.totalResponses}</h1>
								</div>
								<div className='s-item'>
									<p>Response rate</p>
									<h1>{Math.round(this.state.surveys.responseRate)}%</h1>
								</div>
							</div>

							<div className='s-main'>
								<div className='s-main-item'>
									<h1>responses base on days</h1>
									{this.weekDays()}
								</div>
								<div className='s-main-item'>
									<h2>Survey List</h2>
									<table>
										<thead>
											<tr>
												<th>Name</th>
												<th>status</th>
												<th>views</th>
												<th>responses</th>
												<th>response rate</th>
											</tr>
										</thead>
										<tbody>
											{this.state.surveys.list.map((survey, i) => (
												<tr key={i}>
													<td>{survey.name}</td>
													<td>{survey.status ? 'Open' : 'Closed'}</td>
													<td>{survey.stats.views}</td>
													<td>{survey.stats.responses}</td>
													<td>
														{survey.stats.responses === 0
															? '0'
															: Math.round(
																	(survey.stats.responses /
																		survey.stats.views) *
																		100
															  )}
														%
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</React.Fragment>
				) : (
					<Loading />
				)}
			</div>
		);
	}
}
