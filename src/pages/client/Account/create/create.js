import React from 'react';
import './create.css';
import Axios from 'axios';

export default class Create extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			username: '',
			password: '',
			logo: null,
			status: ''
		};
	}

	setName = e => {
		this.setState({ name: e.target.value });
	};
	setEmail = e => {
		this.setState({ email: e.target.value });
	};
	setUsername = e => {
		this.setState({ username: e.target.value });
	};
	setPassword = e => {
		this.setState({ password: e.target.value });
	};
	setCompany = e => {
		this.setState({ company: e.target.value });
	};
	setLogo = e => {
		this.setState({ logo: e.target.files[0] });
	};

	Create = e => {
		e.preventDefault();

		const data = new FormData();
		data.append('companyLogo', this.state.logo);
		data.append('name', this.state.name);
		data.append('email', this.state.email);
		data.append('username', this.state.username);
		data.append('password', this.state.password);
		data.append('company', this.state.company);

		Axios.post('/account/', data)
			.then(res => {
				if (res.status !== 202) {
					sessionStorage.setItem('token', res.data);
					window.location = '/survey/create';
				} else {
					this.setState({ status: res.data });
				}
			})
			.catch(err => {
				this.setState({
					status: err
				});
			});
	};
	render() {
		return (
			<div className='Create'>
				<div className='Create-img'>
					<img src='./img/singup.svg' alt='' />
				</div>
				<div className='singUp'>
					<p id='status'>{this.state.status}</p>
					<form onSubmit={this.Create}>
						<p>Create new Account</p>
						<input
							type='text'
							placeholder='name'
							onChange={this.setName}
							value={this.state.name}
						/>
						<input
							type='text'
							placeholder='username'
							required
							minlength='5'
							onChange={this.setUsername}
							value={this.state.username}
						/>
						<input
							type='email'
							placeholder='Email'
							required
							onChange={this.setEmail}
							value={this.state.email}
						/>
						<input
							type='password'
							placeholder='password'
							required
							pattern='.{5,}'
							required
							title='5 characters minimum'
							onChange={this.setPassword}
							value={this.state.password}
						/>
						<input
							type='text'
							placeholder='company name'
							onChange={this.setCompany}
						/>
						<div className='c-logo'>
							{this.state.logo !== null ? (
								<img src={URL.createObjectURL(this.state.logo)} alt='logo' />
							) : (
								''
							)}
							<input
								style={{ display: 'none' }}
								type='file'
								onChange={this.setLogo}
								ref={fileInput => (this.fileInput = fileInput)}
							/>
							<p onClick={() => this.fileInput.click()}>
								<i class='fa fa-upload' aria-hidden='true' />
								Upload Logo
							</p>
						</div>

						<a href='/login'>
							<u>Login instead</u>
						</a>
						<button type='submit'>Create</button>
					</form>
				</div>
			</div>
		);
	}
}
