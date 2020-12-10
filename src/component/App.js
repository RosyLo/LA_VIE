import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from './Header';
import PostList from './PostList';
import Profile from './Profile';
import Welcome from './Welcome';
import { fetchPosts, receiveTags } from '../redux/actions';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(receiveTags());
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/welcome' component={Welcome} />
        <Route path='/profile' component={Profile} />
        <Route path='/main' component={PostList} />
      </Switch>
    </Router>
  );
}

export default App;
