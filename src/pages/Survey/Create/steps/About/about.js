import React, { Component } from 'react';
import './about.css';
export default class About extends Component {
	updateName = e => {
		let survey = this.props.get_survey;
		survey.name = e.target.value;
		this.props.set_survey(survey);
	};
	updateDescription = e => {
		let survey = this.props.get_survey;
		survey.description = e.target.value;
		this.props.set_survey(survey);
	};
	render() {
		return (
			<div className='about'>
				<div className='form'>
					<input
						onChange={this.updateName}
						type='text'
						placeholder='Name*'
						defaultValue={this.props.get_survey.name}
						maxLength='50'
					/>
					<textarea
						placeholder='Description'
						onChange={this.updateDescription}
						defaultValue={this.props.get_survey.description}
					/>
				</div>
			</div>
		);
	}
}
