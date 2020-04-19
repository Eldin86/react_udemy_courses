import {BurgerBuilder} from './BurgerBuilder'
//koju god komponentu koristimo prilikom testiranja moramo je importovati
import Buildcontrols from '../../components/Burger/BuildControls/BuildControls'
import React from 'react'

//enzyme trebamo konfigurisati i konektovati za react verziju, sluzi da testiramo react komponente, za redux ne treba
//shallow sluzi da renderamo react komponente, trebamo ga koristiti sto cesce
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

//na ovaj nacin smo konektovali enzyme
configure({adapter: new Adapter()})

describe('<BurgerBuilder/>', () => {
    let wrapper;
    //Proslijedili smo funkciju, jer ona dohvaca ingredientse iz rduxa(servera?), bez nje imamo server
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>)

    it('should render <BuildControls/> when reciving ingredients', () => {
        //testiramo da li imamo salad 0 property
        wrapper.setProps({ings: {salad: 0}})
        expect(wrapper.find(Buildcontrols)).toHaveLength(1)
    })
})