import React from 'react';
import ReactDOM from 'react-dom';
import './login.css'

function Name(props) {
  return (
    <input type="text"
           id={props.id}
           placeholder={props.placeholder}
           name={props.name}
    />
  );
}

function Email(props) {
  return (
    <input type="email"
           id={props.id}
           placeholder={props.placeholder}
           name={props.name}
           required
           autoComplete="off"
    />
  );
}

function Password(props) {
  return (
    <input type="password"
           id={props.id}
           placeholder={props.placeholder}
           name={props.name}
           required
    />
  );
}

function Submit(props) {
  return (
    <input type="submit"
           id={props.id}
           value={props.value}
    />
  );
}


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: true
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    return;
  }
  render() {
    return (
      <div id="registration-container">
        <form id="register-form" method="POST" action="/signup">
          <div id="registration-information">
            <h1> Sign Up for Prello </h1>
            <Name id="register-name" placeholder="John Doe" name="register-name"/>
            <br/>
            <Email id="register-email" placeholder="john.doe@gmail.com" name="register-email"/>
            <br/>
            <Password id="register-password" placeholder="Password" name="register-password"/>
            <br/>
            <Password id="register-password-confirm" placeholder="Confirm Password" name="register_confirm"/>
            <br/>
            <Submit id="submit-btn" value="Sign Up"/>
            <br/>
            <br/>
          </div>
        </form>
      </div>
    );
  }
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: true
    };
  }

  render() {
    return (
      <div id="login-container">
        <form id="login-form" method="POST">
          <div id="login-information">
            <h2> Login </h2>
            <Email id="login-email" placeholder="e.g john.doe@gmail.com" name="email"/>
            <br/>
            <Password id="login-password" placeholder="************" name="password"/>
            <br/>
            <Submit id="login-btn" value="Login"/>
            <br/><br/>
            <input type="checkbox" name="remember" value="rememberme"/>Remember Me
            <br/><br/>
          </div>
        </form>
        <form id="reset-password" method="GET" action="/password">
          <Submit id="reset-button" value="Reset password"/>
        </form>
      </div>
    );
  }
}

function Landing(props) {
  return (
    <div>
      <Register />
      <Login />
    </div>
  );
}

ReactDOM.render(
  <Landing/>,
  document.getElementById('root')
);
