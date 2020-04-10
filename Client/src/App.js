import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Admin/Dashboard";
import Overview from "./components/pages/User/Overview";
import UserList from "./components/pages/Admin/UserList";
import UserProfile from "./components/pages/UserProfile";
import ProgramTemplates from "./components/pages/Admin/ProgramTemplates";
import NotFound from "./components/pages/NotFound";
import Faq from "./components/pages/Faq";
import Register from "./components/pages/Register";
import Settings from "./components/pages/Settings";
import Alert from "./components/layout/Alert";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./_actions/authAction";
import setAuthToken from "./_utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/overview" exact component={Overview} />
          <Route path="/users" exact component={UserList} />
          <Route path="/user/profile" exact component={UserProfile} />
          <Route path="/programs" exact component={ProgramTemplates} />
          <Route path="/faq" exact component={Faq} />
          <Route path="/settings" exact component={Settings} />
          <Route path="*" component={NotFound} />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
