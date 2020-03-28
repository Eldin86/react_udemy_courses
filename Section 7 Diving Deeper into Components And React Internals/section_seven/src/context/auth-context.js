import React from 'react'

//Context je globlano dostupan objekat ili bilo sta, odnosno mi odlucujemo gdje je dostupan
//Dozvoljava nam da definisemo pocetne vrijednosti
const authContext = React.createContext({
    authenticated: false, 
    login: () => {}
});

export default authContext