import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import request from 'superagent';
import Nav from '../Nav';
import { Card2 } from '../common';
import { spotifyAlbumURL } from '../../constants';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

export default class ArtistAlbums extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_user: [],
            tracks: [],
            modalIsOpen: false,
            album: "",
            artist: "",
            review: {
                userName: "",
                userImageURL: "",
                artist: "",
                album: "",
                albumImageURL:"",
                reviewText: "",
                score: ""
        }
        };
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount = () => {
        const { current_user } = this.props.location.state;
        if(current_user){
            this.setState({ current_user })
            console.log(this.state);
        }else{
            this.props.history.push('/')
        }
    }

    showAlbums = (albums) => {
        if(albums!=undefined){           
            let results = [];
           // console.log(albums);
            albums.map((album, index) => {
                if(album.images[0]!=undefined){
                    let hasImage = album.images[0];
                    results.push(
                        <div className="col-md-3">
                            <Card2 
                                name={album.name}
                                id={album.id}
                                key={index}
                                imageURL={hasImage.url}
                                onClick={event => this.getAlbumTracks(event, album.id, album.name)}
                                text="Show Tracks"
                                onClick2={event => this.reviewAlbum(
                                    event, 
                                    this.state.current_user.user.id, 
                                    this.state.current_user.user.images[0].url, 
                                    albums[0].artists[0].name ,  
                                    album.name , 
                                    hasImage.url)}   
                                text2="Review"                                                  
                            />
                        </div>
                    )
                }             
            })
            return results
        }else{
            return <p></p>
        }
    }

    inputChange = (e) => {
        this.setState({review:{
            userName: this.state.review.userName,
            userImageURL: this.state.review.userImageURL,
            artist:this.state.review.artist,
            album:this.state.review.album,
            albumImageURL:this.state.review.albumImageURL,
            reviewText: e.target.value
        }});
      }
   
      //TODO: When user clicks submit buttton enter all info into mongodb to display on the tracks page
      onSubmit(){
       // console.log(this);
        this.closeModal();
      // console.log(ArtistAlbums.state.review);
       let review = this.state.review;
       request
       .post('/api/reviews')
       .send(review)
       .set('Accept', 'application/json')
       .end((err, res) => {
         if (err || !res.ok) {
           console.log('Oh no! err');
         } else {
           console.log('Success');
         }
       });
    }
    //this sets state.data to current album being reviewed then opens modal
    reviewAlbum = (event , username , image , artist , album , albumImage) => {
        event.preventDefault();
        this.setState({album: album, artist:artist});
        this.openModal();
        this.setState({review:{
            userName: username , userImageURL: image , artist: artist , album: album , albumImageURL:albumImage
         }})
    }
    //renders next component by passing props of the album to next component
    getAlbumTracks = (event, albumId, name) => {
        event.preventDefault();
        const { authToken } = this.props.location.state.auth;        
        let tracks;
        let cleanName = name.replace(/[ ]/g,"-").replace(/[()]/g,"").trim();
        axios.get(`${spotifyAlbumURL}${albumId}/tracks?access_token=${authToken}`)
        .then(response => {            
            this.setState({ tracks: response.data.items });
            tracks = response.data.items;            
        })
        .then(()=> this.props.history.push(
            `/album-tracks/${albumId}/${cleanName}`, 
            { 
                data: { tracks },
                current_user: { user: this.state.current_user.user },
                auth: { authToken },
                review: {review: this.state.review}
            }
        ))
        .catch(error => console.log(error));
    }
    //modal functions
    openModal() {
        this.setState({modalIsOpen: true});
      }
    
      afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
      }
    
      closeModal() {
        this.setState({modalIsOpen: false});
      }
    

    render() {
        const { 
            data: { 
                albums 
            }, 
            current_user: { 
                user: { 
                    images, 
                    display_name 
                } 
            } 
        } = this.props.location.state;

        return (
            <div>
                <Nav 
                    imageURL={images[0].url} 
                    {...this.props} 
                />
                <div className="justify-content-center mt-5 row">
                    <p className="text-center display-5">
                        Album Results for { albums[0].artists[0].name}
                    </p>
                </div>
                <div className="row">
                    {this.showAlbums(albums)}
                </div>
                    <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="reviewModal"
                    >
                    <h1 className="display-4"  ref={subtitle => this.subtitle = subtitle}>{this.state.album} | {this.state.artist}</h1>
                    <div className="center-block">
                    <form>
                    <textarea id="reviewText" rows="10" cols="75" name="reviewText" onChange={this.inputChange}>
                        Write your review here
                    </textarea>
                    </form>
                    </div>
                    <button onClick={this.closeModal} className="btn btn-danger">close</button>
                    <button className="btn btn-success" onClick={this.onSubmit.bind(this)}>Submit</button>
                    </Modal>
                
            </div>
        )
    }
}
