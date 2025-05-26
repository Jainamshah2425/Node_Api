const SchoolModel = require('../models/schoolModel');
const { calculateDistance } = require('../utils/distanceCalculator');

class SchoolController {
    /**
     * Add a new school
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    static async addSchool(req, res) {
        try {
            const { name, address, latitude, longitude } = req.body;

            // Check for duplicate location
            const isDuplicate = await SchoolModel.checkDuplicateLocation(latitude, longitude);
            if (isDuplicate) {
                return res.status(409).json({
                    success: false,
                    message: 'A school already exists at this location'
                });
            }

            // Add school to database
            const result = await SchoolModel.addSchool({
                name,
                address,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude)
            });

            res.status(201).json({
                success: true,
                message: 'School added successfully',
                data: {
                    schoolId: result.schoolId,
                    name,
                    address,
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude)
                }
            });

        } catch (error) {
            console.error('Error adding school:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }

    /**
     * List schools sorted by proximity to user location
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    static async listSchools(req, res) {
        try {
            const userLatitude = parseFloat(req.query.latitude);
            const userLongitude = parseFloat(req.query.longitude);

            // Get all schools from database
            const schools = await SchoolModel.getAllSchools();

            if (schools.length === 0) {
                return res.status(200).json({
                    success: true,
                    message: 'No schools found',
                    data: []
                });
            }

            // Calculate distance for each school and sort by proximity
            const schoolsWithDistance = schools.map(school => {
                const distance = calculateDistance(
                    userLatitude,
                    userLongitude,
                    school.latitude,
                    school.longitude
                );

                return {
                    id: school.id,
                    name: school.name,
                    address: school.address,
                    latitude: school.latitude,
                    longitude: school.longitude,
                    distance: Math.round(distance * 100) / 100 // Round to 2 decimal places
                };
            });

            // Sort by distance (closest first)
            schoolsWithDistance.sort((a, b) => a.distance - b.distance);

            res.status(200).json({
                success: true,
                message: 'Schools retrieved successfully',
                userLocation: {
                    latitude: userLatitude,
                    longitude: userLongitude
                },
                data: schoolsWithDistance
            });

        } catch (error) {
            console.error('Error listing schools:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }
}

module.exports = SchoolController;
