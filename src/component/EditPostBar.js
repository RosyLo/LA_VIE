import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import EditPostBlock from './EditPostBlock';

function EditPostBar({ postID, postIssuerID }) {
  const user = useSelector((state) => state.user);
  //click edit
  const [clickEdit, setclickEdit] = useState(false);

  return (
    <>
      {user && user.uid === postIssuerID && (
        <>
          <div
            className='editPostBar'
            onClick={() => {
              setclickEdit(!clickEdit);
            }}>
            ...
          </div>
          {clickEdit ? <EditPostBlock postID={postID} /> : ''}
        </>
      )}
    </>
  );
}

EditPostBar.propTypes = {
  postID: PropTypes.string.isRequired,
  postIssuerID: PropTypes.string.isRequired,
};

export default EditPostBar;
