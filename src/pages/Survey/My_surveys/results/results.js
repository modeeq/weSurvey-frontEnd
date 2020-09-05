import React from 'react';
import './results.css';
import Axios from 'axios';
import { Link } from 'react-router-dom';
export default class Results extends React.Component {
	constructor() {
		super();
		this.state = {
			Survey: [],
			isLoaded: false,
			status: 'loading',
			currentQuestion: 0,
			responder: 'All'
		};
	}
	componentDidMount() {
		Axios.get('/survey/' + this.props.match.params.id, {
			headers: { 'auth-Token': sessionStorage.getItem('token') }
		})
			.then(res => {
				this.setState({ Survey: res.data, isLoaded: true });
			})
			.catch(err => (window.location = '/404'));
	}
	Delete = (e, id) => {
		Axios.delete('/survey/' + id, {
			headers: { 'auth-Token': sessionStorage.getItem('token') }
		})
			.then(res => {
				console.log(res);
				window.location = '/mySurveys';
			})
			.catch(err => console.log(err));
	};
	next_question = () => {
		this.setState({
			currentQuestion: this.state.currentQuestion + 1
		});
	};
	previous_question = () => {
		this.setState({
			currentQuestion: this.state.currentQuestion - 1
		});
	};

	render() {
		return this.state.isLoaded ? (
			<div className='results'>
				<div className='info'>
					<h1>{this.state.Survey.name}</h1>
					<p>{this.state.Survey.description}</p>

					<h4>
						<i class='fa fa-hourglass-start' aria-hidden='true'></i>Start:
						{this.state.Survey.duration.start.split('-')[1]}-
						{this.state.Survey.duration.start.split('-')[2].split('T')[0]}-
						{this.state.Survey.duration.start.split('-')[0]} At
						{' ' + this.state.Survey.duration.start.split('-')[2].split('T')[1]}
						{this.state.Survey.duration.start.split('-')[2].split('T')[2]}
					</h4>
					<h4>
						<i class='fa fa-hourglass-end' aria-hidden='true'></i>End:
						{' ' + this.state.Survey.duration.end.split('-')[1]}-
						{this.state.Survey.duration.end.split('-')[2].split('T')[0]}-
						{this.state.Survey.duration.end.split('-')[0]} At
						{' ' + this.state.Survey.duration.end.split('-')[2].split('T')[1]}
						{this.state.Survey.duration.end.split('-')[2].split('T')[2]}
					</h4>
					<h4>
						<i class='fa fa-spinner' aria-hidden='true'></i>Status:
						{this.state.Survey.status ? 'Open' : 'Closed'}
					</h4>
					<h4>
						<i class='fa fa-eye' aria-hidden='true'></i>
						Views: {this.state.Survey.stats.views}
					</h4>
					<h4>
						<i class='fa fa-users' aria-hidden='true'></i>Responses:{' '}
						{this.state.Survey.stats.responses}
					</h4>
					<h4>
						<i class='fa fa-list-alt' aria-hidden='true'></i>Questions:
						{this.state.Survey.Questions.length}
					</h4>
				</div>

				<div className='main'>
					<div className='s_stats'>
						<p className='col1'>
							<span>
								{
									this.state.Survey.Questions[this.state.currentQuestion].stats
										.views
								}
							</span>
							Views
						</p>
						<p className='col2'>
							<span>
								{
									this.state.Survey.Questions[this.state.currentQuestion].stats
										.responses
								}
							</span>
							Answered
						</p>
						<p className='col3'>
							<span>
								{this.state.Survey.stats.responses -
									this.state.Survey.Questions[this.state.currentQuestion].stats
										.responses}
							</span>
							Skipped
						</p>

						<p className='col4'>
							<span>
								{this.state.Survey.Questions[this.state.currentQuestion].stats
									.responses === 0
									? '0'
									: Math.round(
											(this.state.Survey.Questions[this.state.currentQuestion]
												.stats.responses /
												this.state.Survey.Questions[this.state.currentQuestion]
													.stats.views) *
												100
									  )}
								%
							</span>
							response rate
						</p>
					</div>

					<div className='s_questions'>
						<select
							onChange={e => this.setState({ responder: e.target.value })}
						>
							<option>All</option>
							{this.state.Survey.responders.map((responder, i) => (
								<option value={responder._id} key={i}>
									{responder.email}
								</option>
							))}
						</select>
						<h1>
							{this.state.Survey.Questions[this.state.currentQuestion].question}
						</h1>
						{this.state.Survey.Questions[this.state.currentQuestion].type ===
							'multiple choice' ||
						this.state.Survey.Questions[this.state.currentQuestion].type ===
							'checkboxes' ? (
							<div className='q_options'>
								<h4>
									{this.state.Survey.Questions[this.state.currentQuestion].stats
										.responses + ' responses'}
								</h4>
								{this.state.Survey.Questions[
									this.state.currentQuestion
								].options.map((op, i) => (
									<div className='s_options'>
										<p>{op.option}</p>
										{this.state.responder === 'All' ? (
											<div class='s_bar'>
												<div
													class='s_bar_result'
													style={{
														width:
															op.votes > 0
																? Math.round(
																		(op.votes /
																			this.state.Survey.Questions[
																				this.state.currentQuestion
																			].stats.responses) *
																			100
																  ) + '%'
																: '0%'
													}}
												>
													{op.votes > 0
														? Math.round(
																(op.votes /
																	this.state.Survey.Questions[
																		this.state.currentQuestion
																	].stats.responses) *
																	100
														  )
														: '0'}
													%
												</div>
											</div>
										) : (
											this.state.Survey.responders.map((responder, r) =>
												this.state.responder === responder._id ? (
													responder.responses[this.state.currentQuestion] !==
														null &&
													responder.responses[this.state.currentQuestion] !==
														undefined &&
													responder.responses[this.state.currentQuestion]
														.answer === op._id ? (
														<div class='s_bar'>
															<div
																class='s_bar_result'
																style={{
																	width: '100%'
																}}
															>
																<i class='fa fa-check' aria-hidden='true'></i>
															</div>
														</div>
													) : (
														<div class='s_bar'>
															<div
																class='s_bar_result'
																style={{
																	width: '0%'
																}}
															></div>
														</div>
													)
												) : (
													''
												)
											)
										)}
									</div>
								))}
							</div>
						) : (
							<div className='ansList'>
								<h4>
									{this.state.Survey.Questions[this.state.currentQuestion]
										.answers.length + ' responses'}
								</h4>
								{this.state.responder === 'All' ? (
									<React.Fragment>
										{this.state.Survey.Questions[
											this.state.currentQuestion
										].answers.map((ans, key) => (
											<p key={key}>{ans}</p>
										))}
									</React.Fragment>
								) : (
									<React.Fragment>
										{this.state.Survey.responders.map(responder =>
											this.state.responder === responder._id ? (
												<p>
													{responder.responses[this.state.currentQuestion] !==
													null ? (
														responder.responses[this.state.currentQuestion]
															.answer
													) : (
														<p></p>
													)}
												</p>
											) : (
												''
											)
										)}
									</React.Fragment>
								)}
							</div>
						)}
					</div>
				</div>
				<div className='s_next'>
					{this.state.currentQuestion <
					this.state.Survey.Questions.length - 1 ? (
						<button onClick={this.next_question}>
							Next
							<i class='fa fa-arrow-circle-o-right' aria-hidden='true'></i>
						</button>
					) : (
						<button id='disabled' disabled>
							Next
							<i class='fa fa-arrow-circle-o-right' aria-hidden='true'></i>
						</button>
					)}
					{this.state.currentQuestion > 0 ? (
						<button onClick={this.previous_question}>
							<i class='fa fa-arrow-circle-o-left' aria-hidden='true'></i>
							Back
						</button>
					) : (
						<button id='disabled' disabled>
							<i class='fa fa-arrow-circle-o-left' aria-hidden='true'></i>
							Back
						</button>
					)}
				</div>
				<h6>
					{this.state.currentQuestion + 1}
					<span>/{this.state.Survey.Questions.length}</span>
				</h6>
				<div className='s_action'>
					<Link to={'/survey/' + this.state.Survey._id} className='Link'>
						<i class='fa fa-desktop' aria-hidden='true'></i>
						Demo
					</Link>

					<Link to={'/survey/edit/' + this.state.Survey._id} className='Link'>
						<i class='fa fa-pencil-square-o' aria-hidden='true'></i>
						Edit
					</Link>
					<Link
						to='#'
						className='Link'
						id='dlt'
						onClick={() => this.Delete(this, this.state.Survey._id)}
					>
						<i class='fa fa-trash' aria-hidden='true'></i>
						Delete
					</Link>
				</div>
			</div>
		) : (
			<p>{this.state.status}</p>
		);
	}
}
