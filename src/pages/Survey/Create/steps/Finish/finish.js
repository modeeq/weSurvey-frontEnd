import React from 'react';
import './finish.css';
import axios from 'axios';
import Loading from '../../.././../../components/Loading/loading';
export default class nav extends React.Component {
	constructor() {
		super();
		this.state = {
			surveyURL: '',
			isLoaded: false
		};
	}
	async componentDidMount() {
		if (this.props.newSurvey) {
			await axios
				.post('/survey/', this.props.get_survey, {
					headers: { 'auth-Token': sessionStorage.getItem('token') }
				})
				.then(res => {
					this.setState({ surveyURL: res.data, isLoaded: true });
				})
				.catch(err => {
					console.log(err);
				});
		} else {
			await axios
				.put('/survey/' + this.props.get_survey._id, this.props.get_survey, {
					headers: { 'auth-Token': sessionStorage.getItem('token') }
				})
				.then(res => {
					this.setState({ surveyURL: res.data, isLoaded: true });
				})
				.catch(err => {
					console.log(err);
				});
		}
	}
	render(props) {
		return (
			<div className='finish'>
				{this.state.isLoaded ? (
					<React.Fragment>
						<i class='fa fa-check-circle' id='icon'></i>
						<p>
							{this.props.newSurvey
								? 'your successfully created survey'
								: 'your successfully updated survey'}
						</p>
						<p>"{this.props.get_survey.name}"</p>
						Starts:
						{' ' + this.props.get_survey.duration.start.split('-')[1]}-
						{this.props.get_survey.duration.start.split('-')[2].split('T')[0]}-
						{this.props.get_survey.duration.start.split('-')[0]} At
						{' ' +
							this.props.get_survey.duration.start.split('-')[2].split('T')[1]}
						{this.props.get_survey.duration.start.split('-')[2].split('T')[2]}
						<h4>
							Ends:
							{' ' + this.props.get_survey.duration.end.split('-')[1]}-
							{this.props.get_survey.duration.end.split('-')[2].split('T')[0]}-
							{this.props.get_survey.duration.end.split('-')[0]} At
							{' ' +
								this.props.get_survey.duration.end.split('-')[2].split('T')[1]}
							{this.props.get_survey.duration.end.split('-')[2].split('T')[2]}
						</h4>
						<p id='link'>
							{'http://wesurvey.net/survey/' + this.state.surveyURL}
						</p>
						<button
							onClick={() =>
								(window.location = '/survey/' + this.state.surveyURL)
							}
						>
							Demo
						</button>
					</React.Fragment>
				) : (
					<Loading />
				)}
			</div>
		);
	}
}
