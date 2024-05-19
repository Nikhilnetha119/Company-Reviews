const Company = require('../models/company');
const Review = require('../models/review');

exports.getHomePage = (req, res, next) => {
  res.render('index', { companies: [], searched: false });
};

exports.addReview = async (req, res, next) => {
  const { companyName, pros, cons, rating } = req.body;
  try {
    let company = await Company.findOne({ where: { name: companyName } });
    if (!company) {
      company = await Company.create({ name: companyName });
    }
    await Review.create({ companyId: company.id, pros, cons, rating });
    res.redirect('/');
  } catch (error) {
    next(error);
  }
};

exports.searchCompany = async (req, res, next) => {
  const { companyName } = req.query;
  try {
    const company = await Company.findOne({ where: { name: companyName }, include: 'reviews' });
    if (company) {
      const reviews = company.reviews;
      const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
      res.render('index', { companies: [{ ...company.toJSON(), averageRating }], searched: true });
    } else {
      res.render('index', { companies: [], searched: true });
    }
  } catch (error) {
    next(error);
  }
};