import React, {Component} from "react";
import {connect} from "react-redux";
import { fetchArtist } from "../store/actions/profiles";
import ArtistInfo from "../components/ArtistInfo";

class ProfileDisplay extends Component {
  
  componentDidMount() {
    const {id} = this.props.match.params;
    const {artist_id} = this.props.match.params;
    
    this.props.fetchArtist(id, artist_id);
  }
  
  render() {
    const {artists, currentUser} = this.props;
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
    return (
      <div className="profileDisplay">
        <h1>My Profile</h1>
        <div className="">
          {artistDisp}
        </div>
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

export default connect(mapStateToProps, {fetchArtist})(ProfileDisplay);