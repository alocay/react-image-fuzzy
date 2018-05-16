class Pixel {    
    constructor(red, green, blue, alpha) {
        this.r = (!red || typeof red !== 'number') ? 0 : Math.min(255, Math.max(0, red));
        this.g = (!green || typeof green !== 'number') ? 0 : Math.min(255, Math.max(0, green));
        this.b = (!blue || typeof blue !== 'number') ? 0 : Math.min(255, Math.max(0, blue));
        this.a = (!alpha || typeof alpha !== 'number') ? 255 : Math.min(255, Math.max(0, alpha));
    }
    
    R() {
        return this.r;
    }
    
    G() {
        return this.g;
    }
    
    B() {
        return this.b;
    }
    
    A() {
        return this.a;
    }
}

export default Pixel;