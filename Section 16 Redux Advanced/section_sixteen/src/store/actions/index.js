//grupisemo sve exporte iz razlicitih fajlova
//Iz index.js cemo da importujemo u fajlove u koje nam trebaju ovi actionsi
export {
    add,
    subtract,
    increment,
    decrement
} from './counter'
export {
    deleteResult,
    storeResult
} from './result'