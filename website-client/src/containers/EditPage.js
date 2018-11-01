import React from "react";
import {connect} from "react-redux";
import ProfileEdit from "../components/ProfileEdit";

class EditPage extends React.Component {
   constructor(props) {
      super(props);
    }
  submit = values => {
    // print the form values to the console
    console.log(values);
  }
  render() {
    return <ProfileEdit currentUser onSubmit={this.submit} />;
  }
}

export default EditPage;

// function mapStateToProps(state){
//   return {
//     currentUser: state.currentUser.user.data
//   };
// }

// export default connect(mapStateToProps)(EditPage);