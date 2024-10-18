require('../controllers/settings');
const mongoose = require('mongoose');
const { User } = require('../database/schema');
const { getHashedPassword } = require('../lib/function');

async function connectToDatabase() {
  try {
    await mongoose.connect(global.mongo_Db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }
}

async function createAdmin(username, email, password) {
  try {
    await connectToDatabase();
    await updateIndexes();

    const hashedPassword = getHashedPassword(password);
    const updateData = {
      username,
      email,
      password: hashedPassword,
      isAdmin: true,
      apikey: 'aetherzcodes' + Math.random().toString(36).substring(7),
      premium: true,
      limit: global.limit_premium
    };

    const user = await User.findOneAndUpdate(
      { username: username },
      updateData,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    if (user) {
      console.log(`Admin account created/updated for ${username}`);
      console.log(`Apikey: ${user.apikey}`);
    } else {
      console.log(`Failed to create/update admin account for ${username}`);
    }
  } catch (err) {
    console.error('Error creating/updating admin:', err);
  } finally {
    await mongoose.connection.close();
    process.exit();
  }
}

async function updateIndexes() {
  try {
    await User.collection.dropIndex('whatsappNumber_1');
    console.log('Old index dropped successfully');
  } catch (err) {
    console.log('No old index to drop, or error dropping index:', err.message);
  }
}

// Menggunakan nilai dari settings.js
// Anda bisa menambahkan nomor WhatsApp jika diperlukan
createAdmin(global.author, global.my_email, '@Fahadd17');
