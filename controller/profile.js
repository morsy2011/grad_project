const { User } = require('../models/user/user');

exports.profile = async (req, res, next) => {
  let user = await User.findById(req.params.id);
  if (!user) return res.status(200).json({
    "status": false,
    "message": "you must be registered or login",
    "data": null
  });

  const userBack = {
    "id": user.id,
    "name": user.local.name,
    "email": user.local.email,
    "phone": user.local.phone
  };

  res.status(200).json({
    "status": true,
    "message": `Welcome ${user.local.name}` ,
    "data": userBack
  });
  
  next();
}