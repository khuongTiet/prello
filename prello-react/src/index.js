import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import './index.css'

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

class Navigation extends React.Component {
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
        <div id="log-out">
          <form method="GET" action="/logout">
            <input type="submit" id="log-out-button" value="Log Out" />
          </form>
        </div>
      </div>
    );
  }
}

function Board(props) {
  return(
    <li>
      <a href={props.boardLink}>
        <div className="board">{props.boardName}</div>
      </a>
    </li>
  );
}

class BoardAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addStyle: {display: 'none'}
    }
  }

  displayAdder = (e) => {
    this.setState({addStyle: {display: 'block'}});
  }

  closeAdder = (e) => {
    this.setState({addStyle: {display: 'none'}});
  }

  render() {
    return (
      <li>
        <div className="board" id="board-adder-container">
          <div id="board-adder-button" onClick={this.displayAdder}>
            Create new board ...
          </div>
          <div id="board-adder" style={this.state.addStyle}>
            <p id="board-adder-title">
              Create a Board
              <input type="button" className="cancel-button" onClick={this.closeAdder} value="&#10005;" />
            </p>
            <hr/>
            <form method="POST" action="/board">
              <label htmlFor="add-board-title">Title</label>
              <input id="add-board-title" type="text" placeholder="Management" name="title" />
              <input id="add-board-btn" className="add-button" type="submit" value="Create" />
            </form>
          </div>
        </div>
      </li>
    );
  }

}

class BoardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: []
    }
  }

  componentDidMount() {
    fetch('/board')
      .then(res => res.json())
      .then(boards => this.setState({ boards }));
  }

  renderBoard(key, name) {
    return (
      <Board boardLink="#" key={key} boardName={name} />
    );
  }

  render() {
    return(
      <ul id="boards">
        {this.state.boards.map(board => this.renderBoard(board._id, board.name))}
        <BoardAdder />
      </ul>
    );
  }
}

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: true
    }
  }
  render() {
    return (
      <div id="container">
        <Navigation />
        <BoardList />
      </div>
    );
  }
}

function App(props) {
  <Router>
    <div>
      <Route exact path="/" component={Container}/>
    </div>
  </Router>
}

ReactDOM.render(
  <Container />,
  document.getElementById("root")
);
