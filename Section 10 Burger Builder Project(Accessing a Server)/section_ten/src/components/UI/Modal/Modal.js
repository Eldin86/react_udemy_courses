//Modal prozor koji u sebi ima checkout summary sa dugmetom cancel i continue
//takodjer ima i backdrop
//kad je props.show false zatvara se modal
import React, {Component} from 'react'
import classes from './Modal.module.css'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {
    //Komponenta se updatuje samo kad se show properti promjeni promjeni
    //Odnosno kad kliknemo na orderNow button
    shouldComponentUpdate(nextProps, nextState){
        //Uslov ako je razlicito vrati true inace false
        console.log('[Modal.js nextProps.show]', nextProps.show)
        console.log('[Modal.js this.props.show]', this.props.show)
       return nextProps.show !== this.props.show 
    }

    render(){
        return (
            <Auxiliary>
                <Backdrop clicked={this.props.modalClosed} show={this.props.show}/>
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateX(0)' : 'translateX(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Auxiliary>
        )
    }
}

export default Modal