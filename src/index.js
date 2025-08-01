/* eslint-disable no-magic-numbers */
import "./style.css";
import binaryTree from "./factories/tree.js";
import nodes from "./factories/node.js";

const binaryTree1 = binaryTree();

binaryTree1.processArray([5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);

console.log(binaryTree1.getRoot());

// binaryTree1.prettyPrint(binaryTree1.getRoot());

binaryTree1.insert(nodes(31));
// binaryTree1.insert(nodes(40));
// binaryTree1.insert(nodes(40));
// binaryTree1.insert(nodes(40));

// binaryTree1.prettyPrint(binaryTree1.getRoot());

binaryTree1.deleteItem(nodes(35));

binaryTree1.prettyPrint(binaryTree1.getRoot());

console.log(binaryTree1.find(103312132));
console.log(binaryTree1.find(20));

console.log("\n\nstart of BFS: ---------");
binaryTree1.levelOrderForEach((givenNode) => {
    console.log(givenNode.nodeValue);
});

console.log("\n\nstart of DFS(Inorder): ---------");
binaryTree1.inOrderForEach((givenNode) => {
    console.log(givenNode.nodeValue);
});

console.log("\n\nstart of DFS(Preorder): ---------");
binaryTree1.preOrderForEach((givenNode) => {
    console.log(givenNode.nodeValue);
});

console.log("\n\nstart of DFS(Postorder): ---------");
binaryTree1.postOrderForEach((givenNode) => {
    console.log(givenNode.nodeValue);
});

console.log(binaryTree1.height(31));

console.log(binaryTree1.depth(45));

console.log(binaryTree1.isBalanced());

binaryTree1.rebalance();

binaryTree1.prettyPrint(binaryTree1.getRoot());