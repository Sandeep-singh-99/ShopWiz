const Product = require("../models/product-model");
const NodeCache = require("node-cache");

const nodeCache = new NodeCache();

const addProduct = async (req, res) => {
  try {
    // Ensure the uploaded images are correctly processed into an array
    const productImages = req.files ? req.files.map((file) => file.path) : [];
    const cloudinaryIds = req.files
      ? req.files.map((file) => file.filename)
      : [];

    const {
      productName,
      productBrand,
      productPrice,
      salesPrice,
      productDescription,
      productCategory,
    } = req.body;

    const newProduct = await Product.create({
      productName,
      productBrand,
      productPrice,
      salesPrice,
      productDescription,
      productCategory,
      productImage: productImages, // Store array of image paths
      cloudinaryId: cloudinaryIds, // Store array of cloudinary ids
    });

    nodeCache.del("getProducts");

    res.status(201).json({
      message: "Product added successfully",
      success: true,
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const getProducts = async (req, res) => {
  try {
    let getProducts;

    if(nodeCache.has("getProducts")) {
      getProducts = JSON.parse(nodeCache.get("getProducts"));
    } else {
      getProducts = await Product.find();
      nodeCache.set("getProducts", JSON.stringify(getProducts));
    }

    res.status(200).json({
      message: "Products fetched successfully",
      success: true,
      data: getProducts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const delProduct = await Product.findByIdAndDelete(id);

    nodeCache.del("getProducts");

    res.status(200).json({
      message: "Product deleted successfully",
      success: true,
      data: delProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Handle file uploads for updating images
    const productImages = req.files ? req.files.map((file) => file.path) : [];
    const cloudinaryIds = req.files
      ? req.files.map((file) => file.filename)
      : [];

    const {
      productName,
      productBrand,
      productPrice,
      productDescription,
      productCategory,
    } = req.body;

    const updateFields = {
      productName,
      productBrand,
      productPrice,
      productDescription,
      productCategory,
    };

    // Only add images if they are uploaded
    if (productImages.length > 0) {
      updateFields.productImage = productImages;
      updateFields.cloudinaryId = cloudinaryIds;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedProduct) {
      //console.log("Product not found");
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    nodeCache.del("getProducts");

    res.status(200).json({
      message: "Product updated successfully",
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};


// const updateProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { productName, productPrice, salesPrice, productDescription, productBrand, productCategory } = req.body;
//     const productImages = req.files ? req.files.map((file) => file.path) : [];
//     const cloudinaryIds = req.files ? req.files.map((file) => file.filename) : [];

//     // Find the product by ID and update the fields
//     const updateData = {
//       productName,
//       productPrice,
//       salesPrice,
//       productDescription,
//       productBrand,
//       productCategory,
//     };
//     if (productImages.length > 0) updateData.productImage = productImages;
//     if (cloudinaryIds.length > 0) updateData.cloudinaryId = cloudinaryIds;
    
//     console.log('Updating Product Data:', updateData);
//     const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
//     console.log('Updated Product:', updatedProduct);

//     if (!updatedProduct) {
//       return res.status(404).json({
//         message: "Product not found",
//         success: false,
//       });
//     }

//     res.status(200).json({
//       message: "Product updated successfully",
//       success: true,
//       data: updatedProduct,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//       success: false,
//     });
//   }
// };


module.exports = {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
};
