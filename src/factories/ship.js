const Ship = (l, name, isVertical) => {
    return {
        name: name,
        isVertical: isVertical,
        length: l,
        head: null,
        coordinates: [],
        hits: [],
        hit(index) {
            this.hits.push(index);
        },
        hasSunk() {
            return this.hits.length === this.length;
        },
        setRandomAxis() {
            return this.isVertical = Math.random() < 0.5;
        }
    }
}
export { Ship };