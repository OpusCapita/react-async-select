import React, { useState } from 'react';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Select from '../../src/index';

import {
  modalLoadOptions,
  comboLoadOptions,
} from './utils';

export const ExampleComponent = () => {
  const [value, setValue] = useState(null);

  return (
    <div>
      <h4>Customized filter</h4>
      <Select
        value={value}
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
        filters={{
          code: ({ value, onChange }) => ( // eslint-disable-line react/prop-types
            <Checkbox checked={value} onChange={() => onChange(!value)}>
              Customized filter
            </Checkbox>
          )
        }}
        renderers={{
          description: ({ label, disabled }) => ( // eslint-disable-line react/prop-types
            <span>
              {label}
              {disabled ? (<span style={{ color: 'red' }}> (disabled)</span>) : null}
            </span>
          )
        }}
        loadOptions={comboLoadOptions}
        onSelect={value => setValue(value)}
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
