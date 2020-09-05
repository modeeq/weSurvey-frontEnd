import React from 'react';
import axios from 'axios';
import './survey.css';
import Loading from '../../../components/Loading/loading';

export default class Client extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.match.params.id,
			survey: [],
			isLoaded: false,
			currentQuestion: 0,
			done: false,
			responserName: null,
			responserEmail: null,
			response: [],
			info: '',
			Checked: null
		};
	}
	componentDidMount() {
		axios
			.get('/survey/' + this.props.match.params.id, {
				headers: { 'auth-Token': sessionStorage.getItem('token') }
			})
			.then(res => {
				let currentQuestion;
				if (res.data.preference.name) {
					currentQuestion = -2;
				} else {
					currentQuestion = -1;
				}

				this.setState({
					survey: res.data,
					currentQuestion: currentQuestion,
					isLoaded: true
				});
			})
			.catch(err => console.log(err));
	}

	//add question response
	choices = (i, type, e) => {
		let response = this.state.response;
		if (type === 'checkbox') {
			if (e.target.checked) {
				if (response[i] === undefined) {
					response[i] = {
						question: this.state.survey.Questions[i]._id,
						type: type,
						value: [e.target.value]
					};
				} else {
					response[i].value = this.state.response[i].value.concat(
						e.target.value
					);
				}
			} else {
				response[i].value = response[i].value.filter(
					res => res !== e.target.value
				);
			}
		} else {
			response[i] = {
				question: this.state.survey.Questions[i]._id,
				type: type,
				value: [e.target.value]
			};
		}

		this.setState({ response: response });
	};

	checkboxes = i => {
		return (
			<div className='c_question'>
				<p> {i + 1 + ') ' + this.state.survey.Questions[i].question} ?</p>
				{this.state.survey.Questions[i].options.map((option, op) => (
					<React.Fragment>
						<input
							type='checkbox'
							name={option}
							value={option._id}
							key={i}
							onChange={this.choices.bind(this, i, 'checkbox')}
							defaultChecked={
								this.state.Checked !== null
									? this.state.Checked.find(i => i === option._id)
									: false
							}
						/>
						<label for={option.option}>{option.option}</label>
						<br />
					</React.Fragment>
				))}
			</div>
		);
	};
	multipleChoice = i => {
		return (
			<div className='c_question'>
				<p>{i + 1 + ') ' + this.state.survey.Questions[i].question} ?</p>
				{this.state.survey.Questions[i].options.map((option, op) => (
					<React.Fragment>
						<input
							key={i}
							type='radio'
							onChange={this.choices.bind(this, i, 'multipleChoice')}
							defaultChecked={
								this.state.Checked !== null
									? this.state.Checked === option._id
									: false
							}
							name={this.state.survey.Questions[i]._id}
							value={option._id}
						/>
						<label htmlFor={option.option}>{option.option}</label>
						<br />
					</React.Fragment>
				))}
			</div>
		);
	};

	Paragraph = i => {
		return (
			<div className='c_question'>
				<p>{i + 1 + ') ' + this.state.survey.Questions[i].question} ?</p>
				<textarea
					placeholder='enter your answer here'
					key={i}
					value={
						this.state.response[i] !== undefined
							? this.state.response[i].value
							: ''
					}
					onChange={this.choices.bind(this, i, 'Paragraph')}
				/>
			</div>
		);
	};
	shortAnswer = i => {
		return (
			<div className='c_question'>
				<p> {i + 1 + ') ' + this.state.survey.Questions[i].question} ?</p>
				<input
					type='text'
					key={i}
					value={
						this.state.response[i] !== undefined
							? this.state.response[i].value
							: ''
					}
					placeholder='enter your answer here'
					onChange={this.choices.bind(this, i, 'shortAnswer')}
				/>
			</div>
		);
	};
	next_question = () => {
		if (
			this.state.currentQuestion === -2 &&
			this.state.responserName === null
		) {
			this.setState({ info: "you can't leave name empty " });
		} else if (
			(this.state.currentQuestion === -1 &&
				this.state.responserEmail === null) ||
			(this.state.currentQuestion === -1 &&
				!/\S+@\S+\.\S+/.test(this.state.responserEmail))
		) {
			this.setState({ info: 'invalid email  address' });
		} else {
			this.setState({
				currentQuestion: this.state.currentQuestion + 1,
				info: ''
			});
		}
	};
	previous_question = () => {
		let Checked = this.state.response[this.state.currentQuestion - 1].value;
		this.setState({
			currentQuestion: this.state.currentQuestion - 1,
			Checked: Checked
		});
	};

	render_question = () => {
		let i = this.state.currentQuestion;
		if (i === -2 && this.state.survey.preference.name) {
			return (
				<div className='c_question'>
					<p>what is your name ?</p>
					<input
						type='text'
						placeholder='enter your name here'
						required
						key={i}
						onChange={e => this.setState({ responserName: e.target.value })}
					/>
				</div>
			);
		} else if (i === -1 && this.state.survey.preference.email) {
			return (
				<div className='c_question'>
					<p>what is your Email ?</p>
					<input
						type='text'
						placeholder='enter your email here'
						key={i}
						required
						onChange={e => this.setState({ responserEmail: e.target.value })}
					/>
				</div>
			);
		} else if (i > -1) {
			return (
				<React.Fragment>
					{this.state.survey.preference.format
						? this.state.survey.Questions[i].type === 'short answer'
							? this.shortAnswer(i)
							: this.state.survey.Questions[i].type === 'Paragraph'
							? this.Paragraph(i)
							: this.state.survey.Questions[i].type === 'checkboxes'
							? this.checkboxes(i)
							: this.state.survey.Questions[i].type === 'multiple choice'
							? this.multipleChoice(i)
							: ''
						: this.state.survey.Questions.map((question, i) =>
								question.type === 'short answer'
									? this.shortAnswer(i)
									: question.type === 'Paragraph'
									? this.Paragraph(i)
									: question.type === 'checkboxes'
									? this.checkboxes(i)
									: question.type === 'multiple choice'
									? this.multipleChoice(i)
									: ''
						  )}
				</React.Fragment>
			);
		} else {
			this.setState({ currentQuestion: this.state.currentQuestion + 1 });
		}
	};
	submit_survey = () => {
		axios.put('/survey/response/' + this.state.id, {
			response: this.state.response,
			responder: {
				name: this.state.responserName,
				email: this.state.responserEmail
			},
			headers: { 'auth-Token': sessionStorage.getItem('token') }
		});

		this.setState({
			done: true
		});
	};
	render() {
		if (this.state.isLoaded && this.state.survey.status) {
			return (
				<div className='c_surveys'>
					<div className='c_info'>
						<img
							src={
								this.state.survey.created_by.logo !== null
									? '/img/' + this.state.survey.created_by.logo
									: '/img/null.png'
							}
							alt='logo'
						></img>

						<h1>
							<i> {this.state.survey.name}</i>
						</h1>
						<h4>by</h4>
						<h4>{this.state.survey.created_by.company}</h4>
					</div>
					{!this.state.done ? (
						<div className='c_survey'>
							<div className='u_info'>
								<p>{this.state.info}</p>
							</div>
							<button
								className='btn-back '
								onClick={this.previous_question}
								disabled={this.state.currentQuestion < 1}
							>
								{this.state.survey.preference.Previous_Button}
							</button>
							{this.render_question()}
							{!this.state.survey.preference.format &&
							this.state.currentQuestion === 0 ? (
								<button onClick={this.submit_survey}>
									{this.state.survey.preference.Done_Button}
								</button>
							) : this.state.currentQuestion <
							  this.state.survey.Questions.length - 1 ? (
								<button onClick={this.next_question}>
									{this.state.survey.preference.Next_Button}
								</button>
							) : (
								<button onClick={this.submit_survey}>
									{this.state.survey.preference.Done_Button}
								</button>
							)}

							{this.state.currentQuestion < 0 ||
							!this.state.survey.preference.format ? (
								''
							) : (
								<h6>
									{this.state.currentQuestion + 1} /
									<span>{this.state.survey.Questions.length}</span>
								</h6>
							)}
						</div>
					) : (
						<div className='end'>
							<h1>{this.state.survey.preference.confirmation_message}</h1>
						</div>
					)}
				</div>
			);
		} else if (this.state.isLoaded && !this.state.survey.status) {
			return (
				<div className='end'>
					<h2> "{this.state.survey.name}" is not accepting responses</h2>
				</div>
			);
		} else {
			return <Loading />;
		}
	}
}
