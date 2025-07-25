/* eslint-disable no-magic-numbers */
import "./style.css";
import binaryTree from "./factories/tree.js";
import nodes from "./factories/node.js";

const binaryTree1 = binaryTree();

binaryTree1.processArray([10, 20, 30, 100, 500]);

console.log(binaryTree1.getRoot());

binaryTree1.prettyPrint(binaryTree1.getRoot());

binaryTree1.insert(nodes(40));

console.log(binaryTree1.getRoot());

binaryTree1.prettyPrint(binaryTree1.getRoot());