import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import { v1 as uuidv1 } from "uuid";

import "./index.scss";

class App extends React.Component {
  state = {
    notes: [],
  };

  handleAddNote = (text) => {
    this.setState((prevState) => ({
      notes: prevState.notes.concat({ id: uuidv1(), text }),
    }));
  };

  handleMove = (direction, index) => {
    this.setState((prevState) => {
      const newNotes = prevState.notes.slice();
      const removedNote = newNotes.splice(index, 1)[0];

      if (direction === "up") {
        newNotes.splice(index - 1, 0, removedNote);
      } else {
        newNotes.splice(index + 1, 0, removedNote);
      }

      return {
        notes: newNotes,
      };
    });
  };

  handleDelete = (id) => {
    this.setState((prevState) => {
      const newNotes = prevState.notes.slice();
      const index = newNotes.findIndex((note) => note.id === id);
      newNotes.splice(index, 1);

      return {
        notes: newNotes,
      };
    });
  };

  render() {
    return (
      <div className="container">
        <NewNote onAddNote={this.handleAddNote} />
        <NoteList
          notes={this.state.notes}
          onMove={this.handleMove}
          onDelete={this.handleDelete}
        />
      </div>
    );
  }
}

class NewNote extends React.Component {
  state = {
    text: "",
  };

  render() {
    const { onAddNote } = this.props;
    const { text } = this.state;

    return (
      <div className="new-note">
        <input
          type="text"
          className="new-note__input"
          placeholder="Digite sua nota aqui..."
          value={text}
          onChange={(event) => {
            this.setState({
              text: event.target.value,
            });
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              onAddNote(event.target.value);
              this.setState({
                text: "",
              });
            }
          }}
        />
      </div>
    );
  }
}

const NoteList = ({ notes, onMove, onDelete }) => (
  <div className="note-list">
    {notes.map((note, index) => (
      <div key={note.id} className="note">
        <span className="note__text">{note.text}</span>
        <button
          className="note__button"
          onClick={() => {
            onDelete(note.id);
          }}
        >
          <i className="material-icons">delete</i>
        </button>
        <button
          className={classNames("note__button", {
            "note__button--hidden": index === 0,
          })}
          onClick={() => {
            onMove("up", index);
          }}
        >
          <i className="material-icons">arrow_upward</i>
        </button>
        <button
          className={classNames("note__button", {
            "note__button--hidden": index === notes.length - 1,
          })}
          onClick={() => {
            onMove("down", index);
          }}
        >
          <i className="material-icons">arrow_downward</i>
        </button>
      </div>
    ))}
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
