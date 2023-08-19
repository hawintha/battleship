const Ship = (l, name, isVertical) => {
    return {
        name: name,
        isVertical: isVertical,
        length: l,
        head: null,
        hits: 0,
        hit() {
            this.hits++;
        },
        hasSunk() {
            return this.hits === this.length;
        },
        setRandomAxis() {
            return this.isVertical = Math.random() < 0.5;
        }
    }
}
export { Ship };