const Ship = (l, name) => {
    return {
        length: l,
        name: name,
        hits: 0,
        hit() {
            this.hits++;
        },
        hasSunk() {
            return this.hits === this.length;
        }
    }
}
export { Ship };