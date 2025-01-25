const Comment = require("../models/comment-models");

const addComment = async (req, res) => {
    try {
        const { productId, comment } = req?.body;
        const currentUser = req.user.id;

        if (!currentUser) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }

        const isAlreadyComment = await Comment.findOne({ productId, userId: currentUser });

        if (isAlreadyComment) {
            return res.status(400).json({ message: "You have already commented on this product", success: false });
        }

        // const payload = {
        //     productId: productId,
        //     userId: currentUser,
        //     comment: req.body,
        // }

        const payload = {
            productId,
            userId: currentUser,
            comment, // Use the extracted comment string
        };
        console.log("comment Payload: ", payload);

        const newComment = await Comment.create(payload)

        res.status(200).json({
            message: "Comment added successfully",
            success: true,
            data: newComment
        })
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

const viewComment = async (req, res) => {
    try {
        const { productId } = req.body;

        // Validate productId
        if (!productId) {
            return res.status(400).json({ message: "Product ID is required", success: false });
        }

        // Fetch comments for the product and populate user details
        const comments = await Comment.find({ productId })
            .populate("userId", "username imageUrl");

        // Check if comments exist
        if (!comments || comments.length === 0) {
            return res.status(404).json({ message: "No comments found for this product", success: false });
        }

        // Return the comments
        res.status(200).json({
            message: "Comments fetched successfully",
            success: true,
            data: comments,
        });
    } catch (error) {
        // Handle unexpected errors
        console.error("Error fetching comments:", error);
        res.status(500).json({ message: "An error occurred while fetching comments", success: false });
    }
};


module.exports = { addComment, viewComment }