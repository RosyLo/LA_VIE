import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import CreatableSelect from 'react-select/creatable';

function ChooseTags({ newTag, setNewTag }) {
  const tags = useSelector((state) => state.tags);
  const handleChange = (newValue, actionMeta) => {
    setNewTag(newValue);
  };
  const handleInputChange = (inputValue, actionMeta) => {
    console.group('Input Changed');
    console.groupEnd();
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: ' rgb(250,250,250)',
      // match with the menu
      borderRadius: state.isFocused ? '3px 3px 0 0' : 3,
      // Overwrittes the different states of border
      borderColor: 'rgb(219,219,219)',
      borderRadius: '8px',
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      '&:hover': {
        // Overwrittes the different states of border
        borderColor: 'rgb(187, 140, 47)',
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
  let tagHolder;
  if (newTag) {
    tagHolder = newTag.value;
  } else {
    tagHolder = '#Tag...';
  }

  return (
    <>
      {newTag ? (
        <CreatableSelect
          isClearable
          onChange={handleChange}
          onInputChange={handleInputChange}
          options={tags}
          placeholder={tagHolder}
          styles={customStyles}
          value={newTag.value}
        />
      ) : (
        <CreatableSelect
          isClearable
          onChange={handleChange}
          onInputChange={handleInputChange}
          options={tags}
          placeholder={tagHolder}
          styles={customStyles}
          value='#Tag...'
        />
      )}
    </>
  );
}

ChooseTags.propTypes = {
  setNewTag: PropTypes.func.isRequired,
  newTag: PropTypes.object,
};

export default ChooseTags;
