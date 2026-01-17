const Event = require('../models/Event');

exports.getEvents = async (req, res) => {
  try {
    const snapshot = await Event.orderBy('created_at', 'desc').get();
    const events = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addEvent = async (req, res) => {
  try {
    const eventData = {
      ...req.body,
      created_at: new Date()
    };
    // Convert event_date string to Date if provided
    if (eventData.event_date) {
      eventData.event_date = new Date(eventData.event_date);
    }
    const docRef = await Event.add(eventData);
    const event = {
      id: docRef.id,
      ...eventData
    };
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
