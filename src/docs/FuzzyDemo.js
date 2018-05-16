import React, { Component } from "react";
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Fuzzy, { Filters } from '../lib';

const FuzzyImage = require('./fuzzy_sm.jpg');

class FuzzyDemo extends Component{
    render(){
        return(
            <div className="content">            
                <Fuzzy url={FuzzyImage} 
                       filter={Filters.Color}
                       parameter={'red'} />
                <Fuzzy url={FuzzyImage} 
                       filter={Filters.Invert} />
                <Fuzzy url={FuzzyImage} 
                       filter={Filters.Pixelate}
                       parameter={5} />
            </div>
        );
    }
}

export default FuzzyDemo;