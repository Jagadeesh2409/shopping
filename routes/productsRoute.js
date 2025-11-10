const express = require('express');
const router = express.Router();

const {createProduct,deleteProduct,getAllProducts,getProductById,updateProduct} = require('../controllers/productController');
const {productSchema,updateProductSchema } = require('../utils/validator');

const Validator = require('express-joi-validation').createValidator({});

router.get('/', getAllProducts);
router.post('/',Validator.body(productSchema) , createProduct);
router.get('/:id', getProductById);
router.put('/:id', Validator.body(updateProductSchema), updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
