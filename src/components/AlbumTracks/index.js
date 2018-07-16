import React, { Component } from 'react'
import API from "../../utils/API";
import ReactPlayer from 'react-player'; 
import Nav from '../Nav';
import { Card , ReviewCard } from "../common";

export default class AlbumTracks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            review: {}

        }
    }

    componentDidMount() {
       // console.log(this.props.location.state.review.review);
       console.log(this.state.review);
        this.showReview();
    }
    componentWillMount(){
        let review = this.props.location.state.review.review;
        this.setState({review: review});
    }

    showTracks = (tracks) => {
        if(tracks!=undefined){
            console.log('tracks inside showTracks',tracks)
            let results = [];
            let inherit = 'inherit';
            tracks.map((track, index) => { 
                results.push(
                    <div className="col-md-3 mt-5">
                        <Card 
                            name={track.name}
                            id={track.id}
                            key={index}                                                                                                            
                        />
                        <ReactPlayer 
                            url={track.preview_url} 
                            playing={false}
                            width={inherit}
                            height={80}
                            style={{backgroundColor: '#27ae60'}}                            
                            controls={true}
                            config={{
                                file:{
                                    forceAudio: true
                                }
                            }}                            
                        />                        
                    </div>
               )                          
            })
            return results
        }else{
            return <p></p>
        }
    }

    //TODO:SHOW REVIEW FOR EACH ALBUM
    showReview(){
        API.getReviews().then(res =>
        this.setState({review: res.data})).catch(err => console.log(err));
    }

    
    render() {
        console.log("this.props in Tracks", this.props);
        const { data: { tracks }, current_user: { user: { images, display_name } } } = this.props.location.state;
        const albumNameCleanedUp = this.props.match.params.albumName.replace(/[-]/g," ").trim();
        return (
            <div>
                <Nav 
                    imageURL={images[0].url}  
                    display_name={display_name} 
                    {...this.props}
                />
                <div className="justify-content-center mt-5 row">
                    <p className="text-center display-5">
                        Displaying tracks from the album { albumNameCleanedUp }
                    </p>
                </div>
                <div className="row">
                    {this.showTracks(tracks)}
                </div>
                <ReviewCard 
                userName={this.state.review.userName}
                userImage={this.state.review.userImageURL}
                text={this.state.review.reviewText} />
            </div>
        )
    }
}
