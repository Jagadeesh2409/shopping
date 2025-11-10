const Joi = require('joi');


const unitSchema = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    abbreviation: Joi.string().max(10).required(),
});

const updateUnitSchema = Joi.object({
    name: Joi.string().min(1).max(50).optional(),
    abbreviation: Joi.string().max(10).optional(),
});

const productSchema = Joi.object({
    name: Joi.string().min(1).max(100).required(),
    description: Joi.string().max(500).optional(),
    original_price: Joi.number().precision(2).positive().required(),
    mrp: Joi.number().precision(2).positive().required(),
    selling_price: Joi.number().precision(2).positive().required(),
    details: Joi.object().optional(),
    brand: Joi.string().max(100).required(),
    category_id: Joi.number().integer().required(),
    unit_id: Joi.number().integer().required(),
    image_url: Joi.string().uri().optional(),
    stock: Joi.number().integer().min(0).required(),
});

const updateProductSchema = Joi.object({
    name: Joi.string().min(1).max(100).optional(),
    description: Joi.string().max(500).optional(),
    original_price: Joi.number().precision(2).positive().optional(),
    mrp: Joi.number().precision(2).positive().optional(),
    selling_price: Joi.number().precision(2).positive().optional(),
    details: Joi.object().optional(),
    brand: Joi.string().max(100).optional(),
    category_id: Joi.number().integer().optional(),
    unit_id: Joi.number().integer().optional(),
    image_url: Joi.string().uri().optional(),
    stock: Joi.number().integer().min(0).optional(),
}); 

const categorySchema = Joi.object({
    name: Joi.string().min(1).max(100).required(),
    description: Joi.string().max(500).optional(),
});

const updateCategorySchema = Joi.object({
    name: Joi.string().min(1).max(100).optional(),
    description: Joi.string().max(500).optional(),
});

const discountSchema = Joi.object({
    product_id: Joi.number().integer().required(),
    discount_type: Joi.string().valid('percentage', 'flat').required(),
    percentage: Joi.when('discount_type', {
        is: 'percentage',
        then: Joi.number().positive().max(100).required(),
        otherwise: Joi.forbidden(),
    }),
    flat_amount: Joi.when('discount_type', {
        is: 'flat',
        then: Joi.number().positive().required(),
        otherwise: Joi.forbidden(),
    }),
    used_count: Joi.number().integer().min(0).optional(),
    min_purchase_amount: Joi.number().precision(2).positive().optional(),
    max_purchase_amount: Joi.number().precision(2).positive().optional(),
});

const updateDiscountSchema = Joi.object({
    product_id: Joi.number().integer().optional(),
    discount_type: Joi.string().valid('percentage', 'flat').optional(),
    percentage: Joi.when('discount_type', {
        is: 'percentage',
        then: Joi.number().positive().max(100).required(),
        otherwise: Joi.forbidden(),
    }),
    flat_amount: Joi.when('discount_type', {
        is: 'flat',
        then: Joi.number().positive().required(),
        otherwise: Joi.forbidden(),
    }),
    used_count: Joi.number().integer().min(0).optional(),
    min_purchase_amount: Joi.number().precision(2).positive().optional(),
    max_purchase_amount: Joi.number().precision(2).positive().optional(),
});

module.exports = {
    unitSchema,
    updateUnitSchema,
    productSchema,
    updateProductSchema,
    categorySchema,
    updateCategorySchema,
    discountSchema,
    updateDiscountSchema
};