const Ship = (l) => {
    return {
        length: l,
        hits: 0,
        hit() {
            this.hits++;
        },
        hasSunk() {
            if (this.hits === this.length) return true;
            else return false;
        }
    }
}
export { Ship };