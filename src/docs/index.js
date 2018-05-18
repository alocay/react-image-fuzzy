import React from "react";
import ReactDOM from "react-dom";
import Fuzzy, { Filter, Filters, Colors } from "../lib";
import "./css/style.css";

const FuzzyImage = require('./fuzzy_sm.jpg');

const FuzzyExample = ({url, filter, parameter, caption}) => {
    return (
        <div className="col">            
            <Fuzzy url={url} 
                   filter={filter}
                   parameter={parameter} />
            <div className="caption">{caption}</div>
        </div>
    );
};

const filterCombo1 = [
    new Filter(Filters.Emboss),
    new Filter(Filters.Color, Colors.red)
];

const filterCombo2 = [
    new Filter(Filters.Luminosity, 0.5),
    new Filter(Filters.VerticalBlur, 8)
];

const filterCombo3 = [
    new Filter(Filters.Pixelate, 5),
    new Filter(Filters.Emboss)
];

const filterCombo4 = [
    new Filter(Filters.Sharpen),
    new Filter(Filters.Pixelate, 3),
    new Filter(Filters.Edge)
];

const FuzzyDemo = () => {
    return (
        <div className="content"> 
            <div className="group header">
                <div className="row gutters">
                    <div className="col col-8">
                        <h1>React Fuzzy</h1>
                        <h5 className="subtitle">A simple image processing JavaScript library</h5>
                        <h6><a href="https://github.com/alocay/fuzzy-react">GitHub</a></h6>
                    </div>
                    <div className="col col-4">
                        <img id="myImage" src={FuzzyImage} />
                    </div>
                </div>
            </div>
            <div className="group">
                <h2>Filters</h2>
                <div className="row gutters auto">
                    <FuzzyExample url={FuzzyImage}
                                  caption={"Color Filter"}
                                  filter={Filters.Color}
                                  parameter={'red'} />
                                  
                    <FuzzyExample url={FuzzyImage}
                                  caption={"Inverted"}
                                  filter={Filters.Invert} />
                                  
                    <FuzzyExample url={FuzzyImage}
                                  caption={"Inverted w/ Color"}
                                  filter={Filters.Invert} 
                                  parameter={'red'} /> 
                                  
                    <FuzzyExample url={FuzzyImage}
                                  caption={"Greyscale"}
                                  filter={Filters.Greyscale} />
                </div>
            </div>
            <div className="group">
                <h2>Blurs</h2>
                <div className="row gutters auto">
                    <FuzzyExample url={FuzzyImage}
                                  caption={"Pixelate"}
                                  filter={Filters.Pixelate}
                                  parameter={5} />
                                  
                    <FuzzyExample url={FuzzyImage}
                                  caption={"Box Blur"}
                                  filter={Filters.BoxBlur}
                                  parameter={3} />                
                    
                    <FuzzyExample url={FuzzyImage}
                                  caption={"Horizontal Blur"}
                                  filter={Filters.HorizontalBlur}
                                  parameter={8} />
                    
                    <FuzzyExample url={FuzzyImage}
                                  caption={"Vertical Blur"}
                                  filter={Filters.VerticalBlur}
                                  parameter={8} />
                </div>
            </div>
            <div className="group">
                <h2>Special</h2>
                <div className="row gutters auto">
                    <FuzzyExample url={FuzzyImage} 
                                  caption={"Emboss"}
                                  filter={Filters.Emboss} />
                                  
                    <FuzzyExample url={FuzzyImage}
                                  caption={"Darken"}
                                  filter={Filters.Luminosity}
                                  parameter={0.5} />
                                  
                    <FuzzyExample url={FuzzyImage}
                                  caption={"Lighten"}
                                  filter={Filters.Luminosity}
                                  parameter={1.5} />
                                  
                    <FuzzyExample url={FuzzyImage}
                                  caption={"Sharpen"}
                                  filter={Filters.Sharpen} />
                </div>
                <div className="row gutters auto">   
                    <FuzzyExample url={FuzzyImage}
                                  caption={"Edge Trace"}
                                  filter={Filters.Edge} />
                </div>
            </div>
            <div className="group">
                <h2>Combinations</h2>
                <div className="row gutters auto">
                    <FuzzyExample url={FuzzyImage}
                                  caption={"Emboss w/ color"}
                                  filter={filterCombo1} />
                                  
                    <FuzzyExample url={FuzzyImage}
                                  caption={"Darkened vertical blur"}
                                  filter={filterCombo2} />
                    
                    <FuzzyExample url={FuzzyImage}
                                  caption={"Pixelated emboss"}
                                  filter={filterCombo3} />
                                  
                    <FuzzyExample url={FuzzyImage}
                                  caption={"Sharpened pixelation w/ edge tracing"}
                                  filter={filterCombo4} />
                </div>
            </div>
            
            <div className="footer row align-center">
                <div className="col col-11">Built by <a href="http://alocay.github.io">Armando Locay</a>, 2018. Licensed under the MIT License.</div>
            </div>
        </div>
    );
};

ReactDOM.render(
  <FuzzyDemo />,
  document.getElementById("root")
);

