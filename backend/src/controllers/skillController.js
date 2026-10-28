const portfolioService = require('../services/portfolioService');
exports.getSkills = async (req, res, next) => { try { res.json({ data: await portfolioService.getSkills() }); } catch (error) { next(error); } };
