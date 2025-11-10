const express = require('express');
const router = express.Router();

const {createUnit,deleteUnitById,getAllUnits,getUnitById,updateUnit} = require('../controllers/unitController');
const {unitSchema ,updateUnitSchema} = require('../utils/validator');

const validator = require('express-joi-validation').createValidator({})





router.get('/', getAllUnits);
router.post('/',validator.body(unitSchema) , createUnit);
router.get('/:id', getUnitById);
router.put('/:id', validator.body(updateUnitSchema), updateUnit);
router.delete('/:id', deleteUnitById);


module.exports = router;