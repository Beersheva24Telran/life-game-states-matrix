export default class MatrixStates {
  #_matrix;
  constructor(matrix) {
    this.#_matrix = matrix ?? [];
  }
  createRandomMatrix(rows, columns) {
    this.#_matrix = Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => Math.floor(Math.random() * 2))
    );
    return this.#_matrix;
  }
  next(){
    this.#_matrix = this.#_matrix.map((row, rIndex) => this.#newRow(row, rIndex));
    return this.#_matrix;
  }
  #newRow(row, rIndex) {
    return row.map((cell, cIndex) => this.#newCell(cell, rIndex, cIndex));
  }
  #newCell(cell, rIndex, cIndex) {
    this.#_matrix[rIndex][ cIndex] = 0; //not to count for neighbors
    const neighbors = this.#getNeighborsArea(rIndex, cIndex);
    const sumNeighbors = neighbors.flatMap(a => a).reduce((sum, cur) => sum + cur);
    const res = cell ? forPopulated(sumNeighbors) : forUnpopulated(sumNeighbors);
    this.#_matrix[rIndex] [cIndex] = cell; //restoring the current cell
    return res;

  }
  #getNeighborsArea(rIndex, cIndex){
   
    const startIndex = cIndex === 0 ? cIndex : cIndex -1;
    const endIndex = cIndex === this.#_matrix[0].length - 1 ? cIndex + 1 : cIndex + 2;
    return [rIndex - 1, rIndex, rIndex + 1].map(i => this.#_matrix[i] ?
         this.#_matrix[i].slice(startIndex, endIndex) : [0]);
  }
}
function forPopulated(sumNeighbors) {
    return +(sumNeighbors === 2 || sumNeighbors === 3);
}
function forUnpopulated(sumNeighbors) {
    return +(sumNeighbors === 3);
}