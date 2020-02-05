import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './login.css';
import axios from 'axios';
import {
    withRouter
} from 'react-router-dom';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage : ''
        }
    };

    handleChange =(evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    verifyAuthorization = () => {
        if (this.state.email.length === 0 || this.state.password.length === 0) {
            alert("User Name and Password fields are required.");
        } else {
            const loginObject = {
                name: this.state.email,
                birth_year: this.state.password
            };

            axios.get(`https://swapi.co/api/people/1/`, loginObject)
                .then(res => {
                    if (res.data) {
                        if(loginObject.name.toLowerCase() === "Luke Skywalker".toLowerCase() && loginObject.birth_year.toLowerCase() === "19BBY".toLowerCase())
                        {
                            this.props.history.push('/dashboard');
                        }else{
                            this.setState({
                                errorMessage : "Please enter valid credentials"
                            }, () => {
                                    setTimeout(() => {
                                        this.setState({ errorMessage : "" });
                                    }, 3000);
                            });
                        }
                    }
                })
        }
    }

    render() {

        return (
            <div className="loginBg">
                <div className="wrap-login">
                    <form className="login-form validate-form">
                        <span className="login-form-logo">
                            {/* <img src="../images/login-logo.png" /> */}
                        </span>
                        <span className="login-form-title">
                            Log in
                        </span>
                        <div className="wrap-input validate-input" data-validate="Enter username">
                            <input name="email" onChange={this.handleChange} className="input100" type="text" placeholder="Username" />
                            <span htmlFor="email" className="focus-input100" data-placeholder="&#xf207;"></span>
                        </div>

                        <div className="wrap-input validate-input" data-validate="Enter password">
                            <input name="password" onChange={this.handleChange} className="input100" type="password"  placeholder="Password" />
                            <span htmlFor="password" className="focus-input100" data-placeholder="&#xf191;"></span>
                        </div>

                        <label className="text-danger">{this.state.errorMessage}</label>
                        
                        <div className="container-login100-form-btn">
                            <button type="button" className="login100-form-btn" onClick={this.verifyAuthorization}>
                                Login
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Login);