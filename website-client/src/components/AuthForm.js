import React, {Component} from "react";

export default class AuthForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      profileImageUrl: ""
    };
  }
  
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  
  handleSubmit = e => {
    e.preventDefault();
    const authType = this.props.signUp ? "signup" : "signin";
    this.props.onAuth(authType, this.state).then(() => {
      this.props.history.push("/");
    })
    .catch(() => {
      return;
    });
  }
  
  render(){
    const {email, username, password, profileImageUrl} = this.state;
    const {
      heading, 
      buttonText, 
      signUp, 
      errors, 
      history, 
      removeError
    } = this.props;
    
    history.listen(()=> {
      removeError();
    });
    
    return(
        <div>
          <form className="authForm" onSubmit={this.handleSubmit}>
            <h2>{heading}</h2>
            {errors.message && (
              <div>{errors.message}</div>
            )}
            <label htmlFor="email">Email:</label>
            <input 
              id="email" 
              name="email" 
              onChange={this.handleChange}
              value={email}
              type="text"
            />
            <label htmlFor="password">Password:</label>
            <input
              id="password" 
              name="password" 
              onChange={this.handleChange}
              type="password"
            />
            {signUp && (
              <div>
                <label htmlFor="username">Username:</label>
                <input 
                  id="username" 
                  name="username" 
                  onChange={this.handleChange}
                  value={username}
                  type="text"
                />
                <label htmlFor="image-url">Profile Image:</label>
                <input 
                  id="image-url" 
                  name="profileImageUrl" 
                  onChange={this.handleChange}
                  type="text"
                  value={profileImageUrl}
                />
              </div>
            )}
            <button className="authBtn" type="submit">
              {buttonText}
            </button>
          </form>
        </div>
    );
  }
}