import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from './Header';
import PostList from './PostList';
import Profile from './Profile';
import Welcome from './Welcome';
import NoMatch from './NoMatch';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Routers() {
  const query = useQuery();
  console.log('router', query.get('id'));

  return (
    <>
      <Header />
      <Switch>
        <Route exact path='/welcome' component={Welcome} />
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
