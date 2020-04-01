//HOC Komponenta pomocu koje cemo loadirati drugu komponentu asinhrono, odnosno kad je potrebno
//Ovo je stariji nacin koji koirstimo za lazy loading
import React, {Component} from 'react'

//importComponent je funkcija koju cemo proslijediti
const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            //komponentu inicijalno postavljamo na null
            //Component ce biti postavljen dinamicki
            component: null
        }

        //U componentDidMount postavljamo dinamicki komponentu
        componentDidMount(){
            //Funkcija koja vraca Promise
            importComponent()
                .then(cmp => {
                    //Postavljamo u component komponentu koju smo primili
                    //Default je property koji je komponenta koju loadiramo dinamicki
                    this.setState({component: cmp.default})
                })
        }
        render(){
            const C = this.state.component;
            //Ako je C postavljena vrati C kao komponentu, ako nije null
            //Spreadamo sve propertije u novi komponentu
            return C ? <C {...this.props} /> : null
        }
    }
}

export default asyncComponent