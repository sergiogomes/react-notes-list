import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { v1 as uuidv1 } from "uuid";

import AppBar from "./core/components/AppBar";
import NavigationDrawer from "./core/components/NavigationDrawer";
import About from "./about/About";
import Notes from "./notes/Notes";
import NoteService from "./notes/services/NoteService";

class App extends React.Component {
  state = {
    notes: [],
    isLoading: false,
    isMenuOpen: false,
    reloadHasError: false,
    saveHasError: false,
  };

  componentDidCatch() {
    this.setState({ reloadHasError: true });
  }

  componentDidMount() {
    this.handleReload();
  }

  handleAddNote = (text) => {
    this.setState((prevState) => {
      const notes = prevState.notes.concat({ id: uuidv1(), text });

      this.handleSave(notes);

      return { notes };
    });
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

      this.handleSave(newNotes);

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

      this.handleSave(newNotes);

      return {
        notes: newNotes,
      };
    });
  };

  handleEdit = (id, text) => {
    this.setState((prevState) => {
      const newNotes = prevState.notes.slice();
      const index = newNotes.findIndex((note) => note.id === id);
      newNotes[index].text = text;

      this.handleSave(newNotes);

      return {
        notes: newNotes,
      };
    });
  };

  handleReload = () => {
    this.setState({ isLoading: true, reloadHasError: false });
    NoteService.load()
      .then((notes) => {
        this.setState({ notes, isLoading: false });
      })
      .catch(() => {
        this.setState({ isLoading: false, reloadHasError: true });
      });
  };

  handleSave = (notes) => {
    this.setState({ isLoading: true, saveHasError: false });
    NoteService.save(notes)
      .then(() => {
        this.setState({ isLoading: false });
      })
      .catch(() => {
        this.setState({ isLoading: false, saveHasError: true });
      });
  };

  handleOpenMenu = () => {
    this.setState({ isMenuOpen: true });
  };

  handleCloseMenu = () => {
    this.setState({ isMenuOpen: false });
  };

  render() {
    const {
      notes,
      isLoading,
      isMenuOpen,
      reloadHasError,
      saveHasError,
    } = this.state;

    return (
      <Router>
        <div>
          <AppBar
            isLoading={isLoading}
            saveHasError={saveHasError}
            onSaveRetry={() => {
              this.handleSave(notes);
            }}
            onOpenMenu={this.handleOpenMenu}
          />
          <div className="container">
            <React.Fragment>
              <Route
                path="/"
                exact
                render={(props) => (
                  <Notes
                    notes={notes}
                    reloadHasError={reloadHasError}
                    onRetry={this.handleReload}
                    onAddNote={this.handleAddNote}
                    onMove={this.handleMove}
                    onDelete={this.handleDelete}
                    onEdit={this.handleEdit}
                  />
                )}
              />
              <Route path="/about" component={About} />
            </React.Fragment>
          </div>
          <NavigationDrawer
            isOpen={isMenuOpen}
            onCloseMenu={this.handleCloseMenu}
          />
        </div>
      </Router>
    );
  }
}

export default App;
