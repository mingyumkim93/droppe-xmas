import React, { createContext, useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppBar from "./components/AppBar";
import WishListsApproval from "./pages/WishListsApproval";
import Summary from "./pages/Summary";
import WishList from "./types/WishList";
import { wishListsReducer, WishListsAction } from "./reducers/wishListReducer";
import { StageAction, stageReducer, Stages } from "./reducers/stageReducer";
import "./App.scss";

export const WishListsContext = createContext<{
  wishLists: WishList[];
  wishListsDispatch: React.Dispatch<WishListsAction>;
}>({
  wishLists: [],
  wishListsDispatch: () => null
});

export const stageContext = createContext<{ stage: number; stageDispatch: React.Dispatch<StageAction> }>({
  stage: Stages.APPROVAL,
  stageDispatch: () => null
});

function App() {
  //necessary assumption: fetch all carts will return carts from the user's 5 children.
  const [wishLists, wishListsDispatch] = useReducer(wishListsReducer, []);
  const [stage, stageDispatch] = useReducer(stageReducer, 1);

  return (
    <div className="app">
      <WishListsContext.Provider value={{ wishLists, wishListsDispatch }}>
        <stageContext.Provider value={{ stage, stageDispatch }}>
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
        </stageContext.Provider>
      </WishListsContext.Provider>
    </div>
  );
}

export default App;
