# Balanced binary search tree assignment
This project is to make the binary search tree data structure (balanced). Binary search tree's idea is 
that any value that is less than the root value goes to the left, and any other value that is greater 
than the root value goes on the right side.

# What makes a binary tree "balanced"? 
The binary tree is considered to be balanced if the height of the tree on both sides is at most 1. 
If either side differs by 2 or more, it is considered unbalanced.

ex:
(balanced binary search tree)
left subtree height: 1
right subtree height: 2     
difference between heights is 1, so balanced. 
     A
    / \
   C    B 
         \
          D

(unbalanced binary search tree)
left subtree height: 0
right subtree height: 2
difference between heights is 2, so unbalanced.
    A
     \
      B
       \
        C

# one pattern that should be recognized in balanced binary search trees: 
When making a balanced binary search tree off of a sorted array, you would notice that 
each root node in the binary search tree is the middle of the array. Same thing with the 
left and right subtrees, they have root nodes that are the middle indexes.

# pseudocode for recursive binary search balanced tree:
1. initialize a start and an end variable
2. find the middle of the array based on start and end variables, mid = (start + end) / 2
3. recursively find the left side of the array's middle, and make that the left side of the root node (middle - 1)
4. recursively find the right side of the array's middle, and make that the right side of the root node (middle + 1)

ex: 
given a sorted array to make a balanced binary search tree:
[1, 2, 3, 4, 5, 6, 7]

find middle and make it into a root node (found middle, its 4)
[1, 2, 3, {4}, 5, 6, 7]
    4

find left side of the array middle (found middle of left side, its 2)
[ (1, {2}, 3), 4, 5, 6, 7 ]
    4
   /
  2

and so on...

