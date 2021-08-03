import React from 'react';
import Axios from 'axios';

import './login.css';
export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			status: ''
		};
	}
	setUsername = e => {
		this.setState({ username: e.target.value });
	};
	setPassword = e => {
		this.setState({ password: e.target.value });
	};
	Login = () => {
		const user = {
			username: this.state.username,
			password: this.state.password
		};
		Axios.post('/account/login', user)
			.then(res => {
				if (res.status !== 201) {
					this.setState({
						password: ''
					});
					sessionStorage.setItem('token', res.data);
					window.location = '/mySurveys';
				} else {
					this.setState({
						status: 'wrong password or username'
					});
					sessionStorage.setItem('token', '');
				}
			})
			.catch(err => console.log(err));
	};
	render() {
		return (
			<div className='login-form'>
				<div className='login-img'>
					<img src='./img/login.svg' alt='' />
				</div>
				<div className='login'>
					<p id='status'>{this.state.status == "" ? <Demo /> : this.state.status}</p>
					<p>Login</p>
					<br />
					<input
						className='fontAwesome'
						type='text'
						placeholder='&#xf007; username'
						onChange={this.setUsername}
					/>
					<br />
					<input
						className='fontAwesome'
						type='password'
						placeholder='&#xf023; password'
						onChange={this.setPassword}
					/>
					<button onClick={this.Login}>Login</button>
					<a href='/register'>
						<u>Create new account</u>
					</a>
				</div>
			</div>
		);
	}
}
const Demo = () => {
	return (
		<p id='status'>for demo purposes use the following <span style={{ "color": "green", "display": "block" }}>  username: wesurvey password: password1 </span></p>
	)
}
