import React, {Component} from "react";
import {connect} from "react-redux";
import { fetchArtist, refreshArtists } from "../store/actions/profiles";
import ArtistInfo from "../components/ArtistInfo";
import ArtistPostList from "./ArtistPostList";

class ProfileDisplay extends Component {
  componentWillMount(){
    this.props.refreshArtists();
  }
  
  componentDidMount() {
    const {id} = this.props.match.params;
    const {artist_id} = this.props.match.params;
    
    this.props.fetchArtist(id, artist_id);
  }
  
  render() {
    const {artists, currentUser, isProfileUser} = this.props;
    let artistDisp = artists.map(a => (
      <ArtistInfo 
        key={a._id}
        id={a._id}
        username={a.username}
        profileImageUrl={a.profileImageUrl}
        bio={a.bio}
        currentUser={currentUser}
      />
    ));
    let artistPList = artists.map(a => (
      <ArtistPostList
        key={a._id}
        id={a._id}
        currentUser={currentUser}
      />
    ));
    return (
      <div className="profileDisplay">
        {isProfileUser && (<h1>My Profile</h1>)}
        {!isProfileUser && (<h1>Artist Profile</h1>)}
        <div className="">
          {artistDisp}
        </div>
          {artistPList}
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    artists: state.artists,
    currentUser: state.currentUser.user.id
  };
}

export default connect(mapStateToProps, {fetchArtist, refreshArtists})(ProfileDisplay);