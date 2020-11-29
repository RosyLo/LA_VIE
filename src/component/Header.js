import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout, addPost } from '../redux/actions';
import PropTypes from 'prop-types';
import '../style/header.css';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [image, setImage] = useState(null);

  const handlePictureChange = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadImage = () => {
    dispatch(addPost(image));
  };

  return (
    <div className='headerWrap'>
      HEADER
      <div className='loginButton'>
        {user ? (
          <>
            <span>{user.displayName}</span>
            <button onClick={() => dispatch(logout())}>LogOut</button>
          </>
        ) : (
          <button onClick={() => dispatch(login())}>Login</button>
        )}
      </div>
      <div className='uploadPostButton'>
        <input
          type='file'
          id='uploadPictureButton'
          // value='uploadPicture'
          onChange={handlePictureChange}
        />
        <button onClick={uploadImage}>Upload</button>
      </div>
    </div>
  );
};

Header.propTypes = {
  handlePictureChange: PropTypes.func,
  handleUploadPic: PropTypes.func,
  uploadPic: PropTypes.func,
  setCurrentUser: PropTypes.func,
  currentUser: PropTypes.object,
};

export default Header;
