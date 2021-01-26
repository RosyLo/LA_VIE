import { useSelector } from 'react-redux';
import Header from './header/Header';
import PostList from './post/PostList';
import Profile from './profile/Profile';
import Welcome from './welcome/Welcome';
import NoMatch from './common/NoMatch';
import { BrowserRouter as Router, Switch, Route, useLocation, Redirect } from 'react-router-dom';
import ChatRoom from './chat/ChatRoom';

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
          render={(props) =>
            user ? <Profile {...props} userId={query.get('id')} /> : <Redirect to='/main' />
          }
        />
        {/* <Route
          path='/chatroom/:'
          render={(props) => <ChatRoom {...props} userId={query.get('id')} />}
        /> */}
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
