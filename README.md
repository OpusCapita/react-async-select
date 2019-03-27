# react-async-select

### Description
This component is a combination of a combobox with asynchronous fetching of results and a modal search dialog for more filtering possibilities.

### Installation
```
npm install @opuscapita/react-async-select
```

### Demo
View the [DEMO](https://opuscapita.github.io/react-async-select)

### Builds
#### UMD
The default build with compiled styles in the .js file. Also minified version available in the lib/umd directory.
#### CommonJS/ES Module
You need to configure your module loader to use `cjs` or `es` fields of the package.json to use these module types.
Also you need to configure sass loader, since all the styles are in sass format.
* With webpack use [resolve.mainFields](https://webpack.js.org/configuration/resolve/#resolve-mainfields) to configure the module type.
* Add [SASS loader](https://github.com/webpack-contrib/sass-loader) to support importing of SASS styles.

### API
| Prop name                          | Type     | Default                                            | Description                                        |
| ---------------------------------- | -------- | -------------------------------------------------- | -------------------------------------------------- |
| value                              | any      |                                                    | The initially selected value                       |
| onSelect                           | function | () => {}                                           | Selection callback function                        |
| handleChange                       | function | Sets internal state and calls setState callback    | Handles internal state on selecting an item        |
| loadOptions                        | function | () => Promise.resolve([])                          | Function for fetching options for the combobox     |
| isDisabled                         | boolean  | false                                              | Disables the component from user interaction       |
| localizationTexts                  | object   |                                                    | A dictionary with translated texts as values       |
| localizationTexts.["searchBy"]     | string   |                                                    | UI text prefix for the first search field          |
| localizationTexts.["by"]           | string   |                                                    | UI text prefix for other search fields             |
| localizationTexts.["close"]        | string   |                                                    | UI text for the Close-button                       |
| localizationTexts.["select"]       | string   |                                                    | UI text for the Select-button                      |
| localizationTexts.["field.XYZ"]    | string   |                                                    | Label for the search field with name "XYZ"         |
| localizationTexts.["column.XYZ"]   | string   |                                                    | Header for the column with name "XYZ"              |
| localizationTexts.["loading"]      | string   | 'Loading...'                                       | Loading placeholder text                           |
| localizationTexts.["noItems"]      | string   | '--'                                               | Empty result set text for the dropdown             |
| localizationTexts.["noData"]       | string   | 'No rows found'                                    | Empty result set text for the modal                |
| localizationTexts.["previous"]     | string   | 'Previous'                                         | Paging text                                        |
| localizationTexts.["next"]         | string   | 'Next'                                             | Paging text                                        |
| localizationTexts.["page"]         | string   | 'Page'                                             | Paging text                                        |
| localizationTexts.["of"]           | string   | 'of'                                               | Paging text                                        |
| localizationTexts.["rows"]         | string   | 'rows'                                             | Paging text                                        |
| localizationTexts.["pageJump"]     | string   | 'jump to page'                                     | Paging text                                        |
| localizationTexts.["rowsSelector"] | string   | 'rows per page'                                    | Paging text                                        |
| modal                              | object   |                                                    | Modal dialog specific props                        |
| modal.title                        | string   | ''                                                 | Localized title of the modal                       |
| modal.fields                       | [string] | []                                                 | List of fields to show as columns                  |
| modal.loadOptions                  | function | () => Promise.resolve({ data: [], totalCount: 0 }) | Function for fetching entries to the table         |
| modal.components                   | object   | {}                                                 | A collection of custom components                  |
| modal.components.LeftPanel         | element  | null                                               | Custom component for left side panel               |
| modal.components.RightPanel        | element  | null                                               | Custom component for right side panel              |
| setRef                             | function | () => {}                                           | Allows access to select component ref from outside |
| onKeyDown                          | function | () => {}                                           | Allows handling of keydown events from outside     |

### Code example
```jsx
import React from 'react';
import { Dropdown } from '@opuscapita/react-component-example';

export default class ReactView extends React.Component {
  render() {
    return (
      <Dropdown
        localizationTexts={{
          searchBy: 'Search by',
          by: 'By',
          close: 'Close',
          select: 'Select',
          "field.fieldName1": 'my field',
          "field.fieldName2": 'another field'
          "column.fieldName1": 'My field',
          "column.fieldName2": 'Another field',
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
        isDisabled={false}
        value={{ value: 'a', label: 'The first letter in the alphabet, transformed with String.toLowerCase' }}
        loadOptions={
          () => Promise.resolve([
            { label: 'a_DisplayValue', value: 'a' }
            { label: 'b_DisplayValue', value: 'b' }
          ])
        }
        onSelect={() => { /* Capture new selected value */ }}
        handleChange={({ value, setState, onSelect }) => {
          setState({ value });
          onSelect(value);
          return value;
        }}
        modal={{
          title: 'Search entries',
          fields: [
            'fieldName1',
            'fieldName2',
          ],
          loadOptions: () => Promise.resolve({
            data: [
              {
                fieldName1: 'a_DisplayValue',
                fieldName2: 'a_AnotherDisplayValue'
                value: 'a'
              },
              {
                fieldName1: 'b_DisplayValue',
                fieldName2: 'b_AnotherDisplayValue'
                value: 'b'
              },
            ],
            totalCount: 0
          }),
          components: {
            LeftPanel: ({ selectedRow }) => (<div></div>),
            RightPanel: ({ selectedRow }) => (<div></div>),
          }
        }}
      />
    );
  }
}
```
