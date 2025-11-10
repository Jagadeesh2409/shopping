const db = require('../db/db');
const {ErrorResponse,SucessResponse,response} = require('../utils/response');

const getAllUnits = async (req, res) => {
    try {
        const units = await db('units').where({ is_deleted: false });
    
        if (!units.length) {
            return SucessResponse(res, [], response.NO_UNITS_FOUND);
        }
        return SucessResponse(res, units, response.GET_UNITS_SUCCESS);
    } catch (error) {
        ErrorResponse(res, error, 500);
    }
};


const createUnit = async (req, res) => {
    try {
        const unitData = req.body;
        console.log(unitData);
        const [newUnitId] = await db('units').insert(unitData);
        const newUnit = await db('units').where({ id: newUnitId }).first();
        return SucessResponse(res, newUnit, response.UNITS_CREATED_SUCCESS);
    } catch (error) {
        console.error(error);
        if(error.code === 'SQLITE_CONSTRAINT' || error.code === 'ER_DUP_ENTRY'){
            return ErrorResponse(res, response.UNITS_ALREADY_EXISTS, 400);
        }
        ErrorResponse(res, response.PRODUCT_CREATED_FAILED, 500);
    }
};  

const updateUnit = async (req, res) => {
    try {
        const unitId = req.params.id;
        const unitData = req.body;
        await db('units').where({ id: unitId }).update(unitData);
        const updatedUnit = await db('units').where({ id: unitId }).first();
        return SucessResponse(res, updatedUnit, response.UNITS_UPDATED_SUCCESS);
    } catch (error) {
        ErrorResponse(res, response.UNITS_UPDATED_FAILED, 500);
                console.log(error);
    }
};

const deleteUnitById = async (req, res) => {
    try {
        const unitId = req.params.id;
        await db('units').where({ id: unitId }).update({ is_deleted: false });
        return SucessResponse(res, null, response.UNITS_DELETED_SUCCESS);
    }
    catch (error) {
        ErrorResponse(res, response.UNITS_DELETED_FAILED, 500);
    }   
};

const getUnitById = async (req, res) => {
    try {
        const unitId = req.params.id;
        const unit = await db('units').where({ id: unitId }).andWhere({is_deleted:false}).first();   
        if (!unit) {
            return SucessResponse(res, null, response.UNITS_NOT_FOUND);
        }
        return SucessResponse(res, unit, response.GET_UNITS_SUCCESS);
    } catch (error) {
        ErrorResponse(res, error, 500);
    }
};



module.exports = {
    createUnit,
    getAllUnits,
    deleteUnitById,
    updateUnit,
    getUnitById,
};