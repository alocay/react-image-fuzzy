import React, { Component } from "react";
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Fuzzy, { Filters } from '../../lib';

class FuzzyExample extends Component{
    render(){
        return(
            <div className="col">            
                <Fuzzy url={this.props.url} 
                       filter={this.props.filter}
                       parameter={this.props.parameter} />
                <div>{this.props.caption}</div>
            </div>
        );
    }
}

FuzzyExample.propTypes = {
    url: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    filter: PropTypes.string.isRequired,
    parameter: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object
    ])
};

export default FuzzyExample;