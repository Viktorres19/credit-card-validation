var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
  let error = {
    cvvBox: '',
    cardHolderName: '',
    cardNumberBox: '',
    expMonth: '',
    expYear: '',
    notValid: ''
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

  let ch = 0;
  const num = String(data.cardNumberBox).replace(/\D/g, '');
  const isOdd = num.length % 2 !== 0;
  if ('' === num) return false;
  for (let i = 0; i < num.length; i++) {
    let n = parseInt(num[i], 10);
    ch += (isOdd | 0) === (i % 2) && 9 < (n *= 2) ? (n - 9) : n;
  }
  if (0 !== (ch % 10)) {
    error.notValid = 'Number of your card is not valid, please check'
  }

  res.json({error})
});

module.exports = router;
