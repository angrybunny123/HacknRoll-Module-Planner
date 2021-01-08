import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
import classes from "./Auth.module.css";

import Navbar from "./components/Navbar/Navbar";
import Input from "./components/FormElement/Input/Input";
import * as actions from "./store/AuthAction";

class Auth extends Component {
    state = {
        credential: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Email",
                },
                value: "",
                validator: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Password",
                },
                value: "",
                validator: {
                    required: true,
                    minLength: 8,
                },
                valid: false,
                touched: false,
            },
        },
        isSignup: false,
    };

    checkValidity(value, rules) {
        let isValid = true;

        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, credentialName) => {
        console.log(credentialName, event.target.value);
        const updatedCredentials = {
            ...this.state.credential,
            [credentialName]: {
                ...this.state.credential[credentialName],
                value: event.target.value,
                valid: this.checkValidity(
                    event.target.value,
                    this.state.credential[credentialName].validator
                ),
                touched: true,
            },
        };
        this.setState({ credential: updatedCredentials });
    };

    submitHandler = (event) => {
        event.preventDefault();
        if (!this.state.isSignup) {
            console.log("isSignup false ", this.state.isSignup);
            this.props.onAuth(
                this.state.credential.email.value,
                this.state.credential.password.value,
                this.state.isSignup
            );
        } else {
            console.log("isSignup true ", this.state.isSignup);
            this.props.onAuth(
                this.state.credential.email.value,
                this.state.credential.password.value,
                this.state.isSignup
            );
        }
    };

    switchAuthModeHandler = () => {
        console.log(this.state.isSignup);
        if (this.state.isSignup === false) {
            //Change to Sign Up
            this.setState(
                {
                    isSignup: true,
                },
                () => {
                    console.log(this.state.isSignup);
                }
            );
        } else {
            this.setState(
                {
                    //Change back to Log In
                    isSignup: false,
                },
                () => {
                    console.log(this.state.isSignup);
                }
            );
        }
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.credential) {
            if (this.state.credential[key]) {
                formElementsArray.push({
                    id: key,
                    config: this.state.credential[key],
                });
            }
        }

        let form = formElementsArray.map((formElement) => (
            <Input
                key={formElement.id}
                label={formElement.config.elementConfig.placeholder}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validator}
                touched={formElement.config.touched}
                changed={(event) =>
                    this.inputChangedHandler(event, formElement.id)
                }
            />
        ));

        if (this.props.loading) {
            form = <h1>Loading</h1>;
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>;
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to="/" />;
        }

        return (
            <div>
                <Navbar
                    isAuthenticated={localStorage.getItem("token") !== null}
                />
                <div className={classes.Auth}>
                    {authRedirect}
                    {errorMessage}
                    <form>
                        {form}
                        <Button onClick={this.submitHandler}>SUBMIT</Button>
                    </form>
                    <Button
                        className={classes.Button}
                        onClick={this.switchAuthModeHandler}
                    >
                        SWITCH TO {this.state.isSignup ? "SIGN IN" : "SIGN UP"}
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
        error: state.auth.error,
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) =>
            dispatch(actions.auth(email, password, isSignup)),
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Auth);
