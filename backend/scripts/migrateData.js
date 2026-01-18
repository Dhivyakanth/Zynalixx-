/**
 * Migration script to populate Firestore with sample data
 * Run with: node scripts/migrateData.js
 */

const db = require('../config/db');
require('dotenv').config();

async function migrateData() {
  try {
    console.log('Starting data migration...');

    // Migrate Services
    const servicesData = [
      {
        title: 'Full Stack Development',
        description: 'End-to-end web solutions using MERN Stack',
        icon: 'FaCode',
        created_at: new Date()
      },
      {
        title: 'MERN Stack Projects',
        description: 'MongoDB, Express, React, Node.js applications',
        icon: 'FaLayerGroup',
        created_at: new Date()
      },
      {
        title: 'UI/UX Designing',
        description: 'User-friendly and modern interface designs',
        icon: 'FaPaintBrush',
        created_at: new Date()
      },
      {
        title: 'Graphic Designing',
        description: 'Creative visual content and branding',
        icon: 'FaPalette',
        created_at: new Date()
      },
      {
        title: 'AI / ML Solutions',
        description: 'Smart AI-powered applications',
        icon: 'FaRobot',
        created_at: new Date()
      }
    ];

    console.log('Adding services...');
    for (const service of servicesData) {
      await db.collection('services').add(service);
      console.log(`Added service: ${service.title}`);
    }

    // Migrate Projects
    const projectsData = [
      {
        project_name: 'E-Commerce Platform',
        project_type: 'Full Stack',
        client_name: 'TechCorp',
        created_at: new Date()
      },
      {
        project_name: 'AI Chatbot',
        project_type: 'AI/ML',
        client_name: 'StartupXYZ',
        created_at: new Date()
      },
      {
        project_name: 'Portfolio Website',
        project_type: 'UI/UX',
        client_name: 'Freelancer',
        created_at: new Date()
      }
    ];

    console.log('Adding projects...');
    for (const project of projectsData) {
      await db.collection('projects').add(project);
      console.log(`Added project: ${project.project_name}`);
    }

    // Migrate Events
    const eventsData = [
      {
        event_name: 'Tech Hackathon 2024',
        event_date: new Date('2024-06-15'),
        description: 'Join us for an exciting 48-hour hackathon',
        created_at: new Date()
      },
      {
        event_name: 'Web Dev Workshop',
        event_date: new Date('2024-07-20'),
        description: 'Learn MERN stack from scratch',
        created_at: new Date()
      },
      {
        event_name: 'Startup Meetup',
        event_date: new Date('2024-08-10'),
        description: 'Network with fellow entrepreneurs',
        created_at: new Date()
      }
    ];

    console.log('Adding events...');
    for (const event of eventsData) {
      await db.collection('events').add(event);
      console.log(`Added event: ${event.event_name}`);
    }

    console.log('\n✅ Data migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration error:', error);
    process.exit(1);
  }
}

migrateData();


