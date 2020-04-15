//Page u kojem se sign in i sign up
import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom'

class Auth extends Component {
    state = {
        //Postavke za input elemente za authentication page
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    //Minlength je takojder zahtjeva da imamo 6 karaktera za passowrd
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignup: true
    }

    //promjenimo putanju ako ne kreiramo burger
    componentDidMount() {
        if(!this.props.burgerBuilder && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath()
        }
    }

    checkValidity = (value, rules) => {
        let isValid = true
        //Ako nemamo rules objekta vrati true
        if (!rules) {
            return true
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        return isValid
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        //dispatchamo action u koji proslijedimo vrijednosti email i password vrijednosti inputa
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    }

    //handler za switchanje sign up i sign in moda
    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup }
        })
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        console.log('[Auth -> formElementsArray]', formElementsArray)

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                invalid={!formElement.config.valid}
                //Tip inputa koji nam treba
                elementType={formElement.config.elementType}
                //Objekat u kojem su validation atributi
                shouldValidate={formElement.config.validation}
                //Da li je user vec unio karakter u polje
                touched={formElement.config.touched}
                //proslijedimo objekat koji u Input komponenti spreadamo
                elementConfig={formElement.config.elementConfig}
                //value atribut unutar input elementa
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ))

        //Ako je state u reduxu loading: true prikazi spinner
        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }
        //Pri uspjesnom logovanju redirekta nas na burgerBuilder
        //Redirecta nas nakon uspjesnog logovanja, na 2 razlicite putanje, jedna je na '/', druga na '/checkout'
        let authRedirect = null
        if(this.props.isAuthenticated){
            //imamo 2 redirecta, jedan za '/', drugi za '/checkout', ovisno da li smo authenticated ili ne?
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (
            <div className={classes.Auth}>
                {/* nakon logina da nas redirekta na burgerBuilder page */}
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button clicked={this.switchAuthModeHandler} btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapdispatchToProps = dispatch => {
    return {
        //na submit button dispatchamo action
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapdispatchToProps)(Auth)