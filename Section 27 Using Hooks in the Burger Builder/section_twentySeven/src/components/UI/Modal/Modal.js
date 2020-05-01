import React from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const modal = props => {

    // shouldComponentUpdate ( nextProps, nextState ) {
    //     return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    // }
    
   
        return (
            <Aux>
                <Backdrop show={props.show} clicked={props.modalClosed} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: props.show ? '1' : '0'
                    }}>
                    {props.children}
                </div>
            </Aux>
        )
  
}
/*Ako ne zelimo da provjeravamo cijeli props, nego samo odredjene vrijednosti props objekta
to mozemo uraditi sa react memo, tako sto proslijedimo drugi argument u react.memo
 gdje dodajemo svoju funkciju kojom uporedjujemo props, funkcija prima prevProps i nextProps
 i vraca true ili false u ovisnosti da li su props jednaki ili ne, ovdje uporedjujemo ako su props 
 jednaki, */

//React.memo sluzi da optimizaciju, i update komponentu samo kad se props promjeni
export default React.memo(modal,(prevProps, nextProps) => {
    //console.log vraca false kad smo na modalu, sto znaci da treba renderati komponentu?
    console.log('are props equal show->', nextProps.show === prevProps.show)
    console.log('are props equal children->', nextProps.children === prevProps.children)
    return nextProps.show === prevProps.show && nextProps.children === prevProps.children
});