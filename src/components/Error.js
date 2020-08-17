import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';

// component Error should probably be as generic as possible so we can re-use
// for this reason we don't want this component to iterating over errors. Instead
// it is reponsible for doing exactly what the component name suggests -> print error
const Error = ((props) => {
    const { guest } = props;
    return (
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 error">
            <div id="list">
            <div className="error-msg">
                    <i className="fa fa-times-circle"></i>
            <p>Error! No menu generated for {guest}</p>
                    </div>
            </div>
        </div>
    );
});

export default Error;
