import React, { useEffect } from "react";
import { Router, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./_actions/authAction";
import setAuthToken from "./_utils/setAuthToken";

import history from "./_utils/history";
import PrivateRoute from "./components/routing/PrivateRoute";

import "./App.scss";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Admin/Dashboard";
import Overview from "./components/pages/User/Overview";
import Challenges from "./components/pages/User/Challenges";
import ChallengeItem from "./components/pages/User/ChallengeItem";
import ExercisesItem from "./components/pages/User/ExercisesItem";
import CreateUser from "./components/pages/Admin/CreateUser";
import Users from "./components/pages/Admin/Users";
import UserProfile from "./components/pages/UserProfile";
import ProgramTemplates from "./components/pages/Admin/ProgramTemplates";
import CreateProgramTemplate from "./components/pages/Admin/CreateProgramTemplate";
import NotFound from "./components/pages/NotFound";
import Faq from "./components/pages/Faq";
import Register from "./components/pages/Register";
import Settings from "./components/pages/Settings";
import UserItem from "./components/pages/Admin/UserItem";
import UserHistory from "./components/layout/profile/UserHistory";
import ProgramItem from "./components/pages/Admin/ProgramItem";
import ProgramDayDisplay from "./components/pages/Admin/ProgramDayDisplay";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router history={history}>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/dashboard" exact component={Dashboard} />
          <PrivateRoute path="/overview" exact component={Overview} />
          <PrivateRoute path="/create-user" exact component={CreateUser} />
          <PrivateRoute path="/users" exact component={Users} />
          <PrivateRoute path="/users/:id" exact component={UserItem} />
          <PrivateRoute path="/profile" exact component={UserProfile} />
          <PrivateRoute path="/profile/history" exact component={UserHistory} />
          <PrivateRoute path="/challenges" exact component={Challenges} />
          <PrivateRoute
            path="/challenges/:id"
            exact
            component={ChallengeItem}
          />
          <PrivateRoute path="/workout/:id" exact component={ExercisesItem} />
          <PrivateRoute path="/programs" exact component={ProgramTemplates} />
          <PrivateRoute
            path="/programs/program/:id"
            exact
            component={ProgramItem}
          />
          <PrivateRoute
            path="/programs/:id"
            exact
            component={ProgramDayDisplay}
          />
          <PrivateRoute
            path="/create-program"
            exact
            component={CreateProgramTemplate}
          />
          <Route path="/faq" exact component={Faq} />
          <PrivateRoute path="/settings" exact component={Settings} />
          <Route path="*" component={NotFound} />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
