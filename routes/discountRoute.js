const express = require('express');
const router = express.Router();

const {createDiscount,deleteDiscountById,getAllDiscounts,getDiscountById,updateDiscount} = require('../controllers/discountController');
const {discountSchema ,updateDiscountSchema} = require('../utils/validator');
const validator = require('express-joi-validation').createValidator({})


router.get('/', getAllDiscounts);
router.post('/',validator.body(discountSchema) , createDiscount);
router.get('/:id', getDiscountById);
router.put('/:id', validator.body(updateDiscountSchema), updateDiscount);
router.delete('/:id', deleteDiscountById);


module.exports = router;
