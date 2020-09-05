import React, { Component } from 'react';
import './questions.css';
class Questions extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Survey_question: [],
			Question: '',
			Question_id: '',
			Options: [],
			question_type: 'multiple choice'
		};
	}
	updateQuestion = e => {
		this.setState({
			Question: e.target.value
		});
	};

	updateOptions = (i, e) => {
		if (this.state.question_type !== 'Paragraph' || 'short answer') {
			let list = this.state.Options;
			list[i] = { option: e.target.value, votes: 0 };
			this.setState({
				Options: list
			});
		}
	};
	addQuestion = i => {
		if (
			((this.state.question_type === 'multiple choice' ||
				this.state.question_type === 'checkboxes') &&
				this.state.Options.length < 2) ||
			this.state.Question === ''
		) {
			this.setState({ info: 'invalid question ' });
		} else {
			if (this.state.Question !== '') {
				let survey = this.props.get_survey;

				//add new question
				if (this.state.Question_id === '') {
					survey.Questions = survey.Questions.concat({
						question: this.state.Question,
						options: this.state.Options,
						type: this.state.question_type
					});
				}

				//update existing question
				else {
					survey.Questions[this.state.Question_id] = {
						question: this.state.Question,
						options: this.state.Options,
						type: this.state.question_type
					};
				}

				this.props.set_survey(survey);
				this.setState({
					Question_id: '',
					Question: '',
					Options: [],
					question_type: 'multiple choice',
					info: ''
				});
			}
		}
	};
	//edit existing question
	edit = (e, i) => {
		this.setState({
			Question: this.props.get_survey.Questions[i].question,
			Question_id: i,
			Options: this.props.get_survey.Questions[i].options,
			question_type: this.props.get_survey.Questions[i].type
		});
	};
	Display_question = () => {
		if (this.state.question_type === 'checkboxes') {
			return (
				<div>
					<input
						type='text'
						placeholder='option 1'
						value={
							this.state.Options[0] === undefined
								? ''
								: this.state.Options[0].option
						}
						onChange={this.updateOptions.bind(this, 0)}
					/>
					<input
						type='text'
						placeholder='option 2'
						value={
							this.state.Options[1] === undefined
								? ''
								: this.state.Options[1].option
						}
						onChange={this.updateOptions.bind(this, 1)}
					/>
					<input
						type='text'
						placeholder='option 3'
						value={
							this.state.Options[2] === undefined
								? ''
								: this.state.Options[2].option
						}
						onChange={this.updateOptions.bind(this, 2)}
					/>
					<input
						type='text'
						placeholder='option 4'
						value={
							this.state.Options[3] === undefined
								? ''
								: this.state.Options[3].option
						}
						onChange={this.updateOptions.bind(this, 3)}
					/>
				</div>
			);
		} else if (this.state.question_type === 'Paragraph') {
			return (
				<div>
					<textarea
						placeholder='long answer text'
						value=''
						onChange={this.updateOptions.bind(this, 3)}
					/>
				</div>
			);
		} else if (this.state.question_type === 'short answer') {
			return (
				<div>
					<input
						type='text'
						placeholder='short answer text'
						value=''
						onChange={this.updateOptions.bind(this, 3)}
					/>
				</div>
			);
		} else if (this.state.question_type === 'multiple choice') {
			return (
				<div>
					<input
						type='text'
						placeholder='choose 1'
						value={
							this.state.Options[0] === undefined
								? ''
								: this.state.Options[0].option
						}
						onChange={this.updateOptions.bind(this, 0)}
					/>
					<input
						type='text'
						placeholder='choose 2'
						value={
							this.state.Options[1] === undefined
								? ''
								: this.state.Options[1].option
						}
						onChange={this.updateOptions.bind(this, 1)}
					/>
					<input
						type='text'
						placeholder='choose 3'
						value={
							this.state.Options[2] === undefined
								? ''
								: this.state.Options[2].option
						}
						onChange={this.updateOptions.bind(this, 2)}
					/>
					<input
						type='text'
						placeholder='choose 4'
						value={
							this.state.Options[3] === undefined
								? ''
								: this.state.Options[3].option
						}
						onChange={this.updateOptions.bind(this, 3)}
					/>
				</div>
			);
		}
	};

	render() {
		const q_type = e => {
			this.setState({ question_type: e.target.value, info: '' });
		};
		return (
			<div className='questions'>
				<div className='question'>
					<input
						type='text'
						placeholder='Ask a Question…'
						id='question'
						onChange={this.updateQuestion}
						value={this.state.Question}
					/>
					<select onChange={q_type} value={this.state.question_type}>
						<option>multiple choice</option>
						<option>checkboxes</option>
						<option disabled>-----------------</option>
						<option>short answer</option>
						<option>Paragraph</option>
					</select>
					{this.Display_question()}
				</div>
				<p className='info'>{this.state.info}</p>
				{this.state.Question_id === '' ? (
					<button onClick={this.addQuestion}>
						<i class='fa fa-plus-circle' aria-hidden='true'></i>add
					</button>
				) : (
					<button onClick={this.addQuestion}>update</button>
				)}
				<div className='questionsList'>
					{this.props.get_survey.Questions.map((q, i) => (
						<li
							className={this.state.Question_id === q._id ? 'currentEdit' : ''}
							key={i}
							onClick={() => this.edit(this, i)}
						>
							{i + 1 + ') ' + q.question}
						</li>
					))}
				</div>
			</div>
		);
	}
}
export default Questions;
