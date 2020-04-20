//Komponenta koja prikazuje preview burgera kojeg smo narucili, i prikazuje continue i cancel button
import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.module.css'

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <div>
                {/* Handler kojim cancel order i vraca nas na prethodnu stranicu */}
                <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
                {/* handler kojim potvrdjujemo order i idemo dalje na checkout-order formu */}
                <Button btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
            </div>
        </div>
    )
}

export default checkoutSummary