import React from 'react';
import './preference.css';
export default class preference extends React.Component {
	name = e => {
		let survey = this.props.get_survey;
		survey.preference.name = e.target.checked;
		this.props.set_survey(survey);
	};

	email = e => {
		let survey = this.props.get_survey;
		survey.preference.email = e.target.checked;
		this.props.set_survey(survey);
	};
	format = e => {
		let survey = this.props.get_survey;
		survey.preference.format = e.target.checked;
		this.props.set_survey(survey);
	};
	confirmation_message = e => {
		let survey = this.props.get_survey;
		survey.preference.confirmation_message = e.target.value;
		this.props.set_survey(survey);
	};
	Next_Button = e => {
		let survey = this.props.get_survey;
		survey.preference.Next_Button = e.target.value;
		this.props.set_survey(survey);
	};

	Previous_Button = e => {
		let survey = this.props.get_survey;
		survey.preference.Previous_Button = e.target.value;
		this.props.set_survey(survey);
	};
	Done_Button = e => {
		let survey = this.props.get_survey;
		survey.preference.Done_Button = e.target.value;
		this.props.set_survey(survey);
	};

	render() {
		return (
			<div className='preference'>
				<div className='cal-1'>
					<label>confirmation message </label>
					<input
						type='text'
						onChange={this.confirmation_message}
						defaultValue={this.props.get_survey.preference.confirmation_message}
					/>
					<label>Next Button </label>
					<input
						type='text'
						onChange={this.Next_Button}
						defaultValue={this.props.get_survey.preference.Next_Button}
					/>
					<label>Previous Button</label>
					<input
						type='text'
						onChange={this.Previous_Button}
						defaultValue={this.props.get_survey.preference.Previous_Button}
					/>
					<label>Done Button </label>

					<input
						type='text'
						onChange={this.Done_Button}
						defaultValue={this.props.get_survey.preference.Done_Button}
					/>
				</div>
				<div className='cal-2'>
					<h3>Collect email addresses </h3>
					<label className='switch'>
						<input
							type='checkbox'
							onChange={this.email}
							defaultChecked={this.props.get_survey.preference.email}
						/>
						<span className='slider round' />
					</label>
					<h3>Collect name </h3>
					<label className='switch'>
						<input
							type='checkbox'
							onChange={this.name}
							defaultChecked={this.props.get_survey.preference.name}
						/>

						<span className='slider round' />
					</label>

					<h3>One Question At a time</h3>
					<label className='switch'>
						<input
							type='checkbox'
							onChange={this.format}
							defaultChecked={this.props.get_survey.preference.format}
						/>
						<span className='slider round' />
					</label>
				</div>
			</div>
		);
	}
}
