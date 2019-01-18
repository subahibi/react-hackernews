import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { sortBy } from "lodash";
import Sort from "./Sort";
import Button from "./Button";

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, "title"),
  AUTHOR: list => sortBy(list, "author"),
  COMMENTS: list => sortBy(list, "num_comments").reverse(),
  POINTS: list => sortBy(list, "points").reverse()
};

const largeColumn = { width: "40%" };
const midColumn = { width: "30%" };
const smallColumn = { width: "10%" };

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortKey: "NONE",
      isSortReverse: false
    };
  }

  onSort = sortKey => {
    const isSortReverse =
      this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({ sortKey, isSortReverse });
  };

  render() {
    const { list, onDismiss } = this.props;
    const { sortKey, isSortReverse } = this.state;
    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;

    return (
      <div className="table">
        <div className="table-header">
          <span style={largeColumn}>
            <Sort
              sortKey={"TITLE"}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              Title
              <span>
                <FontAwesomeIcon icon={faArrowDown} />
              </span>
            </Sort>
          </span>
          <span className={midColumn}>
            <Sort
              sortKey={"AUTHOR"}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              Author{" "}
              <span>
                <FontAwesomeIcon icon={faArrowDown} />
              </span>
            </Sort>
          </span>
          <span className={smallColumn}>
            <Sort
              sortKey={"COMMENTS"}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              Comments{" "}
              <span>
                <FontAwesomeIcon icon={faArrowDown} />
              </span>
            </Sort>
          </span>
          <span className={smallColumn}>
            <Sort
              sortKey={"POINTS"}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              Points{" "}
              <span>
                <FontAwesomeIcon icon={faArrowDown} />
              </span>
            </Sort>
          </span>
          <span className={smallColumn}>Archive</span>
        </div>
        {reverseSortedList.map(element => (
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
  }
}

export default Table;
