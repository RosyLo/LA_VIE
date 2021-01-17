import { React } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileShow from './ProfileShow';
import StoryBar from './story/StoryBar';
import ProfileContent from './ProfileContent';

function Profile({ userId }) {
  const user = useSelector((state) => state.user);
  console.log(user);
  let view = '';

  if (!user) {
    view = (
      <>
        <ProfileShow paramsID={userId} />
        <ProfileContent paramsID={userId} />
      </>
    );
  } else if (user.uid === userId) {
    console.log(user);
    //master
    view = (
      <>
        <ProfileShow paramsID={userId} />
        <StoryBar paramsID={userId} />
        <ProfileContent paramsID={userId} />
      </>
    );
  } else {
    console.log(user);
    //viewer
    view = (
      <>
        <ProfileShow paramsID={userId} />
        <StoryBar paramsID={userId} />
        <ProfileContent paramsID={userId} />
      </>
    );
  }

  return <>{view}</>;
}

Profile.propTypes = {
  userId: PropTypes.string,
};

export default withRouter(Profile);
