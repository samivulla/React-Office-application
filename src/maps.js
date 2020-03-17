import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react';
import Marker from './marker.js';
import './dashboard.css'
const AnyReactComponent = ({ text }) => <div>{text}</div>;
export class maps extends Component {
    static defaultProps = {
        center: {
            lat: 12.926184,
            lng: 77.688531
        },
        zoom: 16,
        greatPlaceCoords: { lat: 59.724465, lng: 30.080121 }
    };

    backToDashboard = () => {
        this.props.history.push('/dashboard');
    }
    render() {
        return (
            <div>
                <button className='backbutton' onClick={this.backToDashboard}>Back To Dashboard </button>
                <div style={{ height: '100vh', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyBiBGd1wMllwtgMRY2crh7_t_WK7EhqZ54' }}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                    >
                        <Marker
                            lat={11.0168}
                            lng={76.9558}
                            name="My Marker"
                            color="blue"
                        />
                    </GoogleMapReact>
                </div>
            </div>
        )
    }
}

export default maps
