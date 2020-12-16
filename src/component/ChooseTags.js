import React from 'react';
import PropTypes from 'prop-types';

import CreatableSelect from 'react-select/creatable';
import { useSelector } from 'react-redux';

function ChooseTags({ newTag, setNewTag }) {
  const tags = useSelector((state) => state.tags);
  const handleChange = (newValue, actionMeta) => {
    console.group('Value Changed');
    setNewTag(newValue);
    console.groupEnd();
  };
  const handleInputChange = (inputValue, actionMeta) => {
    console.group('Input Changed');
    console.groupEnd();
  };

  return (
    <CreatableSelect
      isClearable
      onChange={handleChange}
      onInputChange={handleInputChange}
      options={tags}
      placeholder={newTag.value}
    />
  );
}

ChooseTags.propTypes = {
  setNewTag: PropTypes.func.isRequired,
  newTag: PropTypes.object.isRequired,
};

export default ChooseTags;
