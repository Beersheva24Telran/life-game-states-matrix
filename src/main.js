import './style.css';
import MatrixComponent from './components/MatrixComponent';
import configObj from './config/matrix-config.json'
const {rows, columns, interval} = configObj;
new MatrixComponent(rows, columns, document.querySelector(".grid"));

