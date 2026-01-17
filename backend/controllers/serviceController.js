const Service = require('../models/Service');

exports.getServices = async (req, res) => {
  try {
    const snapshot = await Service.orderBy('created_at', 'desc').get();
    const services = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addService = async (req, res) => {
  try {
    const serviceData = {
      ...req.body,
      created_at: new Date()
    };
    const docRef = await Service.add(serviceData);
    const service = {
      id: docRef.id,
      ...serviceData
    };
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
