import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import {
    withRouter, Link
} from 'react-router-dom';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userCollection: [],
            isLoad: true,
            username: "",
            userDetails: {}
        }
    };

    componentDidMount() {
        axios.get(`https://swapi.co/api/people`)
            .then(res => {
                if (res.data.results) {
                    this.setState({
                        userCollection: res.data.results,
                        isLoad: false
                    });
                }
            })
    }

    searchUser = () => {
        if (this.state.username.length === 0) {
            //alert("Enter Username.");
            this.setState({
                errorMessage : "Please enter Username"
            }, () => {
                    setTimeout(() => {
                        this.setState({ errorMessage : "" });
                    }, 3000);
            });
        } else {
            axios.get(`https://swapi.co/api/people/1/?name =` + this.state.username)
                .then(res => {
                    if (res.data) {
                        this.setState({
                            userDetails: res.data
                        });
                    }
                })
        }
    }

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value, userDetails: {} });
    }

    render() {
        return (
            <React.Fragment>
                <body>
                    <header className="clearfix d-inline-block">
                        <nav class="navbar navbar-expand-md navbar-light fixed-top bg-dark ">
                            <div className="container">
                                <a class="navbar-brand text-white" href="javascript:void(0)">Brand Name</a>
                                
                                <div class="collapse navbar-collapse" id="navbarCollapse">
                                    <ul class="navbar-nav mr-auto">
                                        <li class="nav-item active">
                                            <a class="nav-link" href="javascript:void(0)">&nbsp;</a>
                                        </li>
                                    </ul>
                                    <form class="form-inline mt-2 mt-md-0  pull-right">
                                        <Link to="/" class="btn btn-light my-2 my-sm-0 ml-2" type="submit">Sign Out</Link>
                                    </form>
                                </div>
                            </div>
                        </nav>
                    </header>

                    <div class="container">
                        
                        <h2 className="mt-5">Dashboard</h2>
                        <div className="row px-0">
                            <div className="col-md-12 my-3 border-bottom">
                                <form class="form-inline mt-2 mt-md-0">
                                    <input onChange={this.handleChange} name="username" class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                                    <button onClick={this.searchUser} class="btn btn-dark my-2 my-sm-0" type="button">Search</button>
                                </form>
                                <label className="text-danger">{this.state.errorMessage}</label>
                            </div>
                            <div className="col-md-6">
                                {!this.state.isLoad ?
                                    <table className="w-100 table table-bordered">
                                        <thead>
                                            <tr>
                                                <th> Name </th>
                                                <th> Gender </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.userCollection && this.state.userCollection.length > 0 ?
                                                    <React.Fragment>
                                                        {
                                                            this.state.userCollection.map((data, index) => {
                                                                return <tr key={index}><td>{data.name}</td><td>{data.gender}</td></tr>
                                                            })
                                                        }
                                                    </React.Fragment>
                                                    : <tr>
                                                        <td colSpan="2">No Data Found.</td>
                                                    </tr>
                                            }
                                        </tbody>
                                    </table> : <h2>Loading...</h2>}
                            </div>
                            <div className="col-md-6">
                                {this.state.userDetails.name !== undefined ?
                                    <pre className="bg-light p-3">{JSON.stringify(this.state.userDetails, null, 2)}</pre>
                                    : <div>&nbsp;</div>
                                }
                            </div>
                        </div>
                    </div>
                </body>
            </React.Fragment>
        )
    }
}

export default withRouter(Dashboard);