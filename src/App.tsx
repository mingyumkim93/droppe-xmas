import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppBar from "components/AppBar";
import WishListsApproval from "pages/WishListsApproval";
import Summary from "pages/Summary";
import WishListsProvider from "contexts/WishListsContext";
import StageContextProvider from "contexts/StageContext";

function App() {
  return (
    <div className="app">
      <WishListsProvider>
        <StageContextProvider>
          <Router>
            <AppBar />
            <Switch>
              <Route path="/summary">
                <Summary />
              </Route>
              <Route exact path="/">
                <WishListsApproval />
              </Route>
            </Switch>
          </Router>
        </StageContextProvider>
      </WishListsProvider>
    </div>
  );
}

export default App;
