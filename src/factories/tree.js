/* eslint-disable no-ternary */
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
        tempRoot.nodeLeft = buildTree(sortedArr, start, middlePoint - 1);

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

    // returns the root node of our entire binary search tree
    function getRoot() {
        return root;
    }

    // function from the odin project to visualize the binary search tree
    const prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node === null) {
            return;
        }
        if (node.nodeRight !== null) {
            prettyPrint(
                node.nodeRight,
                `${prefix}${isLeft ? "│   " : "    "}`,
                false,
            );
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.nodeValue}`);
        if (node.nodeLeft !== null) {
            prettyPrint(
                node.nodeLeft,
                `${prefix}${isLeft ? "    " : "│   "}`,
                true,
            );
        }
    };

    // inserts a node into the correct place within the binary search tree
    function insert(inputNode, currentRoot = root) {
        /*
        when inserting into a binary search tree with a new value/node, the main takeaway is 
        that the inserted node is always going to be a leaf of some other node. All we need to do 
        is traverse the tree traditionally (recursively) and keep going until we reach a null (a leaf location/empty location)
        */
        // stop whenever we get to an empty node. Return the input node as the new node to put
        if (currentRoot === null) {;
            return inputNode;
        }
        console.log(currentRoot);
        // start at the root and recursively travel down the tree based on if the inputNode's value is greater than or less than our root value

        // if the input node's value is greater than our current root value, then go right
        if (currentRoot.nodeValue <= inputNode.nodeValue) {
            currentRoot.nodeRight = insert(inputNode, currentRoot.nodeRight);
        } else {
            // otherwise, go left
            currentRoot.nodeLeft = insert(inputNode, currentRoot.nodeLeft);
        }

        // if we are still traversing the tree, then return the currentRoot location to keep the tree together after recusion
        return currentRoot;

    }

    // function deleteItem(value) {}

    return { processArray, getRoot, prettyPrint, insert };
}
