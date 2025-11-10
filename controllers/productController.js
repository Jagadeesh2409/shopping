
const db = require('../db/db');
const { SucessResponse, ErrorResponse,response } = require('../utils/response');
const _ = require('lodash');


const getAllProducts = async (req, res) => {
    try {
        const products = await db('products').where({ is_deleted: false });
        return SucessResponse(res, products, response.GET_PRODUCTS_SUCCESS);
        
    } catch (error) {
        ErrorResponserorResponse(res, error, 500);
    }
};

const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        productData.slug = _.kebabCase(productData.name);
        const [newProductId] = await db('products').insert(productData);
        const newProduct = await db('products').where({ id: newProductId }).first();
        return SucessResponse(res, newProduct, response.PRODUCT_CREATED_SUCCESS);
    } catch (error) {
        ErrorResponse(res, response.PRODUCT_CREATED_FAILED, 500);
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const productData = req.body;
        await db('products').where({ id: productId }).update(productData);
        const updatedProduct = await db('products').where({ id: productId }).first();
        return SucessResponse(res, updatedProduct, response.PRODUCT_UPDATED_SUCCESS);
    } catch (error) {
        ErrorResponse(res, response.PRODUCT_UPDATED_FAILED, 500);

    }   
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        await db('products').where({ id: productId }).update({ is_deleted: true });
        return SucessResponse(res, null, response.PRODUCT_DELETED_SUCCESS);
    } catch (error) {
        ErrorResponse(res, response.PRODUCT_DELETED_FAILED, 500);
    }
};

const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await db('products').where({ id: productId, is_deleted: false}).first();
        if (!product) {
            return ErrorResponse(res, response.PRODUCT_NOT_FOUND, 404);
        }
        return SucessResponse(res, product, response.GET_PRODUCTS_SUCCESS);
    } catch (error) {
        ErrorResponse(res, response.GET_PRODUCTS_FAILED, 500);
    }
};


module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById
};