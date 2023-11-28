 // Binary Search Tree visualization logic
    
    // TreeNode class
    function TreeNode(value) {
        this.value = value;
        this.left = null;
        this.right = null;
      }
      
      // Function to build the binary search tree from given traversal orders
      function buildBST(inorder, preorder, postorder) {
        // Convert traversal strings to arrays
        var inorderArr = inorder.split(' ').map(Number);
        var preorderArr = preorder.split(' ').map(Number);
        var postorderArr = postorder.split(' ').map(Number);
        
        // Recursive function to build the tree
        function buildTree(inStart, inEnd, preStart, preEnd, postStart, postEnd) {
          if (inStart > inEnd || preStart > preEnd || postStart > postEnd) {
            return null;
          }
          
          // Create the root node
          var rootValue = preorderArr[preStart];
          var rootNode = new TreeNode(rootValue);
          
          if (preStart === preEnd || postStart === postEnd) {
            return rootNode;
          }
          
          // Find the root index in the inorder traversal
          var rootIndex;
          for (var i = inStart; i <= inEnd; i++) {
            if (inorderArr[i] === rootValue) {
              rootIndex = i;
              break;
            }
          }
          
          // Calculate the sizes of left and right subtrees
          var leftSize = rootIndex - inStart;
          var rightSize = inEnd - rootIndex;
          
          // Build the left and right subtrees recursively
          rootNode.left = buildTree(inStart, rootIndex - 1, preStart + 1, preStart + leftSize, postStart, postStart + leftSize - 1);
          rootNode.right = buildTree(rootIndex + 1, inEnd, preEnd - rightSize + 1, preEnd, postEnd - rightSize, postEnd - 1);
          
          return rootNode;
        }
        
        // Build the binary search tree starting from the root
        var root = buildTree(0, inorderArr.length - 1, 0, preorderArr.length - 1, 0, postorderArr.length - 1);
        
        return root;
      }
      
      // Function to draw the binary search tree using the canvas element
      function drawBST(root) {
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");
        var startX = canvas.width / 2;
        var startY = 50;
        
        var nodeRadius = 20;
        var levelHeight = 60;
             var levelWidth = Math.pow(2, getTreeHeight(root)) * nodeRadius * 2;
        
        // Function to get the height of the tree
        function getTreeHeight(node) {
          if (node === null) {
            return 0;
          }
          
          var leftHeight = getTreeHeight(node.left);
          var rightHeight = getTreeHeight(node.right);
          
          return Math.max(leftHeight, rightHeight) + 1;
        }
        
        // Function to draw a binary tree node
        function drawNode(node, x, y) {
          context.beginPath();
          context.arc(x, y, nodeRadius, 0, 2 * Math.PI);
          context.stroke();
          context.closePath();
          context.fillText(node.value.toString(), x - nodeRadius / 2, y + nodeRadius / 2);
        }
        
        // Function to draw an edge between two nodes
        function drawEdge(x1, y1, x2, y2) {
          context.beginPath();
          context.moveTo(x1, y1);
          context.lineTo(x2, y2);
          context.stroke();
          context.closePath();
        }
        
        // Recursive function to draw the binary search tree
        function drawTree(node, x, y, level) {
          if (node === null) {
            return;
          }
          
          // Draw the current node
          drawNode(node, x, y);
          
          // Calculate the x-coordinates for left and right children
          var leftX = x - levelWidth / Math.pow(2, level + 1);
          var rightX = x + levelWidth / Math.pow(2, level + 1);
          
          // Calculate the y-coordinate for children
          var childY = y + levelHeight;
          
          // Draw edges and recursively draw left and right subtrees
          if (node.left) {
            drawEdge(x, y + nodeRadius, leftX, childY);
            drawTree(node.left, leftX, childY, level + 1);
          }
          
          if (node.right) {
            drawEdge(x, y + nodeRadius, rightX, childY);
            drawTree(node.right, rightX, childY, level + 1);
          }
        }
        
        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw the binary search tree starting from the root
        drawTree(root, startX, startY, 0);
      }
        function visualizeTree() {
      var inorder = document.getElementById("inorderInput").value;
      var preorder = document.getElementById("preorderInput").value;
      var postorder = document.getElementById("postorderInput").value;
      
      // Build the binary search tree
      var root = buildBST(inorder, preorder, postorder);
      
      // Draw the binary search tree on the canvas
      drawBST(root);
    }