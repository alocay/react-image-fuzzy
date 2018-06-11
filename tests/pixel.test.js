import Pixel from '../src/lib/pixel.js';

test('creates a pixel object', () => {
    expect(new Pixel(10, 10, 10, 1)).not.toBeNull();
});

test('holds provided color values', () => {
    const red = 100;
    const green = 50;
    const blue = 25;
    const alpha = 1;
    const p = new Pixel(red, green, blue, alpha);
    
    expect(p.R()).toEqual(red);
    expect(p.G()).toEqual(green);
    expect(p.B()).toEqual(blue);
    expect(p.A()).toEqual(alpha);
});

test('contrains color values between 0-255', () => {
    const red = 100;
    const green = 300;
    const blue = -25;
    const alpha = 1;
    const p = new Pixel(red, green, blue, alpha);
    
    expect(p.G()).toEqual(255);
    expect(p.B()).toEqual(0);
});

test('contrains alpha values between 0-255', () => {
    const red = 100;
    const green = 100;
    const blue = 100;
    const highAlpha= 400;
    const lowAlpha = -1;
    const alphaHigh = new Pixel(red, green, blue, highAlpha);
    const alphaLow = new Pixel(red, green, blue, lowAlpha);
    
    expect(alphaHigh.A()).toEqual(255);
    expect(alphaLow.A()).toEqual(0);
});

test('non-numeric colors default to 0', () => {
    const red = 'a';
    const green = 100;
    const blue = 100;
    const alpha= 1;
    const p = new Pixel(red, green, blue, alpha);
    
    expect(p.R()).toEqual(0);
});

test('non-numeric alpha default to 255', () => {
    const red = 100;
    const green = 100;
    const blue = 100;
    const alpha= 'a';
    const p = new Pixel(red, green, blue, alpha);
    
    expect(p.A()).toEqual(255);
});