import React, { Component } from 'react';
import axios from 'axios';
import Loading from '../../../../components/Loading/loading';
import './myAccount.css';

export default class myAccount extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			password: '',
			new_password: '',
			confirm_password: '',
			warning: false,
			newLogo: '',
			status: '',
			btn_dis: true
		};
	}
	componentDidMount() {
		axios
			.get('/user', {
				headers: { 'auth-Token': sessionStorage.getItem('token') }
			})
			.then(res =>
				this.setState({
					name: res.data.name,
					username: res.data.username,
					email: res.data.email,
					company: res.data.company,
					logo: res.data.logo,
					loaded: true
				})
			)
			.catch(err => console.log(err));
	}
	deleteAccount = () => {
		this.setState({ warning: false });
		axios
			.delete('/user', {
				headers: { 'auth-Token': sessionStorage.getItem('token') }
			})
			.then(res => {
				sessionStorage.setItem('token', null);
				window.location = '/';
			})
			.catch(err => console.log(err));
	};
	checkPassword = () => {
		if (this.state.new_password === this.state.confirm_password) {
			this.setState({ btn_dis: true });
		} else {
			this.setState({ btn_dis: false });
		}
	};

	update = () => {
		const updateUser = new FormData();
		if (typeof this.state.newLogo === 'object') {
			updateUser.append('companyLogo', this.state.newLogo);
		}
		updateUser.append('name', this.state.name);
		updateUser.append('email', this.state.email);
		updateUser.append('username', this.state.username);
		updateUser.append('password', this.state.password);
		updateUser.append('company', this.state.company);
		updateUser.append('confirmation_message', this.state.confirmation_message);
		updateUser.append('Next_Button', this.state.Next_Button);
		updateUser.append('Previous_Button', this.state.Previous_Button);
		updateUser.append('Done_Button', this.state.Done_Button);
		updateUser.append('new_password', this.state.new_password);

		axios
			.put('/user', updateUser, {
				headers: { 'auth-Token': sessionStorage.getItem('token') }
			})
			.then(res => {
				this.setState({ status: res.data });
				setTimeout(() => {
					this.setState({ status: '' });
				}, 4000);
			})
			.catch(err => console.log(err));
	};
	render() {
		return (
			<React.Fragment>
				{this.state.loaded ? (
					<div className='myAccount'>
						{this.state.status !== '' ? (
							<p id='status'>{this.state.status}</p>
						) : (
							''
						)}
						<p>Account Setting </p> <br />
						<div className='company'>
							<label>name </label>
							<input
								type='text'
								defaultValue={this.state.name}
								onChange={e => this.setState({ name: e.target.value })}
							/>
							<br />
							<label>username </label>
							<input
								required
								type='text'
								defaultValue={this.state.username}
								onChange={e => this.setState({ username: e.target.value })}
							/>
							<br />
							<label>email</label>
							<input
								type='email'
								defaultValue={this.state.email}
								onChange={e => this.setState({ email: e.target.value })}
							/>
							<br />
							<label>
								current password <span>*</span>
							</label>
							<input
								type='password'
								placeholder='password'
								onChange={e => this.setState({ password: e.target.value })}
							/>
							<br />
							<label>new password</label>
							<input
								type='password'
								placeholder='password'
								onChange={e => {
									this.setState({ new_password: e.target.value });
								}}
							/>
							<br />
							<label>confirm password</label>
							<input
								type='password'
								placeholder='password'
								id={
									this.state.new_password !== this.state.confirm_password &&
									this.state.new_password !== '' &&
									this.state.confirm_password !== ''
										? 'invalidPassword'
										: ''
								}
								onChange={e => {
									this.setState({ confirm_password: e.target.value });
								}}
							/>
						</div>
						<p>Company information</p>
						<div className='company'>
							<label>name </label>
							<input
								type='text'
								defaultValue={this.state.company}
								placeholder='name'
								onChange={e => this.setState({ company: e.target.value })}
							/>
							<div className='c-logo'>
								{this.state.newLogo ? (
									<img
										src={URL.createObjectURL(this.state.newLogo)}
										alt='logo'
									/>
								) : this.state.logo !== null ? (
									<img src={'/img/' + this.state.logo} alt='logo' />
								) : (
									''
								)}
								<input
									style={{ display: 'none' }}
									type='file'
									accept='image/*'
									onChange={e => this.setState({ newLogo: e.target.files[0] })}
									ref={fileInput => (this.fileInput = fileInput)}
								/>
								<p onClick={() => this.fileInput.click()}>
									<i class='fa fa-upload' aria-hidden='true' />
									Upload Logo
								</p>
							</div>
						</div>
						<button
							onClick={this.update}
							disabled={
								this.state.new_password !== this.state.confirm_password ||
								this.state.password === ''
									? true
									: false
							}
							className={this.state.btn_dis ? '' : 'btn-dis'}
						>
							Update
						</button>
						<label
							id='deleteAccount'
							onClick={() => this.setState({ warning: true })}
						>
							Delete Account
						</label>
						{this.state.warning ? (
							<div id='warning'>
								<h1>Delete Account </h1>
								<p>
									Are you sure you want to delete you account? <br />
									If you delete your account, you will permanently lose all of
									your surveys
								</p>
								<button onClick={this.deleteAccount}>Delete Account</button>
								<button onClick={() => this.setState({ warning: false })}>
									Cancel
								</button>
							</div>
						) : (
							''
						)}
					</div>
				) : (
					<Loading />
				)}
			</React.Fragment>
		);
	}
}
