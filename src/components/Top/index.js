import React, { Component } from 'react';
import axios from 'axios';
import { spotifyTopArtistURL } from '../../constants/';

export default class Top extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            auth: '',
            top_artists: [],
            error: ''
        };
    }

    componentDidMount = () => {
        console.log(`${spotifyTopArtistURL}${this.state.auth.authToken}`);
        axios.get(`${spotifyTopArtistURL}${this.state.auth.authToken}`)
        .then(response => {
            console.log(response);
            this.setState({
                top_artists: response.data.items
            })
        })
        .catch(error => {
            console.log(error);
            this.setState({ error })
        })
    }

    componentWillMount = () => {
        this.setState({
          userData: this.props.location.state.userData,
          auth: this.props.location.state.auth
        });
      }

      routeBack = (event) => {
        event.preventDefault();
        this.props.history.goBack()
    }

    renderTopArtists = () => {
    //     const { top_artists } = this.state;
    //     let topArtists = [];
    //     top_artists.map((item , index) => {
    //     topArtists.push(
    //         <div className="col-md-3">
    //             <p>item.</p>
    //         </div>
    //     )
    // })
    // return topArtists
    }

    render() {
        return (
        <div>
            <div className="row mt-5">
                <button onClick={this.routeBack} className="btn btn-outline-success">Back</button>
            </div>
            <div className="row mt-3">
                    {this.renderTopArtists()}
                </div>
        </div>
        )
    }
}