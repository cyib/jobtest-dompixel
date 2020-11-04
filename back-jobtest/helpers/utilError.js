module.exports = function (req, res, err) {
  let status = 500;
  let message = err.message;
  
  if (message.indexOf("[ERROR]") != -1) {
    let error = err.split("-");
    status = error[0];
    message = error[1];
  }
  
  console.error(err.message);
  res.status(status).send(message);
}
