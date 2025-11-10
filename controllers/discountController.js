const db = require ('../db/db');
const {ErrorResponse,SucessResponse,response} = require('../utils/response');


const getAllDiscounts = async (req, res) => {
    try {
        const discounts = await db('discounts').where({ is_deleted: false });   
        return SucessResponse(res, discounts, response.GET_DISCOUNTS_SUCCESS);
    } catch (error) {
        ErrorResponse(res, error, 500);
    }
}
const createDiscount = async (req, res) => {
    try {
        const discountData = req.body;  
        const [newDiscountId] = await db('discounts').insert(discountData);
        const newDiscount = await db('discounts').where({ id: newDiscountId }).first();
        return SucessResponse(res, newDiscount, response.DISCOUNT_CREATED_SUCCESS);
    } catch (error) {
        ErrorResponse(res, response.DISCOUNT_CREATED_FAILED, 500);
    }
};
const updateDiscount = async (req, res) => {
    try {
        const discountId = req.params.id;
        const discountData = req.body;
        await db('discounts').where({ id: discountId }).update(discountData);
        const updatedDiscount = await db('discounts').where({ id: discountId }).first();
        return SucessResponse(res, updatedDiscount, response.DISCOUNT_UPDATED_SUCCESS);
    } catch (error) {
        ErrorResponse(res, response.DISCOUNT_UPDATED_FAILED, 500);
    }
};
const deleteDiscountById = async (req, res) => {
    try {
        const discountId = req.params.id;
        await db('discounts').where({ id: discountId }).update({ is_deleted: true });
        return SucessResponse(res, null, response.DISCOUNT_DELETED_SUCCESS);
    } catch (error) {
        ErrorResponse(res, response.DISCOUNT_DELETED_FAILED, 500);
    }
};
const getDiscountById = async (req, res) => {
    try {
        const discountId = req.params.id;
        const discount = await db('discounts').where({ id: discountId, is_deleted: false}).first();
        if (!discount) {
            return ErrorResponse(res, response.DISCOUNT_NOT_FOUND, 404);
        }
        return SucessResponse(res, discount, response.GET_DISCOUNTS_SUCCESS);
    } catch (error) {
        ErrorResponse(res, error, 500);
    }
};
module.exports = {
    getAllDiscounts,
    createDiscount,
    updateDiscount,
    deleteDiscountById,
    getDiscountById
};