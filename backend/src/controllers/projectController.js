const portfolioService = require('../services/portfolioService');
exports.getProjects = async (req, res, next) => { try { res.json({ data: await portfolioService.getProjects() }); } catch (error) { next(error); } };
