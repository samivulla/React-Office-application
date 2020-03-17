import React, { Component } from 'react';
import image from './assets/images/laptop.jpg';
import image1 from './assets/images/image1.jpg';
import image2 from './assets/images/image2.jpg';
import kayboard from './assets/images/keyboard.jpg';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './global.module.css';
const imgStyle = {
    color: 'green',
    backgroundImage: 'url(' + kayboard + ')',
    padding: '200px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    textAlign: 'center',
    fontSize: '42px',
};
const divStyle = {
    padding: '50px'
}
class home extends Component {
    render() {
        return (
            <div>

                <div style={imgStyle}><span>Welcome to React Js Application</span></div>
                <Row className={styles.padding20 + ' ' + styles.margin0}>
                    <Col xs={6} md={4}>
                        <img src={image} width="100%" height="400px" className={styles.shadow} />
                    </Col>
                    <Col xs={6} md={4}>
                        <img src={image1} width="100%" height="400px" className={styles.shadow} />
                    </Col>
                    <Col xs={6} md={4}>
                        <img src={image2} width="100%" height="400px" className={styles.shadow} />
                    </Col>
                </Row>
                <div className={styles.footer}>
                    <Row className={styles.textCenter + ' ' + styles.margin0}>
                        <Col xs={6} md={4}>
                            <p>Home</p>
                        </Col>
                        <Col xs={6} md={4}>
                            <p>About</p>
                        </Col>
                        <Col xs={6} md={4}>
                            <p>Contact</p>
                        </Col>
                    </Row>
                </div>

                {/* <Row className={styles.margin0  + ' ' + styles.contentCenter}>
                    <Col xs lg="2">
                    </Col>
                    <Col md="auto">
                    <h3 className={styles.margin0}  style={divStyle}>Variable width content</h3></Col>
                    <Col xs lg="2">
                    </Col>
                </Row> */}

            </div>
        );
    }
}

export default home;