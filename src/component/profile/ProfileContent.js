import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import StackGrid from 'react-stack-grid';
import Post from '../post/Post';
import { MsgPopup } from '../common/MsgPopup';
import UploadPostButton from '../common/UploadPostButton';
import { fetchMasterPosts } from '../../redux/actions/postAction';
import { receiveTags } from '../../redux/actions/searchAction';
import styles from '../../style/profilecontent.module.css';
import styled from '../../style/popup.module.scss';
import msgPopStyles from '../../style/msgPopWrap.module.css';

function ProfileContent({ paramsID }) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const comments = useSelector((state) => state.comments);
  const searchtags = useSelector((state) => state.searchtags);
  const [clickEdit, setclickEdit] = useState('');
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const stakeGridRef = useRef(null);

  //loading
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    window.onscroll = '';
    window.scrollTo(0, 0);
    dispatch(fetchMasterPosts(paramsID));
    dispatch(receiveTags());
  }, [dispatch, paramsID]);

  useEffect(() => {
    if (stakeGridRef.current) {
      stakeGridRef.current.updateLayout();
    }
  }, [comments]);

  useEffect(() => {
    setTimeout(() => {
      if (stakeGridRef.current) {
        stakeGridRef.current.updateLayout();
      }
    }, 500);
  }, [posts]);

  let filterTags = [];
  let filterPosts = [];
  searchtags.map((searchtag) => {
    filterTags.push(searchtag.value);
  });

  posts.map((post) => {
    filterTags.map((tag) => {
      if (post.postTag.value === tag) {
        filterPosts.push(post);
      }
    });
  });
  if (filterTags.length > 0) {
    //將tag 放進 filterTags array裡
  } else {
    filterPosts = posts;
  }

  return (
    <>
      {loading === false ? (
        <div className={styles.wrap}>
          <div className={styles.postWrap}>
            {posts.length > 0 ? (
              <>
                {filterPosts.length > 0 ? (
                  <StackGrid
                    gridRef={(e) => (stakeGridRef.current = e)}
                    columnWidth={300}
                    gutterWidth={30}
                    gutterHeight={30}
                    monitorImagesLoaded={true}>
                    {filterPosts.map((post) => (
                      <Post
                        key={post.postID}
                        post={post}
                        clickEdit={clickEdit}
                        setclickEdit={setclickEdit}
                        setIsDeletePopup={setIsDeletePopup}
                      />
                    ))}
                  </StackGrid>
                ) : (
                  <div className={styles.noPostWrap}>
                    <div className={styles.noPostGuide}>
                      No post match the search, please adjust the filter.
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className={styles.noPostUpload}>
                <div className={styles.noPostGuide}>No Posts Yet, Upload My First Post:</div>{' '}
                <UploadPostButton />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.loading}></div>
      )}

      {/* DeletePopup */}
      <MsgPopup
        show={isDeletePopup}
        handleClose={() => {
          setIsDeletePopup(false);
        }}>
        <div className={msgPopStyles.msgPopWrap}>
          <h2>Delete Successful!</h2>
          <div className={msgPopStyles.buttonWrap}>
            <button
              className={styled.decideButton}
              onClick={() => {
                setIsDeletePopup(false);
              }}>
              OK
            </button>
          </div>
        </div>
      </MsgPopup>
    </>
  );
}

ProfileContent.propTypes = {
  paramsID: PropTypes.string,
};

export default ProfileContent;
