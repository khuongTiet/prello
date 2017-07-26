import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from 'react-router-dom'
import './board.css'

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


class Register extends Component {
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

class Login extends Component {
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

function BoardMenu(props) {
  var mainMenuStyle = {
    display: 'none'
  }
  return (
    <div id="main-menu-container">
      <div id="main-menu-button">Boards</div>
      <div id="main-menu" style={mainMenuStyle}></div>
    </div>
  );
}

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Hello");
    <Redirect push to="/login" />
  }

  render() {
    return (
      <div id="log-out">
        <form method="GET" onSubmit={this.handleSubmit}>
          <input type="submit" id="log-out-button" value="Log Out" />
        </form>
      </div>
    );
  }
}

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "test"
    }
  }

  render() {
    return (
      <div id="topnav">
        <BoardMenu />
        <input type="search" className="topnav-search" name="searchbar" placeholder="Search..." />
        <div id="home"><a href="/" id="logolink">Prello</a></div>
        <Logout user="Test" />
      </div>
    );
  }
}

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: true
    }
  }

  render() {
    return (
      <div className="welcomenav">
        <a href="#">{this.props.name}</a>
        <div id="sidebar-container">
          <div id="sidebar-button">
            Show menu
          </div>
        </div>
      </div>
    );
  }
}

function Card(props) {
  return (
    <li className="listed-card">
      {props.name}
    </li>
  );
}

class CardAdder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adderStyle: {display : 'none'}
    }
  }

  displayAdder = (e) => {
    this.setState({adderStyle: {display : 'block'}});
  }

  closeAdder = (e) => {
    this.setState({adderStyle: {display : 'none'}});
  }

  addCard = (e) => {
    console.log('Adding card');
  }

  render() {
    return (
      <div className="card-adder-container">
        <div className="card-adder-button" onClick={this.displayAdder}>Add a card...</div>
        <div className="card-adder" style={this.state.adderStyle}>
          <textarea rows="3" cols="50" className="add-card-name" name="name"></textarea>
          <input type="button" value="Add" className="add-button" onClick={this.addCard} />
          <input type="button" className="cancel-button" onClick={this.closeAdder} value="&#10005;" />
          <input type="button" className="option-button" value="&hellip;" />
        </div>
      </div>
    );
  }
}

class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: true
    }
  }

  renderCard(name, key) {
    return (
      <Card name={name} key={key} />
    );
  }

  render() {
    return (
      <ul className="cards">
        {this.props.cards.map((card) =>
          this.renderCard(card, card.toString())
        )}
        <CardAdder />
      </ul>
    );
  }
}

function List(props) {
  return (
    <li>
      <div className="indv-list">
        {props.name}
      </div>
      <CardList cards={props.cards} />
    </li>
  );
}

class ListAdder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addStyle : {display: 'none'},
      value: ''
    }
  }

  displayAdder = (e) => {
    this.setState({addStyle: {display: 'block'}});
  }

  closeAdder = (e) => {
    this.setState({addStyle: {display: 'none'}});
  }

  handleChange = (e) => {
    this.setState({value: e.target.value})
  }

  addList = (e) => {
    console.log("Hello There!");
  }

  render() {
    return (
      <li id="list-adder-container">
        <div id="list-adder-button" onClick={this.displayAdder}>
          Add a list...
        </div>
        <div id="list-adder" style={this.state.addStyle}>
          <input type="text"
                 placeholder="Add a list..."
                 className="namer-text"
                 id="new-list-name"
                 name="title"
                 onChange={this.handleChange}
          />
          <input type="button" value="Save" className="add-button" onClick={this.addList} />
          <input type="button" className="cancel-button" onClick={this.closeAdder} value="&#10005;" />
        </div>
      </li>
    );
  }
}


class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: Array(4).fill(null)
    }
  }

  renderList(name, cards) {
    return (
      <List name={name} cards={cards}/>
    );
  }

  render() {
    return (
      <ul className="lists">
        {this.renderList("List 1", ["test", "Hello"])}
        {this.renderList("List 2", ["yo"])}
        {this.renderList("List 3", ["hi", "bye"])}
        <ListAdder />
      </ul>
    );
  }
}

function BoardContainer(props) {
  return (
    <div id="boardContainer" className="main-color">
      <Lists />
    </div>
  );
}

function App(props) {
  return (
    <div id="app">
      <Navigation />
      <MenuBar name="Test"/>
      <BoardContainer />
      <Route path="/login" component={Landing} />
    </div>
  );
}

ReactDOM.render((
  <Router>
    <App />
  </Router>
  ), document.getElementById("root")
);
