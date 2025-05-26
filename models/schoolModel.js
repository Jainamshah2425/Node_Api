const { pool } = require('../config/database');

class SchoolModel {
    /**
     * Add a new school to the database
     * @param {Object} schoolData - School information
     * @returns {Promise<Object>} Result of the insertion
     */
    static async addSchool(schoolData) {
        const { name, address, latitude, longitude } = schoolData;
        
        try {
            const [result] = await pool.execute(
                'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
                [name, address, latitude, longitude]
            );
            
            return {
                success: true,
                schoolId: result.insertId,
                message: 'School added successfully'
            };
        } catch (error) {
            throw new Error(`Database error: ${error.message}`);
        }
    }

    /**
     * Get all schools from the database
     * @returns {Promise<Array>} Array of schools
     */
    static async getAllSchools() {
        try {
            const [rows] = await pool.execute(
                'SELECT id, name, address, latitude, longitude FROM schools ORDER BY created_at DESC'
            );
            
            return rows;
        } catch (error) {
            throw new Error(`Database error: ${error.message}`);
        }
    }

    /**
     * Check if a school with similar coordinates already exists
     * @param {number} latitude 
     * @param {number} longitude 
     * @returns {Promise<boolean>} True if school exists
     */
    static async checkDuplicateLocation(latitude, longitude) {
        try {
            const [rows] = await pool.execute(
                'SELECT id FROM schools WHERE ABS(latitude - ?) < 0.001 AND ABS(longitude - ?) < 0.001',
                [latitude, longitude]
            );
            
            return rows.length > 0;
        } catch (error) {
            throw new Error(`Database error: ${error.message}`);
        }
    }
}

module.exports = SchoolModel;
