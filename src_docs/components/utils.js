
export const options = [
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
export const modalLoadOptions = ({ searchFields, offset, limit }) => {
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
export const comboLoadOptions = inputValue => {
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
