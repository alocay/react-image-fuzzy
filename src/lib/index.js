import React, { Component} from "react";
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FuzzyLogic, { Colors } from './fuzzylogic.js';

/*
 * Filters used by Fuzzy. Mainly as a helper.
 */
const Filters = {
    Color: "color",
    Invert: "invert",
    Greyscale: "greyscale",
    Pixelate: "pixelate",
    BoxBlur: "boxblur",
    HorizontalBlur: "horizontalblur",
    VerticalBlur: "verticalblur",
    GuassianBlur: "guassianblur",
    Emboss: "emboss",
    Luminosity: "luminosity",
    Lighten: "lighten",
    Darken: "darken",
    Sharpen: "sharpen",
    Edge: "edgetrace",
    Convolution: "convolution"
}

/*
 * Simple helper object to create a filter object
 */
const Filter = function(filter, parameter) {
    this.filter = filter;
    this.parameter = parameter;
};

/**
 * The Fuzzy React component
 */
class Fuzzy extends Component{
    
    /*
     * The constructor
     * @param {object} props Component properties
     */
    constructor(props) {
        super(props);
        
        this.originalImage = null;
        this.imageFinal = null;
        this.imageData = null;
        this.canvasRef = React.createRef();
        this.canvasContext = null;
    }
    
    /**
     * Initiates the image loading when mounted
     */
    componentDidMount() {
        this.originalImage = new Image();
        this.loadImage(this.props.url);
    }
    
    /**
     * Handles new properties. Either loads a new image or applies new filters on the original image.
     * @param {object} nextProps The new properties
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.url != this.props.url) {
            this.loadImage(nextProps.url);
        } else if (nextProps.filter != this.props.filter || nextProps.parameter != this.props.parameter) {
            this.setImageDataFromOriginalImage();
            this.processImage(nextProps.filter, nextProps.parameter, nextProps.useImg);
        }
    }
    
    /**
     * Initiates the image loading
     * @param {string} url The image url
     */
    loadImage(url) {
        if (!url) return;
        
        this.originalImage.src = url;
        this.originalImage.onload = this.onImgLoaded.bind(this);
    }
    
    /**
     * Callback for when the image is laoded. Gets the image data and begins processing.
     */
    onImgLoaded() {
        this.canvasRef.current.width = this.originalImage.width;
        this.canvasRef.current.height = this.originalImage.height;
        this.canvasContext = this.canvasRef.current.getContext("2d");
        this.canvasContext.drawImage(this.originalImage, 0, 0, this.originalImage.width, this.originalImage.height);
        this.setImageDataFromOriginalImage();
        
        this.processImage(this.props.filter, this.props.parameter, this.props.useImg);
    }
    
    /**
     * Draws the image to the canvas and gets the image data
     */
    setImageDataFromOriginalImage() {
        this.canvasContext.drawImage(this.originalImage, 0, 0, this.originalImage.width, this.originalImage.height);
        this.imageData = this.canvasContext.getImageData(0, 0, this.originalImage.width, this.originalImage.height);
    }
    
    /**
     * Processes the filters and applies them
     * @param {array} filter The string filter or array of filters to apply
     * @param {string} parameter Any provided parameter (number or string)
     * @param {boolean} useImg Flag indicating if an img element is being used
     */
    processImage(filter, parameter, useImg) {
        if (!filter) return;
        
        let filtersToApply = null;
        
        if (typeof filter === 'string') {
            this.applyFilter(filter, parameter);
        } else if(filter instanceof Array) {
            for(var i = 0; i < filter.length; i++) {
                this.applyFilter(filter[i].filter, filter[i].parameter);
            }
        } else {
            return;
        }
        
        this.canvasContext.putImageData(this.imageData, 0, 0);
        
        if (useImg && this.imageFinal)  {
            this.imageFinal.src = this.canvasRef.current.toDataURL();
        }
    }
    
    /**
     * Applies the filter
     * @param {string} filter The filter to apply
     * @param {string} parameter Filter parameter (string or number)
     */
    applyFilter(filter, parameter) {
        console.log('Applying', filter, parameter);
        switch (filter) {
            case Filters.Color:
                FuzzyLogic.colorFilter(this.imageData, parameter);
                break;
            case Filters.Invert: 
                FuzzyLogic.invert(this.imageData, parameter);
                break;
            case Filters.Greyscale:
                FuzzyLogic.greyscale(this.imageData);
                break;
            case Filters.Pixelate:
                FuzzyLogic.pixelate(this.imageData, parameter, this.originalImage.width, this.originalImage.height);
                break;
            case Filters.BoxBlur:
                FuzzyLogic.boxBlur(this.imageData, parameter);
                break;
            case Filters.HorizontalBlur:
                FuzzyLogic.horizontalBlur(this.imageData, parameter);
                break;
            case Filters.VerticalBlur:
                FuzzyLogic.verticalBlur(this.imageData, parameter);
                break;
            case Filters.GuassianBlur:
                FuzzyLogic.gaussianBlur(this.imageData, parameter);
                break;
            case Filters.Emboss:
                FuzzyLogic.emboss(this.imageData);
                break;
            case Filters.Sharpen:
                FuzzyLogic.sharpen(this.imageData);
                break;
            case Filters.Luminosity:
                FuzzyLogic.luminosity(this.imageData, parameter);
                break;
            case Filters.Edge:
                FuzzyLogic.edgetrace(this.imageData);
                break;
            case Filters.Convolution:
                FuzzyLogic.convolution(this.imageData, parameter);
                break;
        }
    }
    
    /**
     * React render function
     */ 
    render(){
        return(
            <div className={classnames({[this.props.className]: this.props.className})}>
                <canvas className={classnames({"hide": this.props.useImg})} ref={this.canvasRef} />
                { this.props.useImg ? <img className="image-final" ref={ finalImageElement => this.imageFinal = finalImageElement } /> : null}
            </div>
        );
    }
}

/*
 * Expected property types
 */
Fuzzy.propTypes = {
    url: PropTypes.string.isRequired,
    filter: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.array.isRequired
    ]),
    parameter: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object
    ]),
    useImg: PropTypes.bool,
    className: PropTypes.string
};

/*
 * Default property types
 */
Fuzzy.defaultPropTypes = {
    useImg: false
}

export { Filter, Filters, Colors };
export default Fuzzy;
