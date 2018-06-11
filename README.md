A simple React component for image filter/processing

[Simple React Fuzzy  Demo](https://alocay.github.io/react-image-fuzzy/)

[![Build Status](https://travis-ci.org/alocay/react-image-fuzzy.svg?branch=master)](https://travis-ci.org/alocay/react-image-fuzzy)
[![npm version](https://badge.fury.io/js/react-image-fuzzy.svg)](https://badge.fury.io/js/react-image-fuzzy)
[![dependencies Status](https://david-dm.org/alocay/react-image-fuzzy/status.svg)](https://david-dm.org/alocay/react-image-fuzzy)
[![devDependencies Status](https://david-dm.org/alocay/react-image-fuzzy/dev-status.svg)](https://david-dm.org/alocay/react-image-fuzzy?type=dev)
[![Inline docs](http://inch-ci.org/github/alocay/react-image-fuzzy.svg?branch=master)](http://inch-ci.org/github/alocay/react-image-fuzzy)
[![Maintainability](https://api.codeclimate.com/v1/badges/f13fd9a3135459ab4ca7/maintainability)](https://codeclimate.com/github/alocay/react-image-fuzzy/maintainability)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)


## Getting Started
Download the package via NPM 
```
npm install react-image-fuzzy
```

Import the package in your JSX file

**ES6:**  `import Fuzzy from 'react-image-fuzzy';`    
**<ES6:**  `const Fuzzy = require('react-image-fuzzy');`

## Examples
Using React Fuzzy is simple. Once imported, just use the <Fuzzy /> component, providing the image, the filters, and any necessary parameters:

```jsx
const myImage = require('./path/to/img.png');
...
render() {
    <div>
        <Fuzzy url={myImage} 
               filter={'colorFilter'}
               parameter={'red'} />
    </div>
}
```           

A single filter and parameter can be provided via `filter` and `parameter` property but an array of filter objects can also be passed to the `filter` property. When passing an array of filters, a filter object is required that contains information on the filter and parameters:

```
const filters = [{
   filter: 'colorFilter',
   parameter: 'red'
}];
```
Providing an array of filters will cause all filters to be applied one after the other:

```
// This will apply the red color filter first and then the box blur
const filters = [
    {
        filter: 'colorFilter',
        parameter: 'red'
    },
    {
        filter: 'boxBlur',
        parameter: 5
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
[Basic documentation](https://github.com/alocay/react-image-fuzzy/blob/master/docs/react-fuzzy-docs.md)  
More to come.

## License
Copyright (c) 2018 Armando Locay  
Licensed under the MIT license.
