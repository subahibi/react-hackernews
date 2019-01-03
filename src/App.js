import React, { Component } from "react";
import "./App.css";

const list = [
  {
    title: "React",
    url: "https://reactjs.org/",
    author: "Author",
    numComments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov",
    numComments: 2,
    points: 5,
    objectID: 1
  }
];

const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

const Button = ({ onClick, className = "", children }) => (
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>
);

const Search = ({ value, onChange, children }) => (
  <form>
    {children} <input type="text" value={value} onChange={onChange} />
  </form>
);

const largeColumn = { width: "40%" };
const midColumn = { width: "30%" };
const smallColumn = { width: "10%" };

const Table = ({ list, pattern, onDismiss }) => (
  <div className="table">
    {list.filter(isSearched(pattern)).map(element => (
      <div key={element.objectID} className="table-row">
        <span style={largeColumn}>
          <a href={element.url}>{element.title}</a>
        </span>
        <span style={midColumn}>{element.author}</span>
        <span style={smallColumn}>{element.numComments}</span>
        <span style={smallColumn}>{element.points}</span>
        <span style={smallColumn}>
          <Button
            onClick={() => onDismiss(element.objectID)}
            type="button"
            className="button-inline"
          >
            Dismiss
          </Button>
        </span>
      </div>
    ))}
  </div>
);

class App extends Component {
  state = {
    list,
    searchTerm: ""
  };

  onSearchChange = event => {
    this.setState({ searchTerm: event.target.value });
  };

  onDismiss = id => {
    const isNotId = element => element.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  };

  render() {
    const { searchTerm, list } = this.state;
    return (
      <div className="App page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange}>
            Seach
          </Search>
        </div>
        <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
      </div>
    );
  }
}

export default App;
