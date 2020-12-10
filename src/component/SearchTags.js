import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SEARCH_TAGS, NOSEARCH_TAGS } from '../redux/actionTypes';

import CreatableSelect from 'react-select/creatable';

function SearchTags() {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tags);
  const handleChange = (newValue, actionMeta) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    if (!newValue) {
      dispatch({ type: NOSEARCH_TAGS });
    } else {
      dispatch({ type: SEARCH_TAGS, payload: { newValue } });
    }
  };

  return (
    <div style={{ maxWidth: '500px', minWidth: '300px', margin: 'auto' }}>
      {' '}
      <CreatableSelect isMulti onChange={handleChange} options={tags} />
    </div>
  );
}

SearchTags.propTypes = {
  // comment: PropTypes.object.isRequired,
};

export default SearchTags;
