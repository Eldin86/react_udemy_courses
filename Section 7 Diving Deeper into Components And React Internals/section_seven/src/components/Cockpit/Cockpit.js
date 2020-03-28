import React, { useEffect, useRef, useContext } from 'react';
import classes from './Cockpit.module.css';
import AuthContext from '../../context/auth-context'

const Cockpit = (props) => {
    const toggleBtnRef = useRef(null);

    //React automatski pravi konekciju sa Authcontext pomocu hook-a
    //Imamo pristup podatcima pomocu contexta
    const authContext = useContext(AuthContext)
    console.log(authContext.authenticated)

    //Prima funkciju koca se pokrece za svaki render ciklus
    //Moramo da imamo veliko slovo komponente da bismo koristili react hook
    useEffect(() => {
        console.log('[Cockpit.js -> useEffect] pokrece se za svaki render ciklus')
        //Http request
        //componentDidUpdate, componentDidMount kombinacija
        //    setTimeout(() => {
        //         alert('Saved data to cloud')
        //     }, 1000)

        //Kad reloadamo automatski klik event se doda na button
        //Moramo pozvati metodu nakon sto se DOM rendera
        toggleBtnRef.current.click()

        //Funkcija koja se pokrene poslije svakog re render ciklusa, pokrece se prije glavne useEffect funkcije
        //ali poslije prvog render ciklusa
        return () => {
            //uklonimo timer kad se Cockpit komponenta unmounta, posto se dio unutar returned funkccije
            //pokrece kad se unmounta komponenta
            //clearTimeout(timer)
            console.log('[Cockpit.js -> useEffect -> cleanup]')
        }
        //kad se persons prmjeni onda se aktivira useEffect proslijedimo u [] props.person
    }, [])

    useEffect(() => {
        console.log('[Cockpit.js -> useEffect] 2nd useEffect')
        //cleanup mozemo koristiti da imamo neke operacije da trebamo da otkazemo kad god komponenta se re rendera
        return () => {
            console.log('[Cockpit.js -> useEffect] cleanup work in 2nd useEffect')
        }
    })

    let assignedClasses = []
    let btnClass = '';

    if (props.showPersons) {
        btnClass = classes.Red
    }

    if (props.personsLength <= 2) {
        assignedClasses.push(classes.red)
    }
    if (props.personsLength <= 1) {
        assignedClasses.push(classes.bold)
    }

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')} > this is really working! </p>
            <button
                ref={toggleBtnRef}
                className={btnClass}
                onClick={props.togglePersons} > Toggle Persons </button>

            <button onClick={authContext.login}>Login</button>
            <p>Is this authenticated: {authContext.authenticated ? 'true' : 'false'}</p>

            {/* <AuthContext.Consumer>
                    {(context) => <button onClick={context.login}>Login</button>}
                </AuthContext.Consumer> */}


        </div>
    )

}

//React spasi kopiju komponente i ako se input promjeni onda ce se tek re renderati komponenta
//Koristi se u funkcionalnim komponentama za optimizaciju, dobra ideja je da omotamo sa React.memo
//da se ne bi updateovala komponenta sa svakom promjenom u parent komponenti
export default React.memo(Cockpit)