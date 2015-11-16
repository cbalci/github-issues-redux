import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router';

class App extends React.Component {
    render() {

        const logoStyle = {
            height: 40
        };

        return (
            <div>
                <div className="page-header">
                    <img className="pull-right"
                        style={logoStyle} src='images/golden_gate.gif' />
                    <h3>
                        <Link to='/'>
                            Golden Gate Issues
                        </Link>
                    </h3>
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default connect(i => i)(App);
