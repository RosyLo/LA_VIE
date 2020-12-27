import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from './Header';
import PostList from './PostList';
import Profile from './Profile';
import Welcome from './Welcome';
import NoMatch from './NoMatch';
import { BrowserRouter as Router, Switch, Route, useLocation, Redirect } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Routers() {
  const user = useSelector((state) => state.user);
  const query = useQuery();

  return (
    <>
      <Header />
      <Switch>
        <Route exact path='/'>
          {user ? <Redirect to='/main' /> : <Welcome />}
        </Route>
        <Route
          path='/profile'
          render={(props) => <Profile {...props} userId={query.get('id')} />}
        />
        <Route path='/main' component={PostList} />
        <Route component={NoMatch} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routers />
    </Router>
  );
}

export default App;
