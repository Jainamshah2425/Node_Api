const express = require('express');
const router = express.Router();
const SchoolController = require('../controllers/schoolController');
const {
    validateAddSchool,
    validateListSchools,
    handleValidationErrors
} = require('../middleware/validation');

// Add school route
router.post('/addSchool', 
    validateAddSchool,
    handleValidationErrors,
    SchoolController.addSchool
);

// List schools route
router.get('/listSchools',
    validateListSchools,
    handleValidationErrors,
    SchoolController.listSchools
);

module.exports = router;
