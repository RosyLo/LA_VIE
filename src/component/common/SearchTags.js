import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SEARCH_TAGS, NOSEARCH_TAGS } from '../../redux/actionTypes';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import styles from '../../style/header.module.css';

function SearchTags() {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tags);
  const [isWindowSmall, setIsWindowSmall] = useState(false);
  useEffect(() => {
    if (window.innerWidth <= 425) {
      setIsWindowSmall(true);
    }
  }, [dispatch]);

  const handleChange = (newValue, actionMeta) => {
    if (!newValue) {
      dispatch({ type: NOSEARCH_TAGS });
    } else {
      dispatch({ type: SEARCH_TAGS, payload: { newValue } });
    }
  };
  const handleChangeSingle = (value, actionMeta) => {
    console.group('Value Changed');
    let newValue = [];
    newValue.push(value);
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
      borderRadius: state.isFocused ? '3px 3px 0 0' : 3,
      borderColor: ' rgb(219,219,219)',
      borderRadius: '8px',
      boxShadow: state.isFocused ? null : null,
      '&:hover': {
        borderColor: 'rgb(187, 140, 47)',
      },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: '5px',
      marginTop: 0,
      zIndex: '10000',
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
      zIndex: '10000',
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
      ...styles,
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
    <div className={styles.search} styles={{ zIndex: '10000' }}>
      {isWindowSmall ? (
        <Select
          onChange={handleChangeSingle}
          options={tags}
          placeholder={'Find Post.....'}
          styles={customStyles}
        />
      ) : (
        <CreatableSelect
          isMulti
          onChange={handleChange}
          options={tags}
          placeholder={'Find Post...'}
          styles={customStyles}
        />
      )}
    </div>
  );
}

export default SearchTags;
