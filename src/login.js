import React, { Component } from 'react';
import './login.css';
import ReactSelect from "react-select";
import { Redirect } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
class login extends Component {
    constructor() {
        super();
        this.textInput = React.createRef();
        this.state = {
            form: {
                name: "",
                email: "",
                mobile: "",
                password: "",
                language: [],
                country: ""
            },
            formErrors: {
                name: null,
                email: null,
                mobile: null,
                password: null,
                language: null,
                country: null
            }
        };

        this.countryList = [
            { value: "india", label: "India" },
            { value: "us", label: "US" },
            { value: "australia", label: "Australia" }
        ];
        this.languageList = [
            { value: "english", label: "English" },
            { value: "hindi", label: "Hindi" },
            { value: "spanish", label: "Spanish" },
            { value: "arabic", label: "Arabic" }
        ];
    }

    componentDidMount() {
        this.textInput.current.focus();
    }
    //validate phone number 
    validateNumber = evt => {
        var theEvent = evt || window.event;

        // Handle paste
        if (theEvent.type === "paste") {
            key = theEvent.clipboardData.getData("text/plain");
        } else {
            // Handle key press
            var key = theEvent.keyCode || theEvent.which;
            key = String.fromCharCode(key);
        }
        var regex = /[0-9]|\./;
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
        }
    };

    //handle the changes in each field.
    handleChange = e => {
        const { name, value, checked } = e.target;
        const { form, formErrors } = this.state;
        let formObj = {};
        if (name === "language") {
            // handle the change event of language field
            if (checked) {
                // push selected value in list
                formObj = { ...form };
                formObj[name].push(value);
            } else {
                // remove unchecked value from the list
                formObj = {
                    ...form,
                    [name]: form[name].filter(x => x !== value)
                };
            }
        } else {
            // handle change event except language field
            formObj = {
                ...form,
                [name]: value
            };
        }
        this.setState({ form: formObj }, () => {
            if (!Object.keys(formErrors).includes(name)) return;
            let formErrorsObj = {};
            if (name === "password") {
                let refValue = this.state.form[
                    "password"
                ];
                const errorMsg = this.validateField(name, value, refValue);
                formErrorsObj = { ...formErrors, [name]: errorMsg };
                if (!errorMsg && refValue) {
                    formErrorsObj.password = null;
                }
            } else {
                const errorMsg = this.validateField(
                    name,
                    name === "language" ? this.state.form["language"] : value
                );
                formErrorsObj = { ...formErrors, [name]: errorMsg };
            }
            this.setState({ formErrors: formErrorsObj });
        });
    };

    //validate the field 
    validateField = (name, value, refValue) => {
        let errorMsg = null;
        switch (name) {
            case "name":
                if (!value) errorMsg = "Please enter Name.";
                break;
            case "email":
                if (!value) errorMsg = "Please enter Email.";
                else if (
                    !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                        value
                    )
                )
                    errorMsg = "Please enter valid Email.";
                break;
            case "mobile":
                if (!value) errorMsg = "Please enter Mobile.";
                break;
            case "country":
                if (!value) errorMsg = "Please select Country.";
                break;
            case "password":
                // refValue is the value of Confirm Password field
                if (!value) errorMsg = "Please enter Password.";
                else if (refValue && value !== refValue)
                    errorMsg = "Password and Confirm Password does not match.";
                break;
            case "language":
                if (value.length === 0) errorMsg = "Please select Language.";
                break;
            default:
                break;
        }
        return errorMsg;
    };

    //validate the form
    validateForm = (form, formErrors, validateFunc) => {
        const errorObj = {};
        Object.keys(formErrors).map(x => {
            let refValue = null;
            if (x === "password" || x === "confirmPassword") {
                refValue = form[x === "password" ? "confirmPassword" : "password"];
            }
            const msg = validateFunc(x, form[x], refValue);
            if (msg) errorObj[x] = msg;
        });
        return errorObj;
    };

    handleSubmit = (e) => {
        const { form, formErrors } = this.state;
        const errorObj = this.validateForm(form, formErrors, this.validateField);
        if (Object.keys(errorObj).length !== 0) {
            this.setState({ formErrors: { ...formErrors, ...errorObj } });
            return false;
        }
        this.setState({
            form: {
                name: "",
                email: "",
                mobile: "",
                password: "",
                language: [],
                country: ""
            }
        });

        alert('You have successfully Logged In :)');
        // return  <Redirect  to="/dashboard" />
        //<Redirect to={{pathname: '/dashboard', state: {from: form}}} />
        this.props.history.push('/sidenav');
        localStorage.setItem('myData', JSON.stringify(form));
    };

    render() {
        const { form, formErrors } = this.state;
        const responseFacebook = (response) => {
            console.log(response);
        }

        const responseGoogle = (response) => {
            console.log(response);
        }
        return (
            <>
                <div className="signup-box">
                    <p className="title">Login</p>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>
                                    Name:<span className="asterisk">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={this.handleChange}
                                    onBlur={this.handleChange}
                                    ref={this.textInput}
                                />
                                {formErrors.name && (
                                    <span className="err">{formErrors.name}</span>
                                )}
                            </div>
                            <div className="form-group">
                                <label>
                                    Email:<span className="asterisk">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="email"
                                    value={form.email}
                                    onChange={this.handleChange}
                                    onBlur={this.handleChange}
                                />
                                {formErrors.email && (
                                    <span className="err">{formErrors.email}</span>
                                )}
                            </div>
                            <div className="form-group">
                                <label>
                                    Password:<span className="asterisk">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={this.handleChange}
                                    onBlur={this.handleChange}
                                />
                                {formErrors.password && (
                                    <span className="err">{formErrors.password}</span>
                                )}
                            </div>
                            <div className="form-group">
                                <label className="mr-3">
                                    Language:<span className="asterisk">*</span>
                                </label>
                                <div className="form-control border-0 p-0 pt-1">
                                    {this.languageList.map((x, i) => {
                                        return (
                                            <label key={i} className="mr-2">
                                                <input
                                                    type="checkbox"
                                                    name="language"
                                                    value={x.value}
                                                    checked={form.language.includes(x.value)}
                                                    onChange={this.handleChange}
                                                />{" "}
                                                {x.label}
                                            </label>
                                        );
                                    })}
                                </div>
                                {formErrors.language && (
                                    <span className="err">{formErrors.language}</span>
                                )}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>
                                    Mobile:<span className="asterisk">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="mobile"
                                    value={form.mobile}
                                    onChange={this.handleChange}
                                    onBlur={this.handleChange}
                                    onKeyPress={this.validateNumber}
                                />
                                {formErrors.mobile && (
                                    <span className="err">{formErrors.mobile}</span>
                                )}
                            </div>
                            <div className="form-group">
                                <label>
                                    Country:<span className="asterisk">*</span>
                                </label>
                                <ReactSelect
                                    name="country"
                                    options={this.countryList}
                                    value={this.countryList.find(x => x.value === form.country)}
                                    onChange={e =>
                                        this.handleChange({
                                            target: {
                                                name: "country",
                                                value: e.value
                                            }
                                        })
                                    }
                                />
                                {formErrors.country && (
                                    <span className="err">{formErrors.country}</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <input
                            type="button"
                            className="btn btn-primary"
                            value="Submit"
                            onClick={this.handleSubmit}
                        />
                    </div>

                    {/* <FacebookLogin
                        appId="" //APP ID NOT CREATED YET
                        fields="name,email,picture"
                        callback={responseFacebook}
                    />
                    <br />
                    <GoogleLogin
                        clientId="" //CLIENTID NOT CREATED YET
                        buttonText="LOGIN WITH GOOGLE"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                    /> */}


                </div>
            </>
        );
    }
}

export default login;