import React, {Component} from "react";
import {connect} from "react-redux";
import { fetchArtists } from "../store/actions/profiles";
import ArtistItem from "../components/ArtistItem";

class ArtistList extends Component {
  
  componentDidMount() {
    const {id} = this.props.match.params;
    
    this.props.fetchArtists(id);
  }
  
  render() {
    const {artists, currentUser} = this.props;
    let artistList = artists.map(a => (
      <ArtistItem 
        key={a._id}
        id={a._id}
        username={a.username}
        profileImageUrl={a.profileImageUrl}
        currentUser={currentUser}
      />
    ));
    return (
      <div className="myArtists">
        <h1>Artists</h1>
        <div className="artistList">
          {artistList}
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

export default connect(mapStateToProps, {fetchArtists})(ArtistList);