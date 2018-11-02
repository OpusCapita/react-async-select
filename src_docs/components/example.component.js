import React from 'react';
import Example from '../../src/index';

const i18n = {
  getMessage: id => {
    switch (id) {
      case 'search.by':
        return 'Search by';
      case 'by':
        return 'By';
      case 'table.loading':
        return 'Loading...';
      case 'table.no.items':
        return 'No items';
      default:
        return id;
    }
  }
};

const options = [
  { description: 'first number commonStr', code: 1 },
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
      return !option[field].toString().toLowerCase().includes(value.toLowerCase());
    });
  });
  const modalOptionShapes = filteredOptions.map(option => ({
    ...option,
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
  }));
  return new Promise(resolve => {
    setTimeout(() => resolve({ options: comboOptionShapes }), Math.random() * 3000);
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
        <Example
          i18n={i18n}
          value={'b'}
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
  }
}
