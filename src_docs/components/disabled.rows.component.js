import React from 'react';
import Select from '../../src/index';

import {
  modalLoadOptions,
  comboLoadOptions,
} from './utils';

export const ExampleComponent = () => {
  return (
    <div>
      <h4>Search with disabled rows</h4>
      <Select
        ignoreAccents={false}
        localizationTexts={{
          "close": "Close",
          "select": "Select",
          "field.code": "code",
          "field.description": "description",
          "column.code": "Code",
          "column.description": "Description",
          "searchBy": "Search by",
          "by": "by",
          "previous": "PREV",
          "next": "NEXT",
          "loading": "LOADING",
          "noData": "NODATA",
          "page": "PAGE",
          "of": "OF",
          "rows": "ROWS",
          "pageJump": "JUMP",
          "rowsSelector": "RPP",
        }}
        value={{ value: 'b', label: 'second char commonStr' }}
        loadOptions={comboLoadOptions}
        onSelect={value => console.log('onSelect', { value })}
        handleChange={({ value, onSelect }) => console.log('handleChange', value, onSelect)}
        modal={{
          title: 'Search entries',
          fields: ['code', 'description'],
          loadOptions: modalLoadOptions,
        }}
      />
    </div>
  );
};

export default ExampleComponent;
