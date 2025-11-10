const db = require('../db/db')

const { ErrorResponse, SucessResponse, response } = require('../utils/response');

const getCartItems = async (req, res) => {
    const userId = req.user.userId
    try {
        const cartItems = await db('cart').where({ user_id: userId });
        return SucessResponse(res, cartItems, response.GET_CART_ITEMS_SUCCESS);
    }
    catch (error) {
        ErrorResponse(res, response.CART_ITEMS_GET_ERROR, 500);
    }
};

const addItemToCart = async (req, res) => {
    const userId = req.user.userId
    try {
        const itemData = req.body;
        itemData.user_id = userId;
        const [newItemId] = await db('cart').insert(itemData);
        const newItem = await db('cart').where({ id: newItemId }).first();
        return SucessResponse(res, newItem, response.CART_ITEM_ADDED_SUCCESS);
    } catch (error) {
        ErrorResponse(res, response.CART_ITEM_ADDED_FAILED, 500);
    }
};

const updateCartItem = async (req, res) => {
    const userId = req.user.userId
    try {
        const itemId = req.params.id;
        const itemData = req.body;
        await db('cart').where({ id: itemId, user_id: userId }).update(itemData);
        const updatedItem = await db('cart').where({ id: itemId }).first();
        return SucessResponse(res, updatedItem, response.CART_ITEM_UPDATED_SUCCESS);
    } catch (error) {
        ErrorResponse(res, response.CART_ITEM_UPDATED_FAILED, 500);
    }
};


const deleteCartItemById = async (req, res) => {
    const userId = req.user.userId
    try {
        const itemId = req.params.id;
        await db('cart').where({ id: itemId, user_id: userId }).del();
        return SucessResponse(res, null, response.CART_ITEM_DELETED_SUCCESS);
    }
    catch (error) {
        ErrorResponse(res, response.CART_ITEM_DELETED_FAILED, 500);
    }
};


module.exports = {
    getCartItems,
    addItemToCart,
    updateCartItem,
    deleteCartItemById
};

