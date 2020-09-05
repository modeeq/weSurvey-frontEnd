import React from 'react';
import './duration.css';
export default class nav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			start_time: '00:00',
			start_date: '',
			end_time: '00:00',
			end_date: ''
		};
	}
	//store survey beginning date
	start = e => {
		console.log(e.target.value);
		let survey = this.props.get_survey;
		if (e.target.value.length <= 5) {
			this.setState({ start_time: e.target.value });
			survey.duration.start =
				this.state.start_date + 'T' + this.state.start_time;
		} else {
			this.setState({ start_date: e.target.value });
			survey.duration.start =
				this.state.start_date + 'T' + this.state.start_time;
		}
		this.props.set_survey(survey);
	};
	//store survey end date
	end = e => {
		let survey = this.props.get_survey;

		if (e.target.value.length <= 5) {
			this.setState({ end_time: e.target.value });
			survey.duration.end = this.state.end_date + 'T' + this.state.end_time;
		} else {
			this.setState({ end_date: e.target.value });
			survey.duration.end = this.state.end_date + 'T' + this.state.end_time;
		}
		this.props.set_survey(survey);
	};

	render() {
		return (
			<div className='duration'>
				Start Date:
				<input
					type='date'
					onChange={this.start}
					value={this.props.get_survey.duration.start.slice(0, 10)}
					min={this.props.get_survey.duration.start.slice(0, 10)}
				/>
				<input
					type='time'
					onChange={this.start}
					value={this.props.get_survey.duration.start.slice(11, 16)}
				/>
				<br />
				End Date :
				<input
					type='date'
					onChange={this.end}
					value={this.props.get_survey.duration.end.slice(0, 10)}
					min={this.props.get_survey.duration.start.slice(0, 10)}
				/>
				<input
					type='time'
					onChange={this.end}
					value={this.props.get_survey.duration.end.slice(11, 16)}
				/>
			</div>
		);
	}
}
