import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./components/App/App";
import Search from "./components/Search";
import Table from "./components/Table/Table";
import Button from "./components/Button/Button";

Enzyme.configure({ adapter: new Adapter() });

describe("App", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("has a valid snapshot", () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Search", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Search>Search</Search>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("has a valid snapshot", () => {
    const component = renderer.create(<Search>Search</Search>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Button", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Button>Give me more</Button>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("has a valid snapshot", () => {
    const component = renderer.create(<Button>Give me more</Button>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Table", () => {
  const props = {
    list: [
      { title: "1", author: "1", numComments: 1, points: 2, objectID: "y" },
      { title: "2", author: "2", numComments: 1, points: 2, objectID: "z" }
    ],
    sortKey: "TITLE",
    isSortReverse: false
  };

  it("shows two items in list", () => {
    const element = shallow(<Table {...props} />);

    expect(element.find(".table-row").length).toBe(2);
  });

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Button>Give me more</Button>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("has a valid snapshot", () => {
    const component = renderer.create(<Button>Give me more</Button>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
