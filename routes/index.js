var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
  let error = {
    cvvBox: '',
    cardHolderName: '',
    cardNumberBox: '',
    expMonth: '',
    expYear: ''
  }
  let data = req.body

  const AE = /(^34|37)/.test(data.cardNumberBox)
  if (AE && data.cardNumberBox.length !== 15
    || !AE && data.cardNumberBox.length > 19 || data.cardNumberBox.length < 16) {
    error.cardNumberBox = 'This field is filled incorrect'
  }
  if (AE && data.cvvBox.length !== 4 || !AE && data.cvvBox.length !== 3) {
    error.cvvBox = 'This CVV is filled incorrect'
  }
  if (data.expMonth.length < 2 || data.expMonth === 1) {
    data.expMonth = '0' + data.expMonth
  } else if (data.expMonth === '00') {
    error.expMonth = 'Your month looks wrong'
  }
  if (data.expYear.length < 2) {
    error.expYear = 'This year looks wrong'
  }

  res.json({error})
});

module.exports = router;
