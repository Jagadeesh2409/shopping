const express = require('express');
const router = express.Router();

const {createCategory,deleteCategoryById,getAllCategories,getCategoryById,updateCategory} = require('../controllers/categoryController');
const {categorySchema,updateCategorySchema } = require('../utils/validator');


const Validator = require('express-joi-validation').createValidator({});

router.get('/', getAllCategories);
router.post('/',Validator.body(categorySchema) , createCategory);
router.get('/:id', getCategoryById);
router.put('/:id', Validator.body(updateCategorySchema), updateCategory);
router.delete('/:id', deleteCategoryById);

module.exports = router;