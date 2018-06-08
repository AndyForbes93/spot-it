import React, { Component } from "react";
import jsonp from "jsonp";
import axios from "axios";
import {
  spotifyWebApiURL,
  clientID,
  redirectURI,
  clientSecret,
  spotifyProfileURL
} from "../../constants";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Spot-It Social",
      authToken: "",
      authorized: false,
      profile: []
    };
  }

  componentDidMount = () => {
    let url = window.location.href;
    if (url.indexOf("token=") > -1) {
      let authToken = url
        .split("token=")[1]
        .split("&")[0]
        .trim();
      let authorized = true;
      this.setState({ authToken, authorized });
    }
  };

  handleAuthFlow = event => {
    event.preventDefault();
   
    if (this.state.authorized) {
      const { authToken } = this.state;
      let user;
      axios
        .get(spotifyProfileURL + authToken)
        .then(response => {
            this.setState({ profile: response.data });
            user = response.data;
        })
        .then(() => this.props.history.push('/spot-it', { current_user: { user }, auth: { authToken } } ) )
        .catch(error => {
            console.log(error);
            window.location.assign(spotifyWebApiURL);
        });
    } else {
      window.location.assign(spotifyWebApiURL);
    }
  };

  render() {
    return (
      <div className="container mt-5">
        <div className="jumbotron bg-dark">
        <div className="row">
          <div className="col-12">
            <h3 className="display-4 text-muted">
              {this.state.value}
              <small className="text-muted">
                {" "}
                a site to share your favorite music {" "}
              </small>
            </h3>
            <hr className="my-4" />
          </div>
        </div>
        <div className="row text-center">
          <div className="col-12">
            <p className="display-5">
              {this.state.authorized
                ? "Successfully authorized! Click below to Enter!"
                : "Just click the button below to authorize your Spotify account to start Spot-It!"}
            </p>
            <button
              type="button"
              className="btn btn-outline-success mt-5"
              onClick={this.handleAuthFlow}
            >
              {this.state.authorized
                ? "Proceed to Spot-It"
                : "Sign in with Spotify"}
            </button>
          </div>
        </div>
        </div>
      </div>
    );
  }
}
