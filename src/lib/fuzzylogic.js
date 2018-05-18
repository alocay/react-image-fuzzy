import Pixel from './Pixel.js';

// Colors used for filtering
const Colors = {
    red: 'red',
    blue: 'blue',
    green: 'green'
};

// Various predefined convolution matrices used for effects 
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

/**
 * The main logic class for image processing
 */
class FuzzyLogic {
    
    /**
     * Applies a color filter
     * @param {object} imageData The image data object (from canvas context)
     * @param {string} color The color filter to apply
     */
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
    
    /**
     * Applies a invert filter with optional color
     * @param {object} imageData The image data object (from canvas context)
     * @param {string} color The color filter to apply
     */
    static invert(imageData, color) {
        for (var i = 0; i < imageData.data.length; i += 4) {
            var r, g, b;
            switch (color) {
                case Colors.red:
                    r = imageData.data[i];
                    g = 255 - imageData.data[i + 1];
                    b = 255 - imageData.data[i + 2];
                    break;
                case Colors.green:
                    r = 255 - imageData.data[i];
                    g = imageData.data[i + 1];
                    b = 255 - imageData.data[i + 2];
                    break;
                case Colors.blue:
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
    
    /**
     * Applies a greyscale filter
     * @param {object} imageData The image data object (from canvas context)
     */
    static greyscale(imageData) {
        for (var i = 0; i < imageData.data.length; i += 4) {
            var grey = 0.299 * imageData.data[i] + 0.587 * imageData.data[i + 1] + 0.114 * imageData.data[i + 2];
            imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = grey;
        }
    }
    
    /**
     * Applies a pixelation effect
     * @param {object} imageData The image data object (from canvas context)
     * @param {number} pixelSize The pixel size
     */
    static pixelate(imageData, pixelSize) {
        const width = imageData.width;
        const height = imageData.height;
        pixelSize = pixelSize <= 0 ? 1 : pixelSize;
        pixelSize = pixelSize >= width ? width - 1 : pixelSize;
        
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

                var pixel = this._getPixel(imageData, i + offsetx, j + offsety);
                
                for (var x = i; x < i + pixelSize && x < width; x++) {
                    for (var y = j; y < j + pixelSize && y < height; y++) {
                        this._setPixel(imageData.data, imageData.width, x, y, pixel);
                    }
                }
            }
        }
    }
    
    /**
     * Applies a box blur effect
     * @param {object} imageData The image data object (from canvas context)
     * @param {number} blurSize Strength of the blur
     */
    static boxBlur(imageData, blurSize) {
        const size = (!blurSize || typeof blurSize !== 'number' || blurSize < 0) ? 0 : blurSize;
        this._motionBlur(imageData, size, size);
    }
  
    /**
     * Applies a horizontal blur effect
     * @param {object} imageData The image data object (from canvas context)
     * @param {number} blur Strength of the blur
     */
    static horizontalBlur(imageData, blur) {
        const size = (!blur || typeof blur !== 'number' || blur < 0) ? 0 : blur;
        this._motionBlur(imageData, size, 1);
    }
    
    /**
     * Applies a vertical blur effect
     * @param {object} imageData The image data object (from canvas context)
     * @param {number} blur Strength of the blur
     */
    static verticalBlur(imageData, blur) {
        const size = (!blur || typeof blur !== 'number' || blur < 0) ? 0 : blur;
        this._motionBlur(imageData, 1, size);
    }
  
    /**
     * Applies a gaussian blur effect
     * @param {object} imageData The image data object (from canvas context)
     */
    static gaussianBlur(imageData) {
        this._convolution(imageData, Matrices.gaussianblur, 16);
    }
    
    /**
     * Applies an emboss effect
     * @param {object} imageData The image data object (from canvas context)
     */
    static emboss(imageData) {
        this._convolution(imageData, Matrices.emboss, 1);
    }
  
    /**
     * Applies a sharpen effect
     * @param {object} imageData The image data object (from canvas context)
     */
    static sharpen(imageData) {
        this._convolution(imageData, Matrices.sharpen, 1);
    }
  
    /**
     * Applies a luminosity effect
     * @param {object} imageData The image data object (from canvas context)
     * @param {number} value The amount to lighten or darken
     */
    static luminosity(imageData, value) {
        let matrix = Matrices.luminosity.slice(0);
        value = value && typeof value === 'number' ? value : 1;

        matrix[1][1] = value;

        this._convolution(imageData, matrix, 1);
    }
  
    /**
     * Applies a edge tracing effect
     * @param {object} imageData The image data object (from canvas context)
     */
    static edgetrace(imageData) {
        this._convolution(imageData, Matrices.edge, 1);
    }
  
    /**
     * Applies the provided convolution matrix and options
     * @param {object} imageData The image data object (from canvas context)
     * @param {object} parameters Object containing convolution matrix, divisor, and offset
     */
    static convolution(imageData, parameters) {        
        this._convolution(imageData, parameters.matrix, parameters.divisor, parameters.offset);
    }
    
    /*
     * Applies the convolution matrix
     * @param {object} imageData The image data object (from canvas context)
     * @param {array} matrix The 3x3 convolution matrix
     * @param {number} divisor The divisor value
     * @param {number} offset The offset value
     */
    static _convolution(imageData, matrix, divisor, offset) {
        if(!matrix || !(matrix instanceof Array) || matrix.length !== 3) {
            console.log("Convolution matrix should be 3x3 matrix");
            return;
        }

        let pixelBuffer = [];
        divisor = (!divisor || divisor < 1 || typeof divisor !== 'number') ? 1 : divisor;
        offset = (!offset || typeof offset !== 'number') ? 0 : offset;
        
        // Bug in IE11 when using let in for loop declaration https://bugs.chromium.org/p/v8/issues/detail?id=2560
        for (var x = 0; x < imageData.width; x++) {
            for (var y = 0; y < imageData.height; y++) {
                const pixel = this._getNeighborSum(imageData, x - 1, y - 1, matrix, divisor, offset);
                this._setPixel(pixelBuffer, imageData.width, x, y, pixel);
            }
        }
        
        // Place the buffer into the image data array
        for(var i = 0; i < pixelBuffer.length; i++) {
          imageData.data[i] = pixelBuffer[i];
        }
    }
    
    /*
     * Gets the pixel at the provided x, y coordinate
     * @param {object} imageData The image data object (from canvas context)
     * @param {number} x The x position
     * @param {number} y The y position
     * @returns {object} The pixel object
     */
    static _getPixel(imageData, x, y) {
        const index = (x + y * imageData.width) * 4;
        return new Pixel(
            imageData.data[index + 0],
            imageData.data[index + 1],
            imageData.data[index + 2],
            imageData.data[index + 3]
        );
    }
    
    /*
     * Sets the pixel at x,y of the pixel buffer with the values of given pixel 
     * @param {object} imageData The image data object (from canvas context)
     * @param {number} width The width of the img/canvas
     * @param {number} x The x position
     * @param {number} y The y position
     * @param {pixel} The pixel object
     */
    static _setPixel(pixelBuffer, width, x, y, pixel) {
        const index = (x + y * width) * 4;
        pixelBuffer[index + 0] = pixel.R();
        pixelBuffer[index + 1] = pixel.G();
        pixelBuffer[index + 2] = pixel.B();
        pixelBuffer[index + 3] = pixel.A();
    }
    
    /*
     * Gets the average pixel color in an area
     * @param {object} imageData The image data object (from canvas context)
     * @param {number} x The x position
     * @param {number} y The y position
     * @param {number} width The width of the img/canvas
     * @param {number} height The height of the img/canvas
     * @param {number} wSize The width of the area to average
     * @param {number} hSize The height of the area to average
     * @returns {object} The pixel object
     */
    static _getAvgPixel(imageData, x, y, width, height, wSize, hSize) {
        let avgR = 0;
        let avgG = 0;
        let avgB = 0;
        let pixelCount = 0;

        // Bug in IE11 when using let in for loop declaration https://bugs.chromium.org/p/v8/issues/detail?id=2560
        for(var i = x; i < x + wSize && i < width; i++) {
            for(var j = y; j < y + hSize && j < height; j++) {
                var p = this._getPixel(imageData, i, j);

                avgR += p.R();
                avgB += p.B();
                avgG += p.G();

                pixelCount++;
            }
        }

        avgR = (avgR / pixelCount) | 0;
        avgG = (avgG / pixelCount) | 0;
        avgB = (avgB / pixelCount) | 0;

        return new Pixel (avgR, avgB, avgG);
    }
    
    /*
     * Gets sum of neighboring pixel values
     * @param {object} imageData The image data object (from canvas context)
     * @param {number} x The x position
     * @param {number} y The y position
     * @param {array} matrix The 3x3 convolution matrix
     * @param {number} divisor The divisor value
     * @param {number} offset The offset value
     * @returns {object} The pixel object
     */
    static _getNeighborSum (imageData, x, y, matrix, divisor, offset) {
        let redSum = 0;
        let greenSum = 0;
        let blueSum = 0;
        
        // Bug in IE11 when using let in for loop declaration https://bugs.chromium.org/p/v8/issues/detail?id=2560
        for (var i = 0; i < matrix.length; i++, x++) {
            let yy = y;
            for (var j = 0; j < matrix.length; j++, yy++) {
                if(imageData.data[x] && imageData.data[yy]) {
                    const pixel = this._getPixel(imageData, x, yy);
                    redSum += pixel.R() * matrix[i][j];
                    greenSum += pixel.G() * matrix[i][j];
                    blueSum += pixel.B() * matrix[i][j];
                }
            }
        }

        const red = Math.min(255, Math.max(0, (redSum / divisor) + offset));
        const green = Math.min(255, Math.max(0, (greenSum / divisor) + offset));
        const blue = Math.min(255, Math.max(0, (blueSum / divisor) + offset));

        return new Pixel(red, green, blue);
    }
    
    /*
     * Applies a motion blur effect
     * @param {object} imageData The image data object (from canvas context)
     * @param {number} w The width of the blur
     * @param {number} h The height of the blur
     */
    static _motionBlur(imageData, w, h) {
        h = h < 0 ? 0 : h;
        w = w < 0 ? 0 : w;
        
        for (var i = 0; i < imageData.width; i++) {
            for (var j = 0; j < imageData.height; j++) {
                let avgPixel = this._getAvgPixel(imageData, i, j, imageData.width, imageData.height, w, h);

                for (var x = i; x < i + w && x < imageData.width; x++) {
                    for (var y = j; y < j + h && y < imageData.height; y++) {
                        avgPixel.a = this._getPixel(imageData, x, y).A();
                        this._setPixel(imageData.data, imageData.width, x, y, avgPixel);
                    }
                }
            }
        }
    }
}

export { Colors };
export default FuzzyLogic;