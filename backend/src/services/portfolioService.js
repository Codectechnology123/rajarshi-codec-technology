const { profile, skills, projects } = require('../data/demoData');
const Profile = require('../models/Profile');
const Skill = require('../models/Skill');
const Project = require('../models/Project');
async function getProfile() { if (Profile.db.readyState === 1) { const saved = await Profile.findOne().lean(); if (saved) return saved; } return profile; }
async function getSkills() { if (Skill.db.readyState === 1) { const saved = await Skill.find().sort({ name: 1 }).lean(); if (saved.length) return saved; } return skills; }
async function getProjects() { if (Project.db.readyState === 1) { const saved = await Project.find().sort({ createdAt: -1 }).lean(); if (saved.length) return saved; } return projects; }
module.exports = { getProfile, getSkills, getProjects };
