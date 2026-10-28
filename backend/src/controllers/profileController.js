const portfolioService = require('../services/portfolioService');
exports.getProfile = async (req, res, next) => { try { res.json({ data: await portfolioService.getProfile() }); } catch (error) { next(error); } };
