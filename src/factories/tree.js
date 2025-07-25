/* eslint-disable no-magic-numbers */
import nodes from "./node.js";

export default function binaryTree() {
    let root;

    /*
    takes in an array of data and turns it into a balanced binary tree full of nodes.
    It also says to explicitly sort the array and remove any duplicate values to ensure tree building is as even as possible.
    */
    function buildTree(sortedArr, start, end) {
        // stop recursion once start > end
        if (start > end) {
            return null;
        }

        // calculate mid point of current array
        const middlePoint = Math.floor((start + end) / 2);

        // make the root the middle of the current Arr
        const tempRoot = nodes(sortedArr[middlePoint]);

        
        // calculate the middles and roots of the left and right nodes recursively
        // make left subtree
        tempRoot.nodeLeft = buildTree(sortedArr, start, middlePoint-1);

        // make the right subtree
        tempRoot.nodeRight = buildTree(sortedArr, middlePoint + 1, end);

        // once finished, return the root node and build the tree upwards
        return tempRoot;
    }

    // a function that sorts the array and removes any duplicate values before building balanced binary search tree
    function processArray(unprocessedArr) {
        // sort array and remove any duplicate values before building the balanced binary tree
        const tempArr = unprocessedArr
            .filter(
                (element, index) => unprocessedArr.indexOf(element) === index,
            )
            .sort((a, b) => a - b);
        console.log(tempArr);

        // build the balanced binary search tree, and assign the final root node to our root variable
        root = buildTree(tempArr, 0, tempArr.length - 1);
    }

    // returns the root attribute
    function getRoot() {
        return root;
    }

    return { processArray, getRoot };
}
