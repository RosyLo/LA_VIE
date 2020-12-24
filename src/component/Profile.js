import { React, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileShow from './ProfileShow';
import StoryBar from './StoryBar';
import ProfileContent from './ProfileContent';
import { useSelector } from 'react-redux';

function Profile({ userId }) {
  const user = useSelector((state) => state.user);

  let view = '';

  if (!user) {
    //visitor
    view = (
      <>
        <ProfileShow paramsID={userId} />
        <ProfileContent paramsID={userId} />
      </>
    );
  } else if (user.uid === userId) {
    //master?
    view = (
      <>
        <ProfileShow paramsID={userId} />
        <StoryBar paramsID={userId} />
        <ProfileContent paramsID={userId} />
      </>
    );
  } else {
    //viewer
    view = (
      <>
        <ProfileShow paramsID={userId} />
        {/* !要判斷是否為粉絲 */}
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
