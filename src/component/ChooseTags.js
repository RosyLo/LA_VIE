import React from 'react';
import PropTypes from 'prop-types';

import CreatableSelect from 'react-select/creatable';
import { useSelector } from 'react-redux';
// import { tagOptions } from '../utils/data';

function ChooseTags({ setNewTag }) {
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
    />
  );
}

ChooseTags.propTypes = {
  setNewTag: PropTypes.func.isRequired,
};

export default ChooseTags;
