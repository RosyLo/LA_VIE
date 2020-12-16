import React from 'react';
import PropTypes from 'prop-types';

import CreatableSelect from 'react-select/creatable';
import { useSelector } from 'react-redux';

function ChooseTags({ newTag, setNewTag }) {
  console.log(newTag);
  const tags = useSelector((state) => state.tags);
  const handleChange = (newValue, actionMeta) => {
    console.group('Value Changed');
    console.log(newValue);
    setNewTag(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  const handleInputChange = (inputValue, actionMeta) => {
    console.group('Input Changed');
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
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
