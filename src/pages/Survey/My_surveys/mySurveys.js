import React from 'react';
import './mySurveys.css';
import Axios from 'axios';
import Loading from '../../../components/Loading/loading';
import { Link } from 'react-router-dom';
export default class Mysurveys extends React.Component {
	constructor() {
		super();
		this.state = {
			Surveys: [],
			isLoaded: false,
			AllSurveys: []
		};
	}
	componentDidMount() {
		Axios.get('/survey', {
			headers: { 'auth-Token': sessionStorage.getItem('token') }
		})
			.then(res => {
				if (res.data.length !== 0) {
					this.setState({
						Surveys: res.data.sort((a, b) => (a.name > b.name ? 1 : -1)),
						AllSurveys: res.data,
						isLoaded: true
					});
				} else {
					this.setState({
						Surveys: null,
						AllSurveys: null,
						isLoaded: true
					});
				}
			})
			.catch(err => console.log(err));
	}

	//delete survey
	Delete = (e, id) => {
		Axios.delete('/survey/' + id, {
			headers: { 'auth-Token': sessionStorage.getItem('token') }
		})
			.then(res => {
				this.setState({
					Surveys: this.state.Surveys.filter(survey => survey._id !== id)
				});
			})
			.catch(err => console.log(err));
	};

	//search survey
	Search = e => {
		this.setState({
			Surveys: this.state.AllSurveys.filter(s =>
				s.name.toLowerCase().includes(e.target.value.toLowerCase())
			)
		});
	};

	//sort surveys
	Sort = e => {
		let result = [];
		switch (e.target.value) {
			case 'name':
				result = this.state.AllSurveys.sort((a, b) =>
					a.name < b.name ? 1 : -1
				);
				break;
			case 'views':
				result = this.state.AllSurveys.sort(
					(a, b) => a.stats.views - b.stats.views
				);
				break;
			case 'responses':
				result = this.state.AllSurveys.sort(
					(a, b) => a.stats.responses - b.stats.responses
				);
				break;
			case 'created date':
				result = this.state.AllSurveys.sort((a, b) => a.created - b.created);
				break;

			case 'start Date':
				result = this.state.AllSurveys.sort(
					(a, b) => a.duration.start - b.duration.start
				);
				break;
			case 'end Date':
				result = this.state.AllSurveys.sort(
					(a, b) => a.duration.end - b.duration.end
				);
				break;
			default:
				result = this.state.AllSurveys;
		}
		this.setState({
			Surveys: result.reverse()
		});
	};
	render() {
		return (
			<div className='mySurveys'>
				<div className='survey-nav'>
					<p>All Surveys</p>
					<div className='searchBox'>
						<input typ='text' placeholder='search....' onChange={this.Search} />
						<button>
							<i class='fa fa-search' aria-hidden='true'></i>
						</button>
					</div>
					<div className='sort'>
						<label>sort by:</label>
						<select onChange={this.Sort}>
							<option defaultChecked>name</option>
							<option>views</option>
							<option>responses</option>
							<option>created date</option>
							<option>start Date</option>
							<option>end Date</option>
						</select>
					</div>
				</div>
				<div className='surveys'>
					{this.state.isLoaded && this.state.Surveys !== null ? (
						this.state.Surveys.map((survey, i) => (
							<div className='survey' key={i}>
								<div className='stats'>
									<p>
										<i class='fa fa-spinner' aria-hidden='true'></i>Status:
										{survey.status ? 'Open' : 'Closed'}
									</p>
									<p>
										<i class='fa fa-calendar' aria-hidden='true'></i>
										{'created: ' +
											survey.created.split('-')[1] +
											' /' +
											survey.created.split('-')[2].split('T')[0]}
									</p>
									<p>
										<i class='fa fa-eye' aria-hidden='true'></i>
										Views: {survey.stats.views}
									</p>
									<p>
										<i class='fa fa-users' aria-hidden='true'></i>Responses:
										{survey.stats.responses}
									</p>
									<p>
										<i class='fa fa-list-alt' aria-hidden='true'></i>
										Questions:
										{survey.Questions.length}
									</p>
								</div>
								<div className='info'>
									<h1>{survey.name}</h1>
									<p>
										{survey.description.length < 180
											? survey.description
											: survey.description.slice(0, 180) + '...'}
									</p>
									<Link to={'/survey/view/' + survey._id}>
										<button>Results</button>
									</Link>
									<div className='action'>
										<Link to={'/survey/edit/' + survey._id}>
											<i class='fa fa-pencil-square-o' aria-hidden='true'></i>
											Edit
										</Link>
										<span> | </span>
										<Link to='#' onClick={() => this.Delete(this, survey._id)}>
											<i class='fa fa-trash' aria-hidden='true'></i>
											Delete
										</Link>
									</div>
								</div>
							</div>
						))
					) : this.state.isLoaded && this.state.Surveys === null ? (
						<div className='empty'>
							<p> you don't have any surveys yet </p>
						</div>
					) : (
						<Loading />
					)}
				</div>
			</div>
		);
	}
}
