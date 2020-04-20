import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition'

import './Modal.css';

//Odredjujemo koliko ce koja animacija trajati, i proslijedimo kao objekat u timeout Transition komponentu
const animationTiming = {
    //ovo su defaultne vrijednosti koje moramo koristiti
    enter: 400,
    exit: 1000
}

const modal = (props) => {
    return (
        // U CSSTransition samo upisemo jsx kod koji zelimo da output
        //Koristimo classNames kao mnozinaza ovu komponentu, oznacimo koje css klase trebamo dodati elementu koji omotava komponenta
        //classNames je prefix koji odredimo i pomocu kojeg cemo da koristimo css stilove 
        <CSSTransition
            in={props.show}
            timeout={animationTiming}
            mountOnEnter
            unmountOnExit
            classNames={{
                //za enter ne zelimo da definisemo nista, pa ostavimo prazan string
                enter: '',
                //Dodajemo custom klasu za odredjeni css state
                enterActive: 'ModalOpen',
                exit: '',
                //Dodajemo custom klasu za odredjeni css state
                exitActive: 'ModalClose'
            }}>
                    <div className="Modal">
                        <h1>A Modal</h1>
                        <button className='Button' onClick={(props.closed)}>Dismiss</button>
                    </div>
        </CSSTransition>
    )
};

export default modal;

/**
 * Primjer samo sa Transition komponentom
 * import Transition from 'react-transition-group/Transition'
 * 
 * const modal = (props) => {
    return (
        //Ako koristimo timeout i u css fajlu i u js fajlu, odnosno koliko ce trajati animacija, treba da budu iste vrijednosti
        //Mozemo postaviti razlicito vrijeme trajanja animacije za entering i leaving
        <Transition
            in={props.show}
            timeout={animationTiming}
            mountOnEnter
            unmountOnExit>
            {state => {
                const cssClasses = ['Modal',
                state === 'entering'
                ? 'ModalOpen'
            : state === 'exiting' ? 'ModalClosed' : null]
                return (
                    <div className={cssClasses.join(' ')}>
                        <h1>A Modal</h1>
                        <button className='Button' onClick={(props.closed)}>Dismiss</button>
                    </div>
                )

            }}

        </Transition>
    )
};
 */