import React from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.css';

import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch
} from 'react-router-dom';

import HomePage from './pages/homePage/homePage';
import Header from './components/Header/header';
import Header2 from './components/Header2/Header2';
import My_surveys from './pages/Survey/My_surveys/mySurveys';
import Dashboard from './pages/dashboard/dashboard';
import CreateSurvey from './pages/Survey/Create/create';
import SurveyResults from './pages/Survey/My_surveys/results/results';
import Client from './pages/client/survey/survey';
import Login from './pages/client/Account/login/login';
import MyAccount from './pages/client/Account/myAccount/myAccount';
import NewAccount from './pages/client/Account/create/create';
import NotFound from './pages/NotFound/notFound';
import Loading from './components/Loading/loading';
import Axios from 'axios';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			isLogin: false,
			Loading: true,
			User: []
		};
	}

	componentDidMount() {
		if (sessionStorage.getItem('token')) {
			Axios.get('/user', {
				headers: {
					'auth-Token': sessionStorage.getItem('token')
				}
			}).then(res => {
				if (res.status === 202) {
					this.setState({ isLogin: false, Loading: false });
				} else {
					this.setState({ isLogin: true, User: res.data, Loading: false });
				}
			});
		} else {
			this.setState({ Loading: false });
		}
	}
	render() {
		return (
			<div className='App'>
				{!this.state.Loading ? (
					<Router>
						{this.state.isLogin ? (
							<Header User={this.state.User} />
						) : (
							<Header2 />
						)}

						<Switch>
							<PrivateRoute
								exact
								path='/myAccount'
								User={this.state.User}
								component={MyAccount}
								Auth={this.state.isLogin}
							/>
							<PrivateRoute
								path='/mySurveys'
								component={My_surveys}
								Auth={this.state.isLogin}
							/>
							<PrivateRoute
								exact
								path='/dashboard'
								component={Dashboard}
								Auth={this.state.isLogin}
							/>
							<PrivateRoute
								path='/survey/create'
								component={CreateSurvey}
								Auth={this.state.isLogin}
								exact
							/>
							<PrivateRoute
								exact
								path='/survey/view/:id'
								component={SurveyResults}
								Auth={this.state.isLogin}
							/>
							<PrivateRoute
								exact
								path='/survey/edit/:id'
								component={CreateSurvey}
								Auth={this.state.isLogin}
							/>

							<Route path='/survey/:id' component={Client} />
							<Route exact path='/login' component={Login} />
							<Route exact path='/register' component={NewAccount} />
							<Route path='/' exact component={HomePage} />
							<Route path='' component={NotFound} />
						</Switch>
					</Router>
				) : (
					<Loading />
				)}
			</div>
		);
	}
}
const PrivateRoute = ({ Auth, component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props =>
				Auth ? (
					<Component {...props} />
				) : (
					<Redirect to={{ pathname: '/login' }} />
				)
			}
		/>
	);
};
export default App;
