import React from 'react';

export default function Checkouts(props) {
  return(
      <div className='Checkoutsteps'>
          <div className={props.step1 ? 'active':''}>Sign-in</div>
          <div className={props.step2 ? 'active':''}>shipping</div>
          <div className={props.step3 ? 'active':''}>payment</div>
          <div className={props.step4 ? 'active':''}>placeOrder</div>

      </div>
  )
}
