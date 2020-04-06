const initialState = {
    persons: []
}

const reducer = (state = initialState, actions) => {
    switch(actions.type){
        case 'ADD_PERSON':
            return{
                ...state,
                persons: state.persons.concat({
                    id: Math.random(), 
                    name: actions.personData.name, 
                    age: actions.personData.age
                })
            }
        case 'DELETE_PERSON':
            return{
                ...state,
                persons: state.persons.filter(person => person.id !== actions.personId)
            }
        default: ;
    }
    return state;
}

export default reducer