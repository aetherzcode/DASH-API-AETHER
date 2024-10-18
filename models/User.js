const mongoose = require('mongoose');

const ApiKeySchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['registration', 'admin'],
    default: 'registration'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const UserSchema = new mongoose.Schema({
  // ... field lainnya ...
  apikeys: [ApiKeySchema],
  // ... field lainnya ...
});

UserSchema.methods.addApiKey = function(apiKey, type = 'registration') {
  this.apikeys.push({ key: apiKey, type });
  return this.save();
};

UserSchema.methods.removeApiKey = function(apiKey) {
  this.apikeys = this.apikeys.filter(key => key.key !== apiKey);
  return this.save();
};

UserSchema.methods.verifyApiKey = function(apiKey) {
  return this.apikeys.some(key => key.key === apiKey && key.isActive);
};

UserSchema.methods.deactivateApiKey = function(apiKey) {
  const key = this.apikeys.find(k => k.key === apiKey);
  if (key) {
    key.isActive = false;
    return this.save();
  }
  return Promise.resolve(false);
};

UserSchema.methods.activateApiKey = function(apiKey) {
  const key = this.apikeys.find(k => k.key === apiKey);
  if (key) {
    key.isActive = true;
    return this.save();
  }
  return Promise.resolve(false);
};

UserSchema.statics.findByApiKey = function(apiKey) {
  return this.findOne({ 'apikeys.key': apiKey, 'apikeys.isActive': true });
};

module.exports = mongoose.model('User', UserSchema);
