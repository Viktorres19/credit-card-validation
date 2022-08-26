<template>
  <div class="container">

    <div class="card-container">

      <div :class="[isRotated ? 'rotated' : '', 'front']">
        <div class="image">
          <svg xmlns="http://www.w3.org/2000/svg" width="156.766" height="35.889" viewBox="0 0 41.478 9.496"><path style="display:inline;opacity:0;stroke-width:1.98411;stroke-opacity:1" d="M-7.629-4.006h39.494v7.512H-7.629z" transform="translate(8.62 4.998)"/><text xml:space="preserve" style="font-size:9.525px;line-height:1.25;font-family:Ebrima;-inkscape-font-specification:Ebrima;stroke-width:.264583" x="-.811" y="9.143"><tspan x="-.811" y="9.143" style="font-style:normal;font-variant:normal;font-weight:400;font-stretch:normal;font-size:12.7001px;font-family:Rubik;-inkscape-font-specification:Rubik;fill:#fff;stroke-width:.264583">UBANK</tspan></text></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="124.894" height="35.889" viewBox="0 0 33.045 9.496"><path style="display:inline;opacity:0;stroke-width:1.78802;stroke-opacity:1" d="M-.168 7.515h31.257v7.708H-.168z" transform="translate(1.062 -6.62)"/><text xml:space="preserve" style="font-size:9.525px;line-height:1.25;font-family:Ebrima;-inkscape-font-specification:Ebrima;stroke-width:.264583" x="-.499" y="9.143"><tspan x="-.499" y="9.143" style="font-style:normal;font-variant:normal;font-weight:400;font-stretch:normal;font-size:12.7001px;font-family:Rubik;-inkscape-font-specification:Rubik;fill:#fff;stroke-width:.264583">CARD</tspan></text></svg>
        </div>
        <div class="card-number-box">
          <div v-if="successValidation" class="number-box__success">{{ successValidation }}</div>
          <div v-if="error.notValid" class="number-box__error">{{ error.notValid }}</div>
          <div>{{ !data.cardNumberBox ? '################' : data.cardNumberBox }}</div>
        </div>
        <div class="flexbox">
          <div class="box">
            <span>card holder</span>
            <div class="card-holder-name" v-text="data.cardHolderName" />
          </div>
          <div class="box">
            <span>expires</span>
            <div class="expiration">
              <span class="exp-month" v-text="data.expMonth" />
              &nbsp;
              <span class="exp-year" v-text="data.expYear" />
            </div>
          </div>
        </div>
      </div>

      <div :class="[isRotated ? 'rotated' : '', 'back']">
        <div class="stripe"></div>
        <div class="box">
          <span>cvv</span>
          <div class="cvv-box" v-text="data.cvvBox" />
          <svg xmlns="http://www.w3.org/2000/svg" width="124.894" height="35.889" viewBox="0 0 33.045 9.496"><path style="display:inline;opacity:0;stroke-width:1.78802;stroke-opacity:1" d="M-.168 7.515h31.257v7.708H-.168z" transform="translate(1.062 -6.62)"/><text xml:space="preserve" style="font-size:9.525px;line-height:1.25;font-family:Ebrima;-inkscape-font-specification:Ebrima;stroke-width:.264583" x="-.499" y="9.143"><tspan x="-.499" y="9.143" style="font-style:normal;font-variant:normal;font-weight:400;font-stretch:normal;font-size:12.7001px;font-family:Rubik;-inkscape-font-specification:Rubik;fill:#fff;stroke-width:.264583">CARD</tspan></text></svg>
        </div>
      </div>

    </div>

    <form class="form">
      <div class="form-container">
        <div class="form-wrapper">
          <div class="form-row">
            <div class="inputBox">
              <span>card number</span>
              <input ref="input" type="text" maxlength="19" class="card-number-input" v-model="data.cardNumberBox" @input="checkCardNumber">
              <span v-if="error.cardNumberBox" class="inputBox__error">{{ error.cardNumberBox }}</span>
            </div>
            <div class="inputBox">
              <span>expiration mm</span>
              <input type="text" class="month-input" v-model="data.expMonth" placeholder="01" @input="checkMonth" />
              <span v-if="error.expMonth" class="inputBox__error">{{ error.expMonth }}</span>
            </div>
            <div class="inputBox">
              <span>expiration yy</span>
              <input type="text" class="year-input" v-model="data.expYear" placeholder="23" @input="checkYear" />
              <span v-if="error.expYear" class="inputBox__error">{{ error.expYear }}</span>
            </div>
            <div class="inputBox">
              <span>card holder</span>
              <input type="text" class="card-holder-input" v-model="data.cardHolderName" :placeholder="data.cardHolderName">
            </div>
            <div class="inputBox">
              <span>cvv</span>
              <input type="text" class="cvv-input" v-model="data.cvvBox" @mouseover="isRotated = true"  @mouseleave="isRotated = false" @input="checkCvv">
              <span v-if="error.cvvBox" class="inputBox__error">{{ error.cvvBox }}</span>
            </div>
            <div class="inputBox">
              <input type="submit" value="submit" class="submit-btn" @click.prevent="submit">
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      data: {
        cvvBox: '',
        cardHolderName: 'Johny Cage',
        cardNumberBox: '',
        expMonth: 1,
        expYear: 23
      },
      isRotated: false,
      flag: "@/assets/usa-flag.jpg",
      successValidation: '',
      error: {
        cvvBox: '',
        cardHolderName: '',
        cardNumberBox: '',
        expMonth: '',
        expYear: '',
        notValid: ''
      }
    }
  },
  mounted() {
    this.$refs.input.focus()
  },
  methods: {
    checkMonth (event) {
      let month = event.target.value
      month = month.replace(/\D/g, '');
      if (month.length === 1 && month > 1) {
        month = 0 + month
      } else if (month.length > 2) {
        month = month[0] + month[1]
      } else if (month > 12) {
        month = 12
      }
      this.data.expMonth = month
    },
    checkYear (event) {
      const dateYear = new Date().getFullYear() - 2000
      let year = event.target.value
      year = year.replace(/\D/g, '');
      if (year < dateYear && year.length === 2) {
        year = dateYear
      } else if (year.length > 2) {
        year = year[0] + year[1]
      }
      this.data.expYear = year
    },
    checkCardNumber (event) {
      let card = event.target.value
      card = card.replace(/\D/g, '');
      const AE = this.isAmericanExpress (card)
      if (AE && card.length > 15) {
        card = card.slice(0, 15)
      } else if (!AE && card.length > 19) {
        card = card.slice(0, 19)
      }
      this.data.cardNumberBox = card
    },
    isAmericanExpress (card) {
      return /(^34|37)/.test(card)
    },
    checkCvv (event) {
      let value = event.target.value
      value = value.replace(/\D/g, '');
      const AE = this.isAmericanExpress (this.data.cardNumberBox)
      if (AE && value.length > 4) {
        value = value.slice(0, 4)
      } else if (!AE && value.length > 3) {
        value = value.slice(0, 3)
      }
      this.data.cvvBox = value
    },
    checkValidation () {
      const AE = this.isAmericanExpress (this.data.cardNumberBox)
      if (AE && this.data.cardNumberBox.length !== 15
        || !AE && this.data.cardNumberBox.length > 19 || this.data.cardNumberBox.length < 16) {
        this.error.cardNumberBox = 'This field is filled incorrect'
      }
      if (AE && this.data.cvvBox.length !== 4 || !AE && this.data.cvvBox.length !== 3) {
        this.error.cvvBox = 'This CVV is filled incorrect'
      }
      if (this.data.expMonth.length < 2 || this.data.expMonth === 1) {
        this.data.expMonth = '0' + this.data.expMonth
      } else if (this.data.expMonth === '00') {
        this.error.expMonth = 'Your month looks wrong'
      }
        if (this.data.expYear.length < 2) {
        this.error.expYear = 'This year looks wrong'
      }
    },

    async submit () {
      this.error = {
        cvvBox: '',
        cardHolderName: '',
        cardNumberBox: '',
        expMonth: '',
        expYear: ''
      }
      this.checkValidation ()

      if (Object.values(this.error).filter(f=>f).length === 0) {
        const res = await fetch('api', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(this.data)
        })

        const result = await res.json()
        if (Object.values(result.error).filter(f=>f).length === 0) {
          this.successValidation = 'Success'
        } else if (Object.values(result.error).filter(f=>f).length !== 0) {
          this.error.notValid = 'Number of your card is not valid, please check'
          console.log(this.error.notValid)
        }
      }
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap');

*{
  font-family: 'Poppins', Arial, sans-serif;
  margin:0; padding:0;
  box-sizing: border-box;
  outline: none; border: none;
  text-decoration: none;
  text-transform: uppercase;
}

.container{
  background-image: url("./assets/bg.jpg");
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  padding: 10px;
  position: relative;
}

.form{
  background-image: url("./assets/usa-flag.jpg");
  background-repeat: no-repeat;
  border-radius: 5px;
  box-shadow: 0 10px 15px rgba(0,0,0,.1);
  width: 100%;
  max-width: 600px;
  position: relative;
  z-index: 0;
  overflow: hidden;
  border: 1px solid #fff;
}

.form::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.6;
}

.form-container {
  padding: 160px 20px 20px;
  position: relative;
  z-index: 1;
}

.form-wrapper {
  overflow: hidden;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -8px;
}

.inputBox{
  position: relative;
  margin-top: 20px;
  padding: 0 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.inputBox__error {
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translateY(100%);
  font-size: 9px;
  width: 100%;
  padding-left: 10px;
}

.inputBox:first-child {
  width: 50%;
}

.inputBox:nth-child(2) {
  width: 25%;
}

.inputBox:nth-child(3) {
  width: 25%;
}

.inputBox:nth-child(4) {
  width: 66.66%;
}

.inputBox:nth-child(5) {
  width: 33.33%;
}

.inputBox:last-of-type {
  width: 100%;
}

.form .inputBox span{
  display: block;
  color:#fff;
  padding-bottom: 5px;
}

.form .inputBox input[type="text"],
.form .inputBox input[type="number"],
.form .inputBox select{
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border:1px solid rgba(0,0,0,.3);
  color:#444;
}

.form .submit-btn{
  width: 100%;
  background:linear-gradient(0deg, #F7CE00, #0058B5);
  padding: 10px;
  font-size: 20px;
  color:#fff;
  border-radius: 10px;
  cursor: pointer;
  transition: .2s linear;
  border: 1px solid #fff;
  box-sizing: border-box;
}

.form .submit-btn:hover{
  letter-spacing: 2px;
  opacity: .8;
}

.card-container{
  margin-bottom: -150px;
  position: relative;
  min-height: 250px;
  width: 100%;
  max-width: 400px;
}

.front{
  box-sizing: border-box;
  position: absolute;
  z-index: 2;
  height: 100%;
  width: 100%;
  top: 0; left: 0;
  background: linear-gradient(0deg, #F7CE00, #0058B5);
  border-radius: 5px;
  backface-visibility: hidden;
  box-shadow: 0 15px 25px rgba(0,0,0,.2);
  padding:20px;
  transform:perspective(1000px) rotateY(0deg);
  transition:transform .4s ease-out;
  border: 1px solid #fff;
  min-height: 250px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.front .image{
  display: flex;
  align-items:center;
  justify-content: space-between;
  padding-top: 10px;
  flex-wrap: wrap;
}

.front .image svg{
  margin-bottom: 10px;
}

.front .card-number-box{
  position: relative;
  padding:30px 0;
  font-size: 22px;
  color:#fff;
}

.front .number-box__success, .front .number-box__error {
  position: absolute;
  z-index: 3;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.front .number-box__success {
  color: lightgreen;
}

.front .number-box__error {
  color: firebrick;
}

.front .flexbox{
  display: flex;
}

.front .flexbox .box:nth-child(1){
  margin-right: auto;
}

.front .flexbox .box{
  font-size: 15px;
  color:#fff;
}

.back{
  box-sizing: border-box;
  position: absolute;
  top:0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 2;
  background: linear-gradient(0deg, #F7CE00, #0058B5);
  border-radius: 5px;
  padding: 20px 0;
  text-align: right;
  backface-visibility: hidden;
  box-shadow: 0 15px 25px rgba(0,0,0,.2);
  transform:perspective(1000px) rotateY(180deg);
  transition:transform .4s ease-out;
  border: 1px solid #fff;
  min-height: 250px;
  overflow: hidden;
}

.back .stripe{
  background: #000;
  width: 100%;
  margin: 10px 0;
  height: 50px;
}

.back .box{
  padding: 0 20px;
}

.back .box span{
  color:#fff;
  font-size: 15px;
}

.back .box .cvv-box{
  height: 50px;
  padding: 10px;
  margin: 5px 0 10px;
  color:#333;
  background: #fff;
  border-radius: 5px;
  width: 100%;
}

.back .box img{
  margin-top: 30px;
  height: 30px;
}

.front.rotated {
  transform: perspective(1000px) rotateY(-180deg);
}

.back.rotated {
  transform: perspective(1000px) rotateY(0deg);
}

@media (max-width: 480px) {
  .inputBox:first-child {
    width: 100%;
  }

  .inputBox:nth-child(2) {
    width: 33.33%;
  }

  .inputBox:nth-child(3) {
    width: 33.33%;
  }

  .inputBox:nth-child(4) {
    width: 100%;
    order: 5;
  }

  .inputBox:nth-child(5) {
    order: 4;
    width: 33.33%;
  }

  .inputBox:last-of-type {
    order: 6;
    width: 100%;
  }
  .card-container{
    margin-bottom: -400px;
  }
  .front, .back {
    position: relative;
    padding: 10px;
  }
  .form-container {
    padding: 160px 10px 10px;
  }
  .inputBox {
    margin-top: 10px;
  }
  .front .card-number-box{
    padding:15px 0;
  }
  /*background-image: url('../img/caret-down.svg');*/
  /*<img :src="require('@/assets/img/warn-icon-red.svg')" alt="warn icon red" width="20" height="19">*/
}

@media (max-width: 400px) {
  .front .card-number-box {
    font-size: 18px;
  }
  .form .inputBox span {
    font-size: 12px;
  }
}
</style>
