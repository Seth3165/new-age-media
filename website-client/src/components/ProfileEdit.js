import React, {Component} from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { retrieveUser as retrieve} from "../store/actions/profiles";

let renderField = ({ type, label, input, meta: { touched, error }}) => (
  <div>
    <label>{label}</label>
    <input {...input} type={type}/>
    {touched && error &&
    <span className="editerror">{error}</span>}
  </div>
);

class ProfileEdit extends Component {
  constructor(){
    super();
  }
  
  // componentDidMount(){
  // const {id} = this.props.match.params;
  // retrieveUser(id).then((res) => {
  //   if (res.foundUser) this.initializeForm(res.foundUser);
  // });
  // }
  
  submit = (values) => {
    console.log(values);
  }
  
  // initializeForm(foundUser) {

  //   const initData = {
  //     id: foundUser._id,
  //     email: foundUser.email,
  //     username: foundUser.username,
  //     password: foundUser.password,
  //     imageurl: foundUser.imageurl
  //   };

  //   this.props.initialize(initData);
  // }
  
  render() {
    const { handleSubmit, retrieveUser, pristine, reset, submitting } = this.props;
    
    return (
      <form onSubmit={this.props.handleSubmit(this.submit)}>
          <Field name="email" label="Email" component={renderField} type="email" />
          <Field name="username" label="Username" component={renderField} type="text" />
          <Field name="password" label="Password" component={renderField} type="text" />
          <Field name="profileImageUrl" label="Image Url" component={renderField} type="text" />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

ProfileEdit = reduxForm({
  form: 'ProfileEdit'
})(ProfileEdit);

ProfileEdit = connect(
  state => ({
    initialValues: state.artists[0]
  }), {retrieveUser: retrieve}
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