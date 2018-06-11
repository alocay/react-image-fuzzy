import FuzzyLogic, { Colors } from '../src/lib/fuzzylogic.js';
import Pixel from '../src/lib/pixel.js';

const truthImageData = [100, 100, 100, 255];
let workingImageData = {};

beforeEach(() => {
    workingImageData.data = truthImageData.slice(0);
    workingImageData.width = 1;
    workingImageData.height = 1;
});

describe('color filtering tests', () => {
    test('filtering R alters G and B only', () => {
        FuzzyLogic.colorFilter(workingImageData, Colors.red);
        expect(workingImageData.data[0]).toEqual(truthImageData[0]);
        expect(workingImageData.data[1]).toEqual(0);
        expect(workingImageData.data[2]).toEqual(0);
        expect(workingImageData.data[3]).toEqual(truthImageData[3]);
    });
    
    test('filtering G alters R and B only', () => {
        FuzzyLogic.colorFilter(workingImageData, Colors.green);
        expect(workingImageData.data[0]).toEqual(0);
        expect(workingImageData.data[1]).toEqual(truthImageData[1]);
        expect(workingImageData.data[2]).toEqual(0);
        expect(workingImageData.data[3]).toEqual(truthImageData[3]);
    });
    
    test('filtering B alters R and G only', () => {
        FuzzyLogic.colorFilter(workingImageData, Colors.blue);
        expect(workingImageData.data[0]).toEqual(0);
        expect(workingImageData.data[1]).toEqual(0);
        expect(workingImageData.data[2]).toEqual(truthImageData[2]);
        expect(workingImageData.data[3]).toEqual(truthImageData[3]);
    });
});

describe('invert filtering tests', () => {
    test('filtering R alters G and B only', () => {
        FuzzyLogic.invert(workingImageData, Colors.red);
        const g = 255 - truthImageData[1];
        const b = 255 - truthImageData[2];
        
        expect(workingImageData.data[0]).toEqual(truthImageData[0]);
        expect(workingImageData.data[1]).toEqual(Math.min(255, Math.max(0, g)));
        expect(workingImageData.data[2]).toEqual(Math.min(255, Math.max(0, b)));
        expect(workingImageData.data[3]).toEqual(truthImageData[3]);
    });
    
    test('filtering G alters R and B only', () => {
        FuzzyLogic.invert(workingImageData, Colors.green);
        const r = 255 - truthImageData[0];
        const b = 255 - truthImageData[2];
        
        expect(workingImageData.data[0]).toEqual(Math.min(255, Math.max(0, r)));
        expect(workingImageData.data[1]).toEqual(truthImageData[1]);
        expect(workingImageData.data[2]).toEqual(Math.min(255, Math.max(0, b)));
        expect(workingImageData.data[3]).toEqual(truthImageData[3]);
    });
    
    test('filtering B alters R and G only', () => {
        FuzzyLogic.invert(workingImageData, Colors.blue);
        const r = 255 - truthImageData[0];
        const g = 255 - truthImageData[1];
        
        expect(workingImageData.data[0]).toEqual(Math.min(255, Math.max(0, r)));
        expect(workingImageData.data[1]).toEqual(Math.min(255, Math.max(0, g)));
        expect(workingImageData.data[2]).toEqual(truthImageData[2]);
        expect(workingImageData.data[3]).toEqual(truthImageData[3]);
    });
    
    test('filtering none alters RGB', () => {
        FuzzyLogic.invert(workingImageData);
        const r = 255 - truthImageData[0];
        const g = 255 - truthImageData[1];
        const b = 255 - truthImageData[2];
        
        expect(workingImageData.data[0]).toEqual(Math.min(255, Math.max(0, r)));
        expect(workingImageData.data[1]).toEqual(Math.min(255, Math.max(0, g)));
        expect(workingImageData.data[2]).toEqual(Math.min(255, Math.max(0, b)));
        expect(workingImageData.data[3]).toEqual(truthImageData[3]);
    });
});

describe('greyscale tests', () => {
    test('greyscle sets all values equal', () => {
        FuzzyLogic.greyscale(workingImageData);
        expect(workingImageData.data[0]).toEqual(workingImageData.data[1]);
        expect(workingImageData.data[1]).toEqual(workingImageData.data[2]);
        expect(workingImageData.data[3]).toEqual(truthImageData[3]);
    });
});

describe('set and get pixel tests', () => {
    let twoPixelData = { };
    beforeEach(() => {
        twoPixelData.data = truthImageData.concat(truthImageData);
        twoPixelData.width = 2;
        twoPixelData.height = 1;
    });
    
    test('set pixel (0,0) to new pixel value', () => {
        const p = new Pixel(50, 50, 50, 255);        
        FuzzyLogic._setPixel(twoPixelData.data, 2, 0, 0, p);
        
        expect(twoPixelData.data[0]).toEqual(p.R());
        expect(twoPixelData.data[1]).toEqual(p.G());
        expect(twoPixelData.data[2]).toEqual(p.B());
        expect(twoPixelData.data[3]).toEqual(p.A());
        expect(twoPixelData.data[4]).toEqual(truthImageData[0]);
        expect(twoPixelData.data[5]).toEqual(truthImageData[1]);
        expect(twoPixelData.data[6]).toEqual(truthImageData[2]);
        expect(twoPixelData.data[7]).toEqual(truthImageData[3]);
    });
    
    test('set pixel (1,0) to new pixel value', () => {
        const p = new Pixel(50, 50, 50, 255);        
        FuzzyLogic._setPixel(twoPixelData.data, 2, 1, 0, p);
        
        expect(twoPixelData.data[0]).toEqual(truthImageData[0]);
        expect(twoPixelData.data[1]).toEqual(truthImageData[1]);
        expect(twoPixelData.data[2]).toEqual(truthImageData[2]);
        expect(twoPixelData.data[3]).toEqual(truthImageData[3]);
        expect(twoPixelData.data[4]).toEqual(p.R());
        expect(twoPixelData.data[5]).toEqual(p.G());
        expect(twoPixelData.data[6]).toEqual(p.B());
        expect(twoPixelData.data[7]).toEqual(p.A());
    });
    
    test('get pixel (0,0) returns the pixel', () => {
        const p = FuzzyLogic._getPixel(twoPixelData, 0, 0);
        
        expect(p.R()).toEqual(truthImageData[0]);
        expect(p.G()).toEqual(truthImageData[1]);
        expect(p.B()).toEqual(truthImageData[2]);
        expect(p.A()).toEqual(truthImageData[3]);
    });
    
    test('set pixel (1,0) and then get pixel (1,0) returns the newly set pixel', () => {
        const p = new Pixel(50, 50, 50, 255);        
        FuzzyLogic._setPixel(twoPixelData.data, 2, 1, 0, p);
        const updatedPixel = FuzzyLogic._getPixel(twoPixelData, 1, 0);
        
        expect(updatedPixel.R()).toEqual(p.R());
        expect(updatedPixel.G()).toEqual(p.G());
        expect(updatedPixel.B()).toEqual(p.B());
        expect(updatedPixel.A()).toEqual(p.A());
    });
});