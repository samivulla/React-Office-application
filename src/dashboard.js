import React, { Component } from 'react';
import './dashboard.css';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faCoffee, faHome, faPlus, faRemoveFormat, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import person from './assets/images/menImage.jpg';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import {
    addMessage,
    removeMessage
} from './actions';
import {
    Link
} from "react-router-dom";
import styless from './global.module.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
const styles = theme => ({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
    table: {
        minWidth: 650,
    },
});

class dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            showModal: false,
            selectedItem: null
        };
    }

    componentDidMount() {
        fetch("https://api.myjson.com/bins/15nuq4")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.items
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    toggle = (item) => {
        // this.setState({
        //     showModal: !this.state.showModal,
        //     selectedItem: item.name
        // })
    }

    closeModal = () => {
        this.setState({
            showModal: false
        })
    }

    updateInputValue = (evt) => {
        this.setState({
            selectedItem: evt.target.value
        });
    }

    addNewItem = () => {
        this.props.history.push('/addItem');
    }

    removeItem(itemId) {
        this.setState({
            items: this.state.items.filter(item => item.id != itemId)
        })
    }

    goToPage = (item) => {
        let path = '/' + `${item}`;
        this.props.history.push(path);
    }

    render() {
        const classes = this.props;
        if (this.props.messages && this.props.messages.length > 0) {
            this.props.messages.map((item, index) => {
                this.state.items.push(this.props.messages[index]);
            })
        }
        return (
            <div>
                <div className='display'>
                    <Button size="sm" className="button_styles" onClick={this.addNewItem}>
                        Add New Item
                </Button>
                    <Dropdown className="button_styles">
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Select
                    </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => this.goToPage('maps')}>Maps</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.goToPage('highcharts')}>HighCharts</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.goToPage('fileupload')}>Upload Files</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.goToPage('sidenav')}>SideNav</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Avengers</TableCell>
                                <TableCell>Age</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.items.map((row, index) => (
                                <TableRow key={index} className="listAligment" onClick={() => this.toggle(row)}>

                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>
                                        <img className="profile_img" src={require("./assets/images/" + row.image + ".jpg")} />
                                    </TableCell>
                                    <TableCell>{row.age}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.price}</TableCell>
                                    <TableCell onClick={() => this.removeItem(row.id)}> <FontAwesomeIcon icon={faTrashAlt} /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Modal show={this.state.showModal} backdrop="static">
                    <ModalHeader>
                        <ModalTitle>Details</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <input type='text' value={this.state.selectedItem} onChange={this.updateInputValue} />
                    </ModalBody>
                    <ModalFooter onClick={this.closeModal}>Close</ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default connect(
    ({ messages }) => ({ messages }),
    {
        addMessage,
        removeMessage
    }
)(withStyles(styles)(dashboard));


