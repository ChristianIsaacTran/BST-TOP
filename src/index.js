/* eslint-disable no-magic-numbers */
import "./style.css";
import binaryTree from "./factories/tree.js";
import nodes from "./factories/node.js";

const binaryTree1 = binaryTree();

binaryTree1.processArray([5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);

console.log(binaryTree1.getRoot());

binaryTree1.prettyPrint(binaryTree1.getRoot());

binaryTree1.insert(nodes(40));

binaryTree1.prettyPrint(binaryTree1.getRoot());

binaryTree1.deleteItem(nodes(45));

binaryTree1.prettyPrint(binaryTree1.getRoot());

console.log(binaryTree1.find(103312132));
console.log(binaryTree1.find(20));