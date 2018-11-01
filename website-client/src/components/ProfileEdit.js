import React, {Component} from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { show } from "../store/actions/profiles";

let ProfileEdit = props => {
  const { handleSubmit } = props;
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <Field name="email" component="input" type="email" />
      </div>
      <div>
        <label htmlFor="username">User Name</label>
        <Field name="username" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Field name="password" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="image-url">Profile Image</label>
        <Field name="image-url" component="input" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

ProfileEdit = reduxForm({
  form: 'edit'
})(ProfileEdit);

ProfileEdit = connect(
  state => ({
    initialValues: state.artist
  }), {show}
)(ProfileEdit);

export default ProfileEdit;

// export default class ProfileEdit extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       email: "",
//       username: "",
//       password: "",
//       profileImageUrl: ""
//     };
//   }
  
//   handleChange = e => {
//     this.setState({
//       [e.target.name]: e.target.value
//     });
//   };
  
//   handleSubmit = e => {
//     e.preventDefault();
//     const authType = this.props.signUp ? "signup" : "signin";
//     this.props.onAuth(authType, this.state).then(() => {
//       this.props.history.push("/");
//     })
//     .catch(() => {
//       return;
//     });
//   }
  
//   render(){
//     const {email, username, password, profileImageUrl} = this.state;
//     const {
//       currentUser
//     } = this.props;
    
//     return(
//         <div>
//           <form className="authForm" onSubmit={this.handleSubmit}>
//             <label htmlFor="email">Email:</label>
//             <input 
//               id="email" 
//               name="email" 
//               onChange={this.handleChange}
//               value={email}
//               type="text"
//             />
//             <label htmlFor="password">Password:</label>
//             <input
//               id="password" 
//               name="password" 
//               onChange={this.handleChange}
//               value={password}
//               type="password"
//             />
//             <label htmlFor="username">Username:</label>
//             <input 
//               id="username" 
//               name="username" 
//               onChange={this.handleChange}
//               value={username}
//               type="text"
//             />
//             <label htmlFor="image-url">Profile Image:</label>
//             <input 
//               id="image-url" 
//               name="profileImageUrl" 
//               onChange={this.handleChange}
//               type="text"
//               value={profileImageUrl}
//             />
//             <button className="authBtn" type="submit">
//               Save Profile
//             </button>
//           </form>
//         </div>
//     );
//   }
// }