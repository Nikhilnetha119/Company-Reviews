const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review');

router.get('/', reviewController.getHomePage);
router.post('/add-review', reviewController.addReview);
router.get('/search', reviewController.searchCompany);

module.exports = router;
