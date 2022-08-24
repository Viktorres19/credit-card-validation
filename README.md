> This is credit cart validation App

# Here is an example of a validation algorithm that can be used:
1. The expiry date of the credit card (year and month) must be AFTER present time
2. The CVV (security code) of the credit card must be exactly 3 digits long
    * Unless it’s an American Express card, in which case the CVV must be exactly 4 digits long
    * American Express are cards whose PAN (card numbers) starts with either “34” or “37”
3. The PAN (card number) is between 16 and 19 digits long
4. Last digit of the PAN (card number) is checked using Luhn’s algorithm
