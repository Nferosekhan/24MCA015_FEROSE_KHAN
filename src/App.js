import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ListMovies from "./ListMovies";
import MovieDetails from "./MovieDetails";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ListMovies} />
        <Route path="/movies/:id" component={MovieDetails} />
      </Switch>
    </Router>
  );
}
export default App;