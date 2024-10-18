const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const User = require('../models/User'); // Sesuaikan path jika berbeda
const crypto = require('crypto');

router.get('/', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    console.log('Users data:', users);
    res.render('admin/dashboard', { users });
  } catch (err) {
    console.error('Error fetching users:', err);
    req.flash('error_msg', 'Terjadi kesalahan saat mengambil data user.');
    res.redirect('/dashboard');
  }
});

router.post('/update-apikey', isAuthenticated, isAdmin, async (req, res) => {
  const { userId, newApikey } = req.body;
  try {
    await User.findByIdAndUpdate(userId, { apikey: newApikey });
    req.flash('success_msg', 'Apikey berhasil diperbarui.');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Terjadi kesalahan saat memperbarui apikey.');
  }
  res.redirect('/admin');
});

router.post('/toggle-premium', isAuthenticated, isAdmin, async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    user.premium = !user.premium;
    await user.save();
    req.flash('success_msg', `Status premium user berhasil ${user.premium ? 'ditambahkan' : 'dihapus'}.`);
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Terjadi kesalahan saat mengubah status premium.');
  }
  res.redirect('/admin');
});

// Fungsi untuk generate apikey
function generateApiKey() {
  return crypto.randomBytes(32).toString('hex');
}

// Tambah apikey baru
router.post('/add-apikey', isAuthenticated, isAdmin, async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      req.flash('error_msg', 'User tidak ditemukan.');
      return res.redirect('/admin');
    }
    const newApiKey = generateApiKey();
    await user.addApiKey(newApiKey, 'admin');
    console.log(`New admin apikey ${newApiKey} added for user ${user.username}`);
    req.flash('success_msg', 'Apikey baru berhasil ditambahkan.');
  } catch (err) {
    console.error('Error adding apikey:', err);
    req.flash('error_msg', 'Terjadi kesalahan saat menambahkan apikey.');
  }
  res.redirect('/admin');
});

// Hapus apikey
router.post('/remove-apikey', isAuthenticated, isAdmin, async (req, res) => {
  const { userId, apikey } = req.body;
  try {
    const user = await User.findById(userId);
    user.apikeys = user.apikeys.filter(key => key !== apikey);
    await user.save();
    req.flash('success_msg', 'Apikey berhasil dihapus.');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Terjadi kesalahan saat menghapus apikey.');
  }
  res.redirect('/admin');
});

// Custom apikey
router.post('/custom-apikey', isAuthenticated, isAdmin, async (req, res) => {
  const { userId, customApikey } = req.body;
  try {
    const user = await User.findById(userId);
    if (user.apikeys.includes(customApikey)) {
      req.flash('error_msg', 'Apikey sudah ada.');
    } else {
      user.apikeys.push(customApikey);
      await user.save();
      req.flash('success_msg', 'Custom apikey berhasil ditambahkan.');
    }
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Terjadi kesalahan saat menambahkan custom apikey.');
  }
  res.redirect('/admin');
});

router.get('/check-apikey/:apikey', isAuthenticated, isAdmin, async (req, res) => {
  const { apikey } = req.params;
  const user = await User.findOne({ 'apikeys.key': apikey });
  if (user) {
    const apiKeyObj = user.apikeys.find(ak => ak.key === apikey);
    res.json({
      found: true,
      username: user.username,
      apiKeyType: apiKeyObj.type,
      isActive: apiKeyObj.isActive
    });
  } else {
    res.json({ found: false });
  }
});

module.exports = router;
