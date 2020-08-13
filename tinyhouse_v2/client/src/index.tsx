import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import * as serviceWorker from "./serviceWorker";
import { Home, Host, Listing, Listings, NotFound, User } from "./sections";
import "./styles/index.css";

const client = new ApolloClient({
  uri: "/api",
});
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/host" component={Host} />
        <Route path="/listing" component={Listing} />
        <Route path="/listings/:id" component={Listings} />
        <Route path="/listings/:location" component={Listings} />
        <Route path="/user/:id" component={User} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
