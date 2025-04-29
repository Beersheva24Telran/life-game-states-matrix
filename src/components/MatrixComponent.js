export default class MatrixComponent {
    #matrix
    #matrixStates
    #matrixElem
    constructor(rows, columns, matrixElem, matrixStates, interval=1000) {
       matrixElem.style.setProperty("grid-template-columns", `repeat(${columns}, 1fr)`);
       matrixElem.style.setProperty("grid-template-rows", `repeat(${rows}, 1fr)`);
       this.#matrixStates = matrixStates;
       this.#matrixElem = matrixElem;
       this.#initialMatrixCreate(rows, columns);

    }
    #initialMatrixCreate(rows, columns){
        const matrixObj = this.#matrixStates.createRandomMatrix(rows, columns).flatMap(a => a);
        this.#matrixElem.innerHTML = getHtmlFromMatrixObj(matrixObj);

    }
   
}
function getHtmlFromMatrixObj(matrixObj) {
    const res = matrixObj.map(n => `<div class="${`cell ${n ? "cell-alive" : "cell-dead"}`}" ></div>`);
    return res.join("");
}