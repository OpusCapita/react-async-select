import React from 'react';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Example from '../../src/index';

const options = [
  { description: 'first number commonStr', code: 1, disabled: true },
  { description: 'second number commonStr', code: 2 },
  { description: 'third number commonStr', code: 3 },
  { description: 'fourth number commonStr', code: 4 },
  { description: 'fifth number commonStr', code: 5 },
  { description: 'first string commonStr', code: 'aStr' },
  { description: 'second string commonStr', code: 'bStr' },
  { description: 'third string commonStr', code: 'cStr' },
  { description: 'fourth string commonStr', code: 'dStr' },
  { description: 'fifth string commonStr', code: 'eStr' },
  { description: 'first char commonStr', code: 'a' },
  { description: 'second char commonStr', code: 'b' },
  { description: 'third char commonStr', code: 'c' },
  { description: 'fourth char commonStr', code: 'd' },
  { description: 'fifth char commonStr', code: 'e' },
];
const modalLoadOptions = ({ searchFields, offset, limit }) => {
  const filteredOptions = options.filter(option => {
    return !Object.entries(searchFields).some(([field, value]) => {
      return !option[field].toString().toLowerCase().includes(
        ((typeof value) === 'string') ? value.toLowerCase() : value
      );
    });
  });
  const modalOptionShapes = filteredOptions.map(option => ({
    ...option,
    label: option.description,
    value: option.code,
  }));
  return new Promise(resolve => {
    setTimeout(() => resolve({
      data: modalOptionShapes.slice(offset, offset + limit),
      totalCount: modalOptionShapes.length
    }), Math.random() * 3000);
  });
};
const comboLoadOptions = inputValue => {
  const filteredOptions = options.filter(option => {
    return option.description.toLowerCase().includes(inputValue.toLowerCase());
  });
  const comboOptionShapes = filteredOptions.map(option => ({
    label: option.description,
    value: option.code,
    disabled: option.disabled,
  }));
  return new Promise(resolve => {
    setTimeout(() => resolve(comboOptionShapes), Math.random() * 3000);
  });
};

export default class ComponentView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ padding: '20px' }}>
        <div>
          <h4>Simple component</h4>
          <Example
            localizationTexts={{
              "close": "Close",
              "select": "Select",
              "field.code": "code",
              "field.description": "description",
              "column.code": "Code",
              "column.description": "Description",
              "searchBy": "Search by",
              "by": "by",
              "noItems": "No items",
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
            onSelect={value => console.log({ value })}
            isOptionDisabled={option => option.disabled}
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
        <div>
          <h4>Customized change handler</h4>
          <Example
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
            loadOptions={comboLoadOptions}
            onSelect={value => console.log({ value })}
            handleChange={({ value, setState, onSelect }) => {
              onSelect(value);
              setState({ value: null });
              return value;
            }}
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
        <div>
          <h4>Customized filter</h4>
          <Example
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
              code: ({ value, onChange }) => (
                <Checkbox checked={value} onChange={() => onChange(!value)}>
                  Customized filter
                </Checkbox>
              )
            }}
            renderers={{
              description: ({ label, disabled }) => (
                <span>
                  {label}
                  {disabled ? (<span style={{ color: 'red' }}> (disabled)</span>) : null}
                </span>
              )
            }}
            loadOptions={comboLoadOptions}
            onSelect={value => console.log({ value })}
            handleChange={({ value, setState, onSelect }) => {
              onSelect(value);
              return value;
            }}
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
        <div>
          <h4>Search with disabled rows</h4>
          <Example
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
        <div>
          <h4>Disabled component</h4>
          <Example
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
      </div>
    );
  }
}
