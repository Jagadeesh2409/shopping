const db = require('../db/db');
const {ErrorResponse,SucessResponse,response} = require('../utils/response')


const getAllProductDiscounts = async (req, res) => {
    try {
        const discounts = await db('discounts').where({ is_active: 'true' });
        if (!discounts.length) {
            return SucessResponse(res, [], response.NO_PRODUCTS_FOUND);
        }
        return SucessResponse(res, discounts, response.GET_PRODUCTS_SUCCESS);
    } catch (error) {
        ErrorResponse(res, error, 500);
    }
};

const createProductDiscount = async (req, res) => {
    try {
        const discountData = req.body;
        const [newDiscountId] = await db('discounts').insert(discountData);
        const newDiscount = await db('discounts').where({ id: newDiscountId }).first();
        return SucessResponse(res, newDiscount, response.PRODUCT_CREATED_SUCCESS);
    } catch (error) {
        ErrorResponse(res, response.PRODUCT_CREATED_FAILED, 500);
    }
};


const updateProductDiscount = async (req, res) => {
    try {
        const discountId = req.params.id;   
        const discountData = req.body;
        await db('discounts').where({ id: discountId }).update(discountData);
        const updatedDiscount = await db('discounts').where({ id: discountId }).first();
        return SucessResponse(res, updatedDiscount, response.PRODUCT_UPDATED_SUCCESS);
    } catch (error) {
        ErrorResponse(res, response.PRODUCT_UPDATED_FAILED, 500);
    }
};

const deleteProductDiscount = async (req, res) => {
    try {
        const discountId = req.params.id;
        await db('discounts').where({ id: discountId }).update({ is_active: 'false' });
        return SucessResponse(res, null, response.PRODUCT_DELETED_SUCCESS);
    }
    catch (error) {
        ErrorResponse(res, response.PRODUCT_DELETED_FAILED, 500);
    }
};

module.exports = {
    getAllProductDiscounts,
    createProductDiscount,
    updateProductDiscount,
    deleteProductDiscount,
};