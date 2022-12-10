import React, { useState } from 'react'
import front from '../assets/bg-card-front.png'
import back from '../assets/bg-card-back.png'
// import bg1 from '../assets/bg-main-desktop.png'
// import bg2 from '../assets/bg-main-mobile.png'
import logoCard from '../assets/card-logo.svg'
import success from '../assets/icon-complete.svg'
// import ThankyouPop from './ThankyouPop'
import { Alert, Button, Form } from 'react-bootstrap'
const MainPage = () => {
  const [values, setValues] = useState({
    fullname: '',
    cardnumber: '',
    monthnumber: '',
    yearnumber: '',
    cvcnumber: '',
  })
  const cardno = (event) => {
    const { name, value } = event.target

    if (name === 'cardnumber')
      event.target.value = value
        .replace(/\s/g, '')
        .replace(/(.{4})/g, '$1 ')
        .trim()
  }
  const [formerrors, setFormErrors] = useState({})
  const [formsuccess, setFormSuccess] = useState({})
  const [showMessage, setShowMessage] = useState(false)

  const handleChange = (event) => {
    // if (name === 'monthnumber')
    //   event.target.value = value
    //     .toString()
    //     .replace(/[^0-9]/g, '')
    //     .substring(0, 2)
    // if (name === 'monthnumber' && value > 12) event.target.value = '12'
    // if (name === 'yearnumber')
    //   event.target.value = value
    //     .toString()
    //     .replace(/[^0-9]/g, '')
    //     .substring(0, 2)

    // if (name === 'cvc') event.target.value = value.substring(0, 4)
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }))
  }

  const validate = () => {
    let errors = {}
    let success = {}
    //name field
    if (!values.fullname) {
      errors.fullname = 'cant be empty'
    } else if (!/^[a-zA-Z]+ [a-zA-Z]+$/.test(values.fullname)) {
      errors.fullname =
        'fullname does not follow  is the right pattern e.g. Agun Akindele'
    } else {
      success.fullname = 'success'
    }

    //cardnumber  field
    if (!values.cardnumber) {
      errors.cardnumber = 'cant be empty'
    } else if (!/^(?:5[1-5][0-9]{14})$/.test(values.cardnumber)) {
      errors.cardnumber =
        'fullname does not follow  is the right pattern e.g. 5545 5567 ...'
    } else {
      success.cardnumber = 'success'
    }
    //Month field
    if (!values.monthnumber) {
      errors.monthnumber = 'cant be empty'
    } else if (isNaN(values.monthnumber)) {
      errors.monthnumber = 'month is not a number'
    } else if (values.monthnumber.length !== 2) {
      errors.monthnumber = 'month is too long'
    } else {
      success.monthnumber = 'success'
    }
    //year field
    if (!values.yearnumber) {
      errors.yearnumber = 'cant be empty'
    } else if (isNaN(values.yearnumber)) {
      errors.yearnumber = 'year is not a number'
    } else if (values.yearnumber.length !== 2) {
      errors.yearnumber = 'year is too long'
    } else {
      success.yearnumber = 'success'
    }
    if (!values.cvcnumber) {
      errors.cvcnumber = 'cant be empty'
    } else if (isNaN(values.cvcnumber)) {
      errors.cvcnumber = 'cvc is not a number'
    } else if (values.cvcnumber.length !== 3) {
      errors.cvcnumber = 'cvc is too long'
    } else {
      success.cvcnumber = 'success'
    }

    setFormErrors(errors)
    setFormSuccess(success)
    if (Object.keys(errors).length === 0) {
      return true
    } else {
      return false
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(validate(values))
    console.log('successful')
    if (validate(values)) {
      setShowMessage(true)
    }
  }

  return (
    <div className='container-wrap'>
      <div className='left-section'>
        <div className='cards'>
          <div className='front_card'>
            <img className='front' src={front} alt='' />
            <div className='card_container'>
              <img className='card_logo' src={logoCard} alt='' />
              <h1 className='number'>
                {values.cardnumber || '0000 0000 0000 0000'}
              </h1>

              <div className='card_info  '>
                <span id='name'>{values.fullname || 'Jane Applesseed'}</span>
                <div>
                  <span>{values.monthnumber || '00'}/</span>
                  <span>{values.yearnumber || '00'}</span>
                </div>
              </div>
            </div>
          </div>
          <div className='back_card '>
            <img className='back' src={back} alt='' />
            <span className='cvc' id='cvc'>
              {values.cvcnumber ? values.cvcnumber : '000'}
            </span>
          </div>
        </div>
      </div>

      <div className='right-section'>
        <div className='right-section-folder'>
          {showMessage ? (
            <div className='thank_you--message '>
              <Alert className='d-flex flex-column align-items-center  '>
                <img src={success} alt='' />
                <Alert.Heading className='mt-4'>THANK YOU !</Alert.Heading>
                <p>We've added your card details</p>

                <Button
                  className='thankyou-btn mt-4'
                  onClick={() => setShowMessage(false)}
                >
                  Continue
                </Button>
              </Alert>
            </div>
          ) : (
            <Form className='form' onSubmit={handleSubmit}>
              <Form.Group
                className='input-control form-group'
                controlId='fullname'
              >
                <Form.Label>CardHolder Name</Form.Label>
                <Form.Control
                  className='cardname'
                  name='fullname'
                  type='text'
                  placeholder='Jane Applesseed'
                  value={values.fullname}
                  onChange={handleChange}
                  isInvalid={formerrors.fullname}
                  isValid={formsuccess.fullname}
                />

                <small
                  className={formsuccess.fullname ? 'success' : 'text-danger'}
                >
                  {formsuccess.fullname || formerrors.fullname}
                </small>
              </Form.Group>
              <Form.Group
                className='input-control form-group'
                controlId='cardnumber'
              >
                <Form.Label>CARD NUMBER</Form.Label>
                <Form.Control
                  type='text'
                  className='cardnumber'
                  name='cardnumber'
                  placeholder='0000 0000 0000 0000'
                  value={values.cardnumber}
                  onChange={handleChange}
                  onClick={cardno}
                  isInvalid={formerrors.cardnumber}
                  isValid={formsuccess.cardnumber}
                />
                <small
                  className={formsuccess.cardnumber ? 'success' : 'text-danger'}
                >
                  {formsuccess.cardnumber || formerrors.cardnumber}
                </small>
              </Form.Group>
              <div className=''>
                <div className='label-container'>
                  <Form.Label className='label-group'>
                    <span className='labels'> Exp.</span>
                    <span className='labels2'> Date</span>
                    <span className='groups-date'>(MM/YY)</span>
                  </Form.Label>
                  <span>cvc</span>
                </div>
                <div className='d-flexs'>
                  <Form.Group
                    className='input-control  input1 '
                    controlId='monthnumber'
                  >
                    <Form.Control
                      type='text'
                      className='month'
                      name='monthnumber'
                      placeholder='MM'
                      value={values.monthnumber}
                      onChange={handleChange}
                      isInvalid={formerrors.monthnumber}
                      isValid={formsuccess.monthnumber}
                    />
                    <small
                      className={
                        formsuccess.monthnumber ? 'success' : 'text-danger'
                      }
                    >
                      {formsuccess.monthnumber || formerrors.monthnumber}
                    </small>
                  </Form.Group>
                  <Form.Group
                    className='input-control input2 '
                    controlId='yearnumber'
                  >
                    <Form.Control
                      type='text'
                      className='year'
                      name='yearnumber'
                      placeholder='YY'
                      value={values.yearnumber}
                      onChange={handleChange}
                      isInvalid={formerrors.yearnumber}
                      isValid={formsuccess.yearnumber}
                    />
                    <small
                      className={
                        formsuccess.yearnumber ? 'success' : 'text-danger'
                      }
                    >
                      {formsuccess.yearnumber || formerrors.yearnumber}
                    </small>
                  </Form.Group>

                  <Form.Group
                    className='input-control input3 '
                    controlId='cvcnumber'
                  >
                    {' '}
                    <Form.Control
                      type='text'
                      className='cvcnum'
                      name='cvcnumber'
                      placeholder='000'
                      value={values.cvcnumber}
                      onChange={handleChange}
                      isInvalid={formerrors.cvcnumber}
                      isValid={formsuccess.cvcnumber}
                    />
                    <small
                      className={
                        formsuccess.cvcnumber ? 'success' : 'text-danger'
                      }
                    >
                      {formsuccess.cvcnumber || formerrors.cvcnumber}
                    </small>
                  </Form.Group>
                </div>
              </div>
              <div className='flex-btn'>
                <Button type='submit' className='btn btnform'>
                  Confirm
                </Button>
              </div>
            </Form>
          )}
        </div>
      </div>
    </div>
  )
}

export default MainPage
