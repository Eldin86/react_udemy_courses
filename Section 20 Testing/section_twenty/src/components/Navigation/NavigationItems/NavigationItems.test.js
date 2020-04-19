//enzyme trebamo konfigurisati i konektovati za react verziju
//shallow sluzi da renderamo react komponente, trebamo ga koristiti sto cesce
//enzyme sluzi da testiramo react komponente, za redux ne treba
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

//na ovaj nacin smo konektovali enzyme
configure({adapter: new Adapter()})

//prima 2 argumenta, prvi je opis test budel-a koji file ima, drugi je test funkcija u kojoj pisemo test
describe('<NavigationItems/> komponenta',  () => {
    let wrapper;
    //funkcija koja se izvrsi prije svih testova
    //prima funkciju kao argument, koja se izvrsava prije svih testova
    beforeEach(() => {
         //u shallow proslijedimo JSX
        //Spremimo rezultat u konstantu
        wrapper = shallow(<NavigationItems/>)
    })

    //opisuje da pisemo jedan individualan test, prima 2 argumenta, prvi e opis sta treba da radi test
    //drugi je testing funkcija
    it('should render two <NavigationItem/> elements if not authenticated', () => {
        //pisemo ocekivanja koja trbamo za komponentu
        //u expect pisemo stvari koje trebamo provjeriti
        //find metoda sluzi da pronadjemo odredjeni sadrzaj ako postoji
        //find ne prima JSX nego obicnu funkciju, posto je komponenta funkcija
        //toHaveLength metoda kojom kazemo da ocekujemo 2 elementa, odnosno koliko elemenata postiji
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })

    //Ovdje testiramo da li imamo 3 nav itemsa ako smo authenticated
    it('should render three <NavigationItem/> elements if authenticated', () => {
        //Posto testiramo da li imamo 3 navigacije kad smo authenticated, i posto je authenticated
        //props od kojeg ovisi rezultat, moramo ga proslijediti u JSX koji je u shallow metodi
        //test sa isAuthenticated je primjer kad smo jedan po jedan test pisali
        /*const wrapper = shallow(<NavigationItems isAuthenticated/>)*/
        //setProps metoda u koju mozemo da proslijedimo props koji zelimo da testiramo
        //prima objekat sa key value parom, naziv propa, i vrijednost
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })

    //testiramo odredjenu vrijednost da li postoji
    it('should render three <NavigationItem/> elements if authenticated', () => {
        //i ovdje smo proslijedili isAuthenticated posto rezultat ovisi od tog props-a
        wrapper.setProps({isAuthenticated: true})
        //provjeravamo da li postoji odredjeni NODE, u ovom slucaju Logout
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(false)
    })
})