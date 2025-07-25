/* eslint-disable no-magic-numbers */
import "./style.css";
import binaryTree from "./factories/tree.js";
import nodes from "./factories/node.js";

const binaryTree1 = binaryTree();

binaryTree1.processArray([7, 3, 5, 3, 9, 1, 5, 10, 2, 9, 8]);

console.log(binaryTree1.getRoot());

binaryTree1.prettyPrint(binaryTree1.getRoot());

binaryTree1.insert(nodes(5));


console.log(binaryTree1.getRoot());

binaryTree1.prettyPrint(binaryTree1.getRoot());