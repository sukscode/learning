import React, { Component } from "react";
import styled from "styled-components";
import "./App.css";

import Person from "./Person/Person";

const StyledButton = styled.button`
  background-color: ${(props) => (props.change ? "red" : "green")};
  color: white;
  font: inherit;
  border: 3px solid blue;
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.change ? "salmon" : "lightgreen")};
    color: black;
  }
`;

class App extends Component {
  state = {
    persons: [
      { id: "1", name: "Sukriti", age: 23 },
      { id: "2", name: "Kriti", age: 8 },
      { id: "3", name: "Abhikriti", age: 26 },
    ],
    otherState: "some other value",
    showPersons: false,
  };

  // switchNameHandler = (newName) => {
  //   // console.log('Was clicked!');

  //   this.setState({
  //     persons: [
  //       { name: newName, age: 28 },
  //       { name: "Patel", age: 29 },
  //       { name: "Verma", age: 27 },
  //     ],
  //   });
  // };

  deletePersonsHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex((p) => {
      return p.id === id;
    });
    const person = { ...this.state.persons[personIndex] };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  };

  tooglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  render() {
    const style = {
      backgroundColor: "green",
      font: "inherit",
      border: "3px solid blue",
      padding: "8px",
    };

    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <Person
                click={() => this.deletePersonsHandler(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={(event) => this.nameChangeHandler(event, persons)}
              />
            );
          })}
        </div>
      );
      // style.backgroundColor = "red";
      // style.border = "3px solid crimson";
    }
    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push("red"); //class=red
    }
    if (this.state.persons.length <= 1) {
      classes.push("bold"); //class =red + bold
    }
    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(" ")}>This is really working!</p>
        <StyledButton
          change={this.state.showPersons}
          onClick={this.tooglePersonsHandler}
        >
          Toogle Person
        </StyledButton>
        {persons}
      </div>
    );
  }
}

export default App;
