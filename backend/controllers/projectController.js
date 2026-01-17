const Project = require('../models/Project');

exports.getProjects = async (req, res) => {
  try {
    const snapshot = await Project.orderBy('created_at', 'desc').get();
    const projects = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addProject = async (req, res) => {
  try {
    const projectData = {
      ...req.body,
      created_at: new Date()
    };
    const docRef = await Project.add(projectData);
    const project = {
      id: docRef.id,
      ...projectData
    };
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
