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
        note: since this is not an AVL tree, I do NOT have to rebalance it after inserting/deleting
        */
        // stop whenever we get to an empty node. Return the input node as the new node to put
        if (currentRoot === null) {
            return inputNode;
        }
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

    // deletes a node from the binary search tree
    function deleteItem(inputNode, currentRoot = root) {
        /*
        3 Scenarios to deleting an item in binary search tree:
        1. delete a leaf node (a node with no children)
        2. deleting a node with 1 child in it
        3. deleteing a node with 2 children in it
        */

        // basecase: stop when we found the node we want to delete
        if (inputNode.nodeValue === currentRoot.nodeValue) {
            console.log("MATCH FOUND");
            // scenario 1
            if (
                currentRoot.nodeLeft === null &&
                currentRoot.nodeRight === null
            ) {
                return null;
            } else if (
                currentRoot.nodeLeft !== null &&
                currentRoot.nodeRight === null
            ) {
                // scenario 2: if the left node is the child

                return currentRoot.nodeLeft;
            } else if (
                currentRoot.nodeLeft === null &&
                currentRoot.nodeRight !== null
            ) {
                // scenario 2: if the right node is the child
                return currentRoot.nodeRight;
            }
            // scenario 3
            const inorderSuccessor = findInorderSuccessor(currentRoot);
            currentRoot.nodeValue = inorderSuccessor.nodeValue;
            // if the inorder successor has a right child, then append it to the currentRoot
            if (inorderSuccessor.nodeRight !== null) {
                currentRoot.nodeRight = inorderSuccessor.nodeRight;
            }
            return currentRoot;
        }

        console.log(currentRoot);

        // if the input node's value is greater than our current root value, then go right
        if (currentRoot.nodeValue <= inputNode.nodeValue) {
            currentRoot.nodeRight = deleteItem(
                inputNode,
                currentRoot.nodeRight,
            );
        } else {
            // otherwise, go left
            currentRoot.nodeLeft = deleteItem(inputNode, currentRoot.nodeLeft);
        }

        return currentRoot;
    }

    // finds the inorder successor of the binary search tree and returns the node
    function findInorderSuccessor(currentNode) {
        // traverse to the right subtree
        let tempNode = currentNode.nodeRight;

        // iterate until the leftmost node in the right subtree, that is going to be our lowest out of the right subtree.
        while (tempNode !== null && tempNode.nodeLeft !== null) {
            tempNode = tempNode.nodeLeft;
        }

        return tempNode;
    }

    // find(value) returns a node with the given value
    function find(givenValue, currentRoot = root) {
        let foundNode;

        // if the node is not found, return null
        if (currentRoot === null) {
            console.log("node not found: find(). Returning null...");
            return null;
        }

        // basecase: stop when we found the node we want to delete
        if (givenValue === currentRoot.nodeValue) {
            console.log("MATCH FOUND");
            return currentRoot;
        }

        // if the value is greater than our current root value, then go right
        if (currentRoot.nodeValue <= givenValue) {
            foundNode = find(givenValue, currentRoot.nodeRight);
        } else {
            // otherwise, go left
            foundNode = find(givenValue, currentRoot.nodeLeft);
        }

        return foundNode;
    }

    // traverses the binary search tree in BFS style (breadth first level search)
    function levelOrderForEach(callbackFunc) {
        // design this like .forEach() where you pass a callback.
        // callbackFunction in this case is used to process the current node we are on. Gives the user the choice on how to process the current node.
        try {
            if (callbackFunc === null || callbackFunc === undefined) {
                throw new Error(
                    "Callback not provided. Callback function is required in function call.",
                );
            }

            // level order traversal (BFS) requires a queue
            const queue = [];

            // start with the root of the tree and traverse it's left and right children.
            // if the current node has children, visit the current node and enqueue children.
            queue.push(root);

            while(queue.length > 0) {
                // get the first node from the queue (FIFO)
                const curr = queue[0]; 
                
                // use callback on the currentNode we want to process
                callbackFunc(curr);

                // enqueue children if it exists
                if(curr.nodeLeft !== null) {
                    queue.push(curr.nodeLeft);
                }
                
                if(curr.nodeRight !== null) {
                    queue.push(curr.nodeRight);
                }

                // remove node from queue after processing
                queue.shift();

            }
        } catch (error) {
            console.log(error);
        }
    }

    return {
        processArray,
        getRoot,
        prettyPrint,
        insert,
        deleteItem,
        find,
        levelOrderForEach,
    };
}
