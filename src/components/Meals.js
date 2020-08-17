import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

const Meals = ((props) => {
    const { results } = props;
    const hasSchedules = results.length > 0;
    return hasSchedules && (
        <div>
            {results.map(dateObj => {
                const { date, guests } = dateObj;
                return(
                    <div key={date} className="col-xs-12  col-sm-12 col-md-12 col-lg-12">
                        <ol id="list">
                            {guests.map(guest => (
                                <li key={`${guest}${date}`} 
                                    className="morning">Breakfast for {guest} on {date}</li>
                            ))}

                            {guests.map(guest => (
                                <li key={`${guest}${date}`} 
                                    className="afternoon">Lunch for {guest} on {date}</li>
                            ))}

                            {guests.map(guest => (
                                <li key={`${guest}${date}`} 
                                    className="afternoon">Dinner for {guest} on {date}</li>
                            ))}
                        </ol>
                    </div>
                )
            })}
        </div>
    );
});

export default Meals;
