import React from 'react'
import { Alert, Button } from 'react-bootstrap'
import success from '../assets/icon-complete.svg'
const ThankyouPop = () => {
  return (
    <div>
      <div className='thank_you--message '>
        <Alert className='d-flex flex-column align-items-center  '>
          <img src={success} alt='' />
          <Alert.Heading className='mt-4'>THANK YOU !</Alert.Heading>
          <p>We've added your card details</p>

          <Button className='thankyou-btn mt-4'>Continue</Button>
        </Alert>
      </div>
    </div>
  )
}

export default ThankyouPop
