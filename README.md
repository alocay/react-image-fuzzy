# FuzzyJS

A simple React component for image filter/processing

[Simple React Fuzzy  Demo](http://alocay.github.io/projects/fuzzyjs/index.html)

## Getting Started
Download the package via NPM 
```
npm install react-image-fuzzy
```

Import the package in your JSX file

**ES6:**  `import Fuzzy from 'react-image-fuzzy';`    
**<ES6:**  `const Fuzzy = require('react-image-fuzzy');`

## Examples
Using React Fuzzy is simple. Once imported, just use the <Fuzzy /> component, providing the image, the filters, and any necessary options:

```jsx
const myImage = require('./path/to/img.png');
...
render() {
    <div>
        <Fuzzy url={myImage} 
               filter={'colorFilter'}
               option={'red'} />
    </div>
}
```           

A single filter and option can be provided via `filter` and `option` property but an array of filter objects can also be passed to the `filter` property. When passing an array of filters, a filter object is required that contains information on the filter and options:

```
const filters = [{
   filter: 'colorFilter',
   option: 'red'
}];
```
Providing an array of filters will cause all filters to be applied one after the other:

```
// This will apply the red color filter first and then the box blur
const filters = [
    {
        filter: 'colorFilter',
        option: 'red'
    },
    {
        filter: 'boxBlur',
        option: 5
    }
];
...
<Fuzzy url={myImage} 
       filter={filters} />
```

A few helpers are accessible but not required.

```
import { Filter, Filters, Colors } from 'react-image-fuzzy';

const f = [new Filter(Filter.Color, Colors.red)];
...
<Fuzzy url={myImage} 
       filter={f}/> 
       
<Fuzzy url={myImage} 
       filter={Filters.Greyscale} /> 
```

By default React Fuzzy will display a `canvas` element for the resulting image. If an `img` element is desired in the DOM, just use the `useImg` property:

```
<Fuzzy url={myImage} 
       filter={filters} 
       useImg={true} />
```

###Available filters
- Color filter
- Invert
- Invert w/ color
- Pixelation
- Various blurs
- Emboss
- Luminosity
- Sharpen
- Edge trace
- Can also provide your own convolution matrix

Refer to the documentation for more information.

## Documentation
[Basic documentation](https://github.com/alocay/FuzzyJS/blob/master/docs/fuzzy-js-docs.md)  
More to come.

## License
Copyright (c) 2018 Armando Locay  
Licensed under the MIT license.
