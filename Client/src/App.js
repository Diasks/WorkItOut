import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import FrontPage from "./components/pages/FrontPage";
import DashboardPage from "./components/pages/AdminDashboardPage";
import OverviewPage from "./components/pages/UserOverviewPage";
import UserListPage from "./components/pages/UserListPage";
import UserProfilePage from "./components/pages/UserProfilePage";
import ProgramTemplatesPage from "./components/pages/ProgramTemplatesPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import FaqPage from "./components/pages/FaqPage";
import RegisterPage from "./components/pages/RegisterPage";
import SettingsPage from "./components/pages/SettingsPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={FrontPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/dashboard" exact component={DashboardPage} />
        <Route path="/overview" exact component={OverviewPage} />
        <Route path="/users" exact component={UserListPage} />
        <Route path="/user/profile" exact component={UserProfilePage} />
        <Route path="/programs" exact component={ProgramTemplatesPage} />
        <Route path="/faq" exact component={FaqPage} />
        <Route path="/settings" exact component={SettingsPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
