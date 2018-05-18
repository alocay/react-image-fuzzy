/**
 * Very simple pixel class
 */ 
class Pixel {
    /**
     * Pixel constructor
     * @param {red} The red integer value
     * @param {green} The green integer value
     * @param {blue} The blue integer value
     * @param {alpha} The alpha integer value
     */
    constructor(red, green, blue, alpha) {
        this.r = (red == null || typeof red !== 'number') ? 0 : Math.min(255, Math.max(0, red));
        this.g = (green == null || typeof green !== 'number') ? 0 : Math.min(255, Math.max(0, green));
        this.b = (blue == null || typeof blue !== 'number') ? 0 : Math.min(255, Math.max(0, blue));
        this.a = (alpha == null || typeof alpha !== 'number') ? 255 : Math.min(255, Math.max(0, alpha));
    }
    
    /**
     * Gets the red value
     * @returns {number} The red value
     */
    R() {
        return this.r;
    }
    
    /**
     * Gets the green value
     * @returns {number} The green value
     */
    G() {
        return this.g;
    }
    
    /**
     * Gets the blue value
     * @returns {number} The blue value
     */
    B() {
        return this.b;
    }
    
    /**
     * Gets the alpha value
     * @returns {number} The alpha value
     */
    A() {
        return this.a;
    }
}

export default Pixel;