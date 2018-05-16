import React, { Component} from "react";
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FuzzyLogic from './FuzzyLogic.js';

const Filters = {
    Color: "color",
    Invert: "invert",
    Greyscale: "greyscale",
    Pixelate: "pixelate",
    BoxBlur: "boxblur",
    HorizontalBlur: "horizontalblur",
    VeriticalBlur: "verticalblur",
    GuassianBlur: "guassianblur",
    Emboss: "emboss",
    Luminosity: "luminosity",
    Lighten: "lighten",
    Darken: "darken",
    Sharpen: "sharpen",
    Edge: "edgetrace",
    Convolution: "convolution"
}

class Fuzzy extends Component{
    constructor(props) {
        super(props);
        
        this.originalImage = null;
        this.imageFinal = null;
        this.imageData = null;
        this.canvasRef = React.createRef();
        this.canvasContext = null;
    }
    
    componentDidMount() {
        this.originalImage = new Image();
        
        this.originalImage.src = this.props.url;
        this.originalImage.onload = this.onImgLoaded.bind(this);
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.filter) {
            this.processImage(nextProps.filter, nextProps.parameter, nextProps.useImg);
        }
    }
    
    onImgLoaded() {
        this.canvasRef.current.width = this.originalImage.width;
        this.canvasRef.current.height = this.originalImage.height;
        this.canvasContext = this.canvasRef.current.getContext("2d");
        this.canvasContext.drawImage(this.originalImage, 0, 0, this.originalImage.width, this.originalImage.height);
        this.imageData = this.canvasContext.getImageData(0, 0, this.originalImage.width, this.originalImage.height);
        
        this.processImage(this.props.filter, this.props.parameter, this.props.useImg);
    }
    
    processImage(filter, parameter, useImg) {        
        switch (filter) {
            case Filters.Color:
                FuzzyLogic.colorFilter(this.imageData, parameter);
                break;
            case Filters.Invert: 
                FuzzyLogic.invert(this.imageData);
                break;
            case Filters.Pixelate:
                console.log(parameter + ' ' + this.originalImage.width + ' ' + this.originalImage.height);
                FuzzyLogic.pixelate(this.imageData, parameter, this.originalImage.width, this.originalImage.height);
                break;
        }
        
        this.canvasContext.putImageData(this.imageData, 0, 0);
        
        if (useImg)  {
            this.imageFinal.src = this.canvasRef.current.toDataURL();
        }
    }
    
    render(){
        return(
            <div>
                <canvas className={classnames({"hide": this.props.useImg})} ref={this.canvasRef} />
                { this.props.useImg ? <img className="image-final" ref={ finalImageElement => this.imageFinal = finalImageElement } /> : null}
            </div>
        );
    }
}

Fuzzy.propTypes = {
    url: PropTypes.string.isRequired,
    filter: PropTypes.string.isRequired,
    parameter: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    useImg: PropTypes.bool
};

Fuzzy.defaultPropTypes = {
    useImg: false
}

export { Filters };
export default Fuzzy;
