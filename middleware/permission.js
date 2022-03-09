
exports.scopCourse = function(req, res, course){
  
  if (req.user.isAdmin) return res.send(course);

  else return res.send(course.filter(course => course.auth == req.header('x-auth-token')));
}