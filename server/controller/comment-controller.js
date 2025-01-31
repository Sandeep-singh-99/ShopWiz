const Comment = require("../models/comment-models");
const NodeCache = require("node-cache");
const nodeCache = new NodeCache();
const addComment = async (req, res) => {
    try {
      const { productId, comment } = req?.body;
      const currentUser = req.user.id;
  
      if (!currentUser) {
        return res.status(401).json({ message: "Unauthorized", success: false });
      }
  
      const isAlreadyComment = await Comment.findOne({
        productId,
        userId: currentUser,
      });
  
      if (isAlreadyComment) {
        return res.status(400).json({
          message: "You have already commented on this product",
          success: false,
        });
      }
  
      const payload = {
        productId,
        userId: currentUser,
        comment,
      };
      console.log("comment Payload: ", payload);
  
      const newComment = await Comment.create(payload);
  
     
  
      res.status(200).json({
        message: "Comment added successfully",
        success: true,
        data: newComment,
      });
    } catch (error) {
      res.status(500).json({ message: error.message, success: false });
    }
  };
  

const viewComment = async (req, res) => {
  try {
    const { productId } = req.params; // Extract from req.params, not req.body
    let comments;

    console.log("Received productId:", productId); // Debugging log

    if (!productId) {
      return res
        .status(400)
        .json({ message: "Product ID is required", success: false });
    }

   
      comments = await Comment.find({ productId }).populate(
        "userId",
        "username imageUrl"
      );
      
    

    if (!comments || comments.length === 0) {
      return res
        .status(404)
        .json({
          message: "No comments found for this product",
          success: false,
        });
    }

    res.status(200).json({
      message: "Comments fetched successfully",
      success: true,
      data: comments,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res
      .status(500)
      .json({
        message: "An error occurred while fetching comments",
        success: false,
      });
  }
};

module.exports = { addComment, viewComment };
