import React, { Component } from "react";
import debounce from "lodash.debounce";
import axios from "axios";
import '../assets/search.css';
import propTypes from "prop-types";

class Search extends Component {
  static propsType = {
    searchSuggestions: propTypes.array,
  };

  static defaultProps = {
    suggestion: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      filterSuggestion: [],
      suggestion: [],
      userInput: "",
      showSuggestions: false,
    };
  }

  onChange = (e) => {
    this.debounceInput(e.target.value);
  };
  debounceInput = debounce((text) => {
    this.handlerChangeDebounce(text);

    this.setState({
      userInput: text,
      showSuggestions: true,
    });
  }, 20);

  handlerChangeDebounce = (text) => {
    fetch("http://localhost:9002/allsearch/" + text)
      .then((res) => res.json())
      .then((suggestion) => {
        if (text) {
          const userInput = text;
          this.setState({
            filterSuggestion: suggestion,
          });
        }
      });
  };

  render() {
    const {
      onChange,
      onKeyDown,
      state: { filterSuggestion, suggestion, userInput, showSuggestions },
    } = this;

    let listComponent;
    if (showSuggestions && userInput) {
      if (filterSuggestion.length) {
        listComponent = (
          <ul className="suggestion">
            {filterSuggestion.map((ele, index) => {
              return (
                <li index={index} key={ele.id}>
                  <a href="static.html">
                    <div className="search-li">
                      <div style={{ "color": "red" }} className="li1">{ele.title}</div>
                      <div style={{ "color": "blue" }} className="li2">{ele.description}</div>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        );
      } else {
        listComponent = <h1 className="search-li text">No title found!</h1>;
      }
    }

    return (
      <>
        <input
          placeholder="Enter title name here"
          type="text"
          autoFocus={true}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
          className="input-box"
        />

        <hr />

        {listComponent}
      </>
    );
  }
}
export default Search;
