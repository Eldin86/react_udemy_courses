//Modal prozor koji u sebi ima checkout summary sa dugmetom cancel i continue
//takodjer ima i backdrop
//kad je props.show false zatvara se modal
import React, {Component} from 'react'
import classes from './Modal.module.css'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState){
        console.log('[Modal.js nextProps.show]', nextProps.show)
        console.log('[Modal.js this.props.show]', this.props.show)
        //Updatujemo komponentu samo ako se show promjeni i props.children 
        //props.children je orderSummary komponenta, ako se i u njoj nesto promjeni updatuj
        //Updatuje se ako se promjene children
       return nextProps.show !== this.props.show  || nextProps.children !== this.props.children
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