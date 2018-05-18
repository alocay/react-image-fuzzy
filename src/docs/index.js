import React from "react";
import ReactDOM from "react-dom";
import Fuzzy, { Filters } from '../lib';
import "./css/style.css";

const FuzzyImage = require('./fuzzy_sm.jpg');

const FuzzyExample = ({url, filter, options, caption}) => {
    return (
        <div className="col">            
            <Fuzzy url={url} 
                   filter={filter}
                   options={options} />
            <div>{caption}</div>
        </div>
    );
}

const FuzzyDemo = () => {
    return (
        <div className="content"> 
            <div className="group header">
                <div className="row gutters">
                    <div class="col col-8">
                        <h1>React Fuzzy</h1>
                        <h5 class="subtitle">A simple image processing JavaScript library</h5>
                        <h6><a href="https://github.com/alocay/fuzzy-react">GitHub</a></h6>
                    </div>
                    <div class="col col-4">
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
                                  options={'red'} />
                                  
                    <FuzzyExample url={FuzzyImage}
                                  caption={"Inverted"}
                                  filter={Filters.Invert} />
                                  
                    <FuzzyExample url={FuzzyImage}
                                  caption={"Inverted w/ Color"}
                                  filter={Filters.Invert} 
                                  options={'red'} /> 
                                  
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
                                  options={5} />
                                  
                    <FuzzyExample url={FuzzyImage}
                                  caption={"Box Blur"}
                                  filter={Filters.BoxBlur}
                                  options={3} />                
                    
                    <FuzzyExample url={FuzzyImage}
                                  caption={"Horizontal Blur"}
                                  filter={Filters.HorizontalBlur}
                                  options={8} />
                    
                    <FuzzyExample url={FuzzyImage}
                                  caption={"Vertical Blur"}
                                  filter={Filters.VerticalBlur}
                                  options={8} />
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
                                  options={0.5} />
                                  
                    <FuzzyExample url={FuzzyImage}
                                  caption={"Lighten"}
                                  filter={Filters.Luminosity}
                                  options={1.5} />
                                  
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
            
            <div className="footer row align-center">
                <div class="col col-11">Built by <a href="http://alocay.github.io">Armando Locay</a>, 2018. Licensed under the MIT License.</div>
            </div>
        </div>
    );
};

ReactDOM.render(
  <FuzzyDemo />,
  document.getElementById("root")
);

