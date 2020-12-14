import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SEARCH_TAGS, NOSEARCH_TAGS } from '../redux/actionTypes';
import chroma from 'chroma-js';
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

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: ' rgb(250,250,250)',
      // match with the menu
      borderRadius: state.isFocused ? '3px 3px 0 0' : 3,
      // Overwrittes the different states of border
      borderColor: state.isFocused ? 'black' : ' rgb(187,187,187)',
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      '&:hover': {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? 'rgb(187, 140, 47)' : 'black',
      },
    }),
    menu: (base) => ({
      ...base,
      // override border radius to match the box
      borderRadius: '5px',
      // kill the gap
      marginTop: 0,
    }),
    menuList: (base) => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
      ...styles,
      // backgroundColor: isDisabled ? 'red' : 'blue',
      cursor: isDisabled ? 'not-allowed' : 'default',
    }),
    multiValue: (styles, { data, isDisabled, isFocused, isSelected }) => ({
      ...styles,
      border: 'none',
      background: 'rgb(250,250,250)',
      cursor: isDisabled ? 'not-allowed' : 'default',
    }),
  };

  return (
    <div style={{ maxWidth: '500px', minWidth: '300px', margin: 'auto' }}>
      {' '}
      <CreatableSelect
        isMulti
        onChange={handleChange}
        options={tags}
        placeholder={'Find Post...'}
        styles={customStyles}
      />
    </div>
  );
}

SearchTags.propTypes = {
  // comment: PropTypes.object.isRequired,
};

export default SearchTags;
