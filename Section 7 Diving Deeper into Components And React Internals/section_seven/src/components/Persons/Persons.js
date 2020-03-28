import React, { PureComponent } from 'react';
import Person from './Person/Person';

//Ako zelimo da provjeravamo sve props da li su se promjenili extendamo PureComponent a ne Component
class Persons extends PureComponent {

    static getDerivedStateFromProps(props, state) {
        console.log('[Persons.js -> getDerivedStateFromProps] lifecycle for component update and creation')
        return state
    }

    //nextProp je props koji dolaze kao i nextState
    //Moramo vratiti true ili false
    //dobra je za optimizaciju komponente
    // shouldComponentUpdate(nextProp, nextState) {
    //     console.log('[Persons.js -> shouldComponentUpdate] lifecycle for component update')
    //     console.log('[Persons.js -> nextProp and nextState]', nextProp, nextState)
    //     //Ako se bilo koji this.props promjeni, odnosno ako nisu isti ponovo renderaj komponentu
    //     //Odnosno provjeravamo da li su se props ili state promjenili onda odlucimo treba li renderati komponentu
    //     if (
    //         nextProp.persons !== this.props.persons || 
    //         nextProp.changed !== this.props.changed || 
    //         nextProp.clicked !== this.props.clicked) {
    //         return true
    //         //Inace ne rendera i vrati false
    //     } else {
    //         return false
    //     }

    // }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[PErsons.js -> getSnapshotBeforeUpdate] lifecycle for component update')
        return { message: 'Snapshot!' }
    }

    //Izvrsi se kad smo zavrsili sa svim updatovanjima komponente
    //Fetchanje podataka sa servera
    //koristiti mozemo snapshot da spasimo neke podatke prije update-a i da koristimo ih poslije update-a
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Persons.js -> componentDidUpdate] lifecycle for component update')
        console.log(snapshot)
    }

    componentWillUnmount() {
        //Kad brisemo komponentu iz DOM-a ovo je za class based komponente
        console.log('[Persons.js -> componentWillUnmount] cleaning lifecycle hook')
    }
    render() {
        console.log('[Persons.js] rendering...')

        return this.props.persons.map((person, id) => {
              return (<Person 
                hasFocus={person.hasFocus}
                changed={(e) => this.props.changed(e, person.id)}
                key={person.id}
                name={person.name}
                age={person.age}
                click={() => this.props.clicked(person.id)}
                isAuth={this.props.isAuthenticated}
            />
            )
        }
        )
    }
}
export default Persons