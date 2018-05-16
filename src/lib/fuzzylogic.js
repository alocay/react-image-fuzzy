import Pixel from './Pixel.js';

const Colors = {
    red: 'red',
    blue: 'blue',
    green: 'green'
};

const Matrices = {
    emboss: [
        [-2, -1, 0],
        [-1,  1, 1],
        [ 0,  1, 2]
    ],
    edge: [
        [0,  1, 0],
        [1, -4, 1],
        [0,  1, 0]
    ],
    luminosity: [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
    ],
    gaussianblur: [
        [1, 2, 1],
        [2, 4, 2],
        [1, 2, 1]
    ],
    lighten: [
        [0,   0,   0],
        [0, 1.5,   0],
        [0,   0,   0]
    ],
    darken: [
        [0,    0, 0],
        [0, 0.66, 0],
        [0,    0, 0]
    ],
    sharpen: [
        [    0, -0.33,     0],
        [-0.33,  2.33, -0.33],
        [    0, -0.33,     0]
    ]
};

class FuzzyLogic {    
    static colorFilter(imageData, color) {
        for (var i = 0; i < imageData.data.length; i += 4) {
            // simply set the pixels not related to the specified color to 0
            switch (color) {
                case Colors.red:
                    imageData.data[i + 1] = 0;
                    imageData.data[i + 2] = 0;
                break;
                case Colors.green:
                    imageData.data[i] = 0;
                    imageData.data[i + 2] = 0;
                break;
                case Colors.blue:
                    imageData.data[i] = 0;
                    imageData.data[i + 1] = 0;
                break;
            }
        }
    }
    
    static invert(imageData, color) {
        for (var i = 0; i < imageData.data.length; i += 4) {
            var r, g, b;
            switch (color) {
                case 'red':
                    r = imageData.data[i];
                    g = 255 - imageData.data[i + 1];
                    b = 255 - imageData.data[i + 2];
                    break;
                case 'green':
                    r = 255 - imageData.data[i];
                    g = imageData.data[i + 1];
                    b = 255 - imageData.data[i + 2];
                    break;
                case 'blue':
                    r = 255 - imageData.data[i];
                    g = 255 - imageData.data[i + 1];
                    b = imageData.data[i + 2];
                    break;
                default:
                    r = 255 - imageData.data[i];
                    g = 255 - imageData.data[i + 1];
                    b = 255 - imageData.data[i + 2];
                    break;
            }

            imageData.data[i] = Math.min(255, Math.max(0, r));
            imageData.data[i + 1] = Math.min(255, Math.max(0, g));
            imageData.data[i + 2] = Math.min(255, Math.max(0, b));
        }
    }
    
    static greyscale(imageData) {
        for (var i = 0; i < imageData.data.length; i += 4) {
            var grey = 0.299 * imageData.data[i] + 0.587 * imageData.data[i + 1] + 0.114 * imageData.data[i + 2];
            imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = grey;
        }
    }
    
    static pixelate(imageData, pixelSize, width, height) {
        pixelSize = pixelSize <= 0 ? 1 : pixelSize;
        pixelSize = pixelSize >= width ? width - 1 : pixelSize;

        console.log(pixelSize);
        
        for (var i = 0; i < width; i += pixelSize) {
            for (var j = 0; j < height; j += pixelSize) {
                var offsetx = (pixelSize / 2) | 0;
                var offsety = (pixelSize / 2) | 0;

                while (i + offsetx >= width) {
                    offsetx--;
                }

                while (j + offsety >= height) {
                    offsety--;
                }

                var pixel = this.getPixel(imageData, i + offsetx, j + offsety);
                
                for (var x = i; x < i + pixelSize && x < width; x++) {
                    for (var y = j; y < j + pixelSize && y < height; y++) {
                        this.setPixel(imageData, x, y, pixel);
                    }
                }
            }
        }
    }
    
    static getPixel(imageData, x, y) {
        var index = (x + y * imageData.width) * 4;
        
        const p = new Pixel(
            imageData.data[index + 0],
            imageData.data[index + 1],
            imageData.data[index + 2],
            imageData.data[index + 3]
        );
        
        return p;
    }
    
    static setPixel(imageData, x, y, pixel) {
        var index;
        
        index = (x + y * imageData.width) * 4;
        imageData.data[index + 0] = pixel.R();
        imageData.data[index + 1] = pixel.G();
        imageData.data[index + 2] = pixel.B();
        imageData.data[index + 3] = pixel.A();
    }
}

export default FuzzyLogic;