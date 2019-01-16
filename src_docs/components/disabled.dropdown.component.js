import React from 'react';
import Select from '../../src/index';

import {
  modalLoadOptions,
  comboLoadOptions,
} from './utils';

export const ExampleComponent = () => {
  return (
    <div>
      <h4>Disabled component</h4>
      <Select
        localizationTexts={{
          "close": "Close",
          "select": "Select",
          "field.code": "code",
          "field.description": "description",
          "column.code": "Code",
          "column.description": "Description",
          "loading": "Loading...",
          "noData": "No items",
          "searchBy": "Search by",
          "by": "by"
        }}
        isDisabled={true}
        value={{ value: 'b', label: 'second char commonStr' }}
        loadOptions={comboLoadOptions}
        onSelect={value => console.log({ value })}
        modal={{
          title: 'Search entries',
          fields: [
            'code',
            'description',
          ],
          loadOptions: modalLoadOptions,
        }}
      />
    </div>
  );
};

export default ExampleComponent;
