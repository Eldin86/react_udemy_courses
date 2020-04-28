import React, { useState } from 'react'
/*KONTEKST KORISTIMO DA NE BI MORALI NEKU VRIJEDNOST PROSLIJEDITI KROZ SVAKU KOMPONENTU DA BI DOSLI DO
KRAJNJE KOMPONENTE, DAKLE DA NE PROSLIJEDIMO KROZ CIJELI KOMPONENT STABLO JEDNU VRIJEDNOST, NEGO TO
MOZEMO DIREKT KRANJOJ KOMPONENTI PROSLIJEDITI*/

//pocetna vrijednost konteksta
//postavimo login i isAuth vrijednosti koje su inicijalne
export const AuthContext = React.createContext({
    isAuth: false,
    login: () => { }
})

const AuthContextProvider = props => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const loginHandler = () => {
        setIsAuthenticated(true)
    }

    return (
        // value se automatski distribuira svima koji osluskuju
        // kao value proslijedimo vrijednosti iz pocetnog konteksta
        <AuthContext.Provider value={{ login: loginHandler, isAuth: isAuthenticated }}>
            {/* U authcontext mozemo da prslijedimo sta zelimo zbog props.children */}
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider