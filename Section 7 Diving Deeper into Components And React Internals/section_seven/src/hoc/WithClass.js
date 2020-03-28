import React from 'react'
//HOC komponenta koja dodaje nesto komponenti koju omotava
//Prvi argument je komponenta koju prima, mora poceti sa velikim slovom
//Drugi je nesto sto trebamo u HOC-u, zavisi kakvu HOC kreiramo i za sta nam treba
//Mozemo imati koliko god argumenata, u ovisnosti sta treba da radi HOC
const withClass = (WrappedComponent, className) => {
    //U returnu vratimo funkcionalnu komponentu
    //ovi props su props od wraped komponente
    return props => (
        <div className = {className}>
            {/* Ukoliko imamo propertije da proslijedimo u komponentu proslijedimo ih preko props i spreadamo */}
            {<WrappedComponent {...props}/>}
        </div>
    )
}

export default withClass


//I NACIN KREIRANJA HOC
// const withClass = (props) => {
//     return (
//         <div className={props.classes}>
//             {props.children}
//         </div>
//     )
// }

// export default withClass