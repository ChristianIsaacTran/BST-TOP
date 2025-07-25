/* eslint-disable no-magic-numbers */
import "./style.css";
import binaryTree from "./factories/tree.js";

const binaryTree1 = binaryTree();

binaryTree1.processArray([7, 3, 5, 3, 9, 1, 5, 10, 2, 9, 8]);

console.log(binaryTree1.getRoot())