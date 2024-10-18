const User = require('../models/User');

async function verifyApiKey(apikey) {
  try {
    const user = await User.findOne({ 'apikeys.key': apikey });
    if (user) {
      const apiKeyObj = user.apikeys.find(ak => ak.key === apikey);
      console.log(`Verifying apikey: ${apikey}`);
      console.log(`User found: ${user.username}`);
      console.log(`API Key type: ${apiKeyObj.type}`);
      console.log(`API Key is active: ${apiKeyObj.isActive}`);
      return apiKeyObj.isActive;
    } else {
      console.log(`Verifying apikey: ${apikey}, No user found`);
      return false;
    }
  } catch (error) {
    console.error('Error verifying apikey:', error);
    return false;
  }
}

module.exports = verifyApiKey;
