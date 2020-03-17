import React, { Component } from 'react'
import './addNewItem.css';
import ReactSelect from "react-select";
import Dashboard from './dashboard';
import { connect } from 'react-redux'
import {
    addMessage,
    removeMessage
} from './actions';
import DatePicker from "react-datepicker";
export class addNewItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            age: '',
            price: '',
            image: '',
            startDate: new Date()
        };

        this.imageList = [
            { value: "batman", label: "BatMan" },
            { value: "captain", label: "Captain America" },
            { value: "hulk", label: "Hulk" },
            { value: "iron", label: "Iron Man" },
            { value: "loki", label: "Loki" },
            { value: "superman", label: "SuperMan" },
            { value: "thor", label: "Thor" },
        ];
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleChange = date => {
        this.setState({
            startDate: date
        });



        var today = new Date();
        var birthDate = new Date(date);  // create a date object directly from `dob1` argument
        var age_now = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age_now--;
        }
        this.setState({
            age:age_now
        })
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) => {
        const { form } = this.state;
        this.props.addMessage(this.state);
        //<Redirect to={{pathname: '/dashboard', state: {from: form}}} />
        this.props.history.push('/dashboard');
    };

    render() {
        const { form } = this.state;
        return (
            <div className="signup-box">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>
                                Name:
                                </label>
                            <div>
                                <input
                                    name="name"
                                    type="text"
                                    value={this.state.name}
                                    onChange={this.handleInputChange} />
                            </div>

                        </div>
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                        />
                        <div className="form-group">
                            <label>
                                Age :
                            </label>
                            <div>
                                <input
                                    name="age"
                                    type="number"
                                    value={this.state.age}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>
                                Avengers :
                                </label>
                            <ReactSelect
                                name="image"
                                options={this.imageList}
                                value={this.imageList.find(x => x.value === this.state.image)}
                                onChange={e =>
                                    this.handleInputChange({
                                        target: {
                                            name: "image",
                                            value: e.value
                                        }
                                    })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                Price :
                            </label>
                            <div>
                                <input
                                    name="price"
                                    type="text"
                                    value={this.state.price}
                                    onChange={this.handleInputChange} />
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
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    ({ messages }) => ({ messages }),
    {
        addMessage,
        removeMessage
    }
)(addNewItem)
