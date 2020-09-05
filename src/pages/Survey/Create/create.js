import React from 'react';
import Steps from './steps/steps.js';
import About from './steps/About/about.js';
import Questions from './steps/Questions/questions';
import Duration from './steps/Duration/duration';
import Preference from './steps/Preference/preference';
import Finish from './steps/Finish/finish';

import './create.css';
import Axios from 'axios';
export default class NewSurvey extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			survey: {
				_id: '',
				name: '',
				description: '',
				Questions: [],
				preference: {
					email: true,
					name: false,
					format: true,
					confirmation_message: 'Thank You',
					Next_Button: 'Next',
					Previous_Button: 'Back',
					Done_Button: 'Submit'
				},
				duration: { start: '', end: '' },
				survey_key: Math.random()
					.toString()
					.slice(2, 8)
			},
			step: 1,
			steps: [
				{ title: 'Back', icon: '/icons/back.png' },
				{ title: 'About', icon: '/icons/about.png' },
				{ title: 'Questions', icon: '/icons/questions.png' },
				{ title: 'Duration', icon: '/icons/duration.png' },
				{ title: 'preference', icon: '/icons/privacy.png' },
				{ title: 'Finish', icon: '/icons/finish.png' }
			],
			newSurvey: true,
			info: ''
		};
	}

	componentDidMount() {
		if (this.props.location.pathname.slice(0, 13) === '/survey/edit/') {
			this.setState({ newSurvey: false });
			Axios.get('/survey/' + this.props.match.params.id, {
				headers: { 'auth-Token': sessionStorage.getItem('token') }
			})
				.then(res => this.setState({ survey: res.data }))
				.catch(err => (window.location = '/404'));
		} else {
			//Default start date and end date
			let currentDate = this.FormatedDate(new Date());
			let duration = {
				start:
					currentDate +
					'T' +
					('0' + new Date().getHours()).slice(-2) +
					':' +
					('0' + new Date().getMinutes()).slice(-2),
				end:
					this.FormatedDate(
						new Date(new Date(currentDate).getTime() + 7 * 24 * 60 * 60 * 1000)
					) +
					'T' +
					('0' + new Date().getHours()).slice(-2) +
					':' +
					('0' + new Date().getMinutes()).slice(-2)
			};
			let survey = this.state.survey;
			survey.duration = duration;
			this.setState({
				survey: survey
			});
		}
	}
	FormatedDate = date => {
		let formatedDate =
			date.getFullYear() +
			'-' +
			('00' + parseInt(1 + date.getMonth())).slice(-2) +
			'-' +
			('00' + date.getDate()).slice(-2);
		return formatedDate;
	};

	add_step = () => {
		//validate
		switch (this.state.steps.length > this.state.step) {
			case this.state.step === 1 && this.state.survey.name === '':
				this.setState({ info: "you can't leave the name empty" });
				break;
			case this.state.step === 2 && this.state.survey.Questions.length < 1:
				this.setState({ info: 'you must have at least one question' });
				break;
			case (this.state.step === 3 &&
				this.state.survey.duration.start.length < 16) ||
				this.state.survey.duration.end.length < 16:
				this.setState({ info: 'invalid date' });
				break;
			default:
				this.setState({ step: this.state.step + 1, info: '' });
		}
	};
	sub_step = () => {
		if (this.state.step > 1 && this.state.step < 5) {
			this.setState({ step: this.state.step - 1 });
		}
	};
	get_survey = () => {
		return this.state.survey;
	};
	set_survey = updatedSurvey => {
		this.setState({
			survey: updatedSurvey
		});
	};
	render() {
		return (
			<div className='newSurvey'>
				<h3>{this.state.newSurvey ? 'Create new Survey' : 'Update Survey'}</h3>
				<div className='steps'>
					{this.state.steps.map((step, i) => (
						<Steps
							key={i}
							title={step.title}
							icon={step.icon}
							class={
								i === this.state.step ? 'btn-active' : i === 0 ? 'btn-back' : ''
							}
							action={this.sub_step}
						/>
					))}
				</div>
				<div className='content'>
					{(() => {
						switch (this.state.step) {
							case 1:
								return (
									<About
										get_survey={this.state.survey}
										set_survey={this.get_survey}
									/>
								);
							case 2:
								return (
									<Questions
										get_survey={this.state.survey}
										set_survey={this.get_survey}
										newSurvey={this.state.newSurvey}
									/>
								);

							case 3:
								return (
									<Duration
										get_survey={this.state.survey}
										set_survey={this.get_survey}
									/>
								);

							case 4:
								return (
									<Preference
										get_survey={this.state.survey}
										set_survey={this.get_survey}
									/>
								);

							case 5:
								return (
									<Finish
										get_survey={this.state.survey}
										set_survey={this.get_survey}
										newSurvey={this.state.newSurvey}
									/>
								);
							default:
								return <h1>Error</h1>;
						}
					})()}
				</div>
				<div className='u_info'>
					<p>{this.state.info}</p>
				</div>

				<div className='action'>
					{this.state.step < 5 ? (
						<button className='next' onClick={this.add_step}>
							Next
							<i class='fa fa-arrow-circle-o-right' aria-hidden='true'></i>
						</button>
					) : (
						''
					)}
				</div>
			</div>
		);
	}
}
