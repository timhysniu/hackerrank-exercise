import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

/**
 * Return date range object if valid range input. Otherwise return null.
 * 
 * @param {string} rangeStr 
 * @return {object}
 */
const getDateRange = (rangeStr) => {
  const datePieces = rangeStr.split(' to ');
  if(datePieces.length < 2) return { error: 'unknown error'};
  const [from, to] = datePieces;
  const dateFrom = Date.parse(from);
  const dateTo = Date.parse(to);

  // forcing to bool tells us if parse wasn't successful.
  // if parse isn't successful then its invalid date.
  if(!dateFrom || !dateTo) {
    return { error: 'range has invalid date'};
  }

  if(dateFrom > dateTo) {
    return { error: 'range is invalid'};
  }

  return {
    from,
    to
  };
};



class Bookings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guest: '',
      dateRange: ''
    }
  }

  handleGuestInfo(e) {
    this.setState({ guest: e.target.value });
  }

  handleDateInfo(e) {
    this.setState({ dateRange: e.target.value });
  }

  searchSchedules() {
    const { onSearchSchedules } = this.props;
    const { dateRange, guest } = this.state;

    const arrDateRange = dateRange.split('\n');
    const arrGuests = guest.split('\n');

    if(arrDateRange.length !== arrGuests.length) {
      throw new Error('invalid lengths');
    }

    let searchInput = [];
    for(let i =0; i<arrDateRange.length; i++) {
      const dates = getDateRange(arrDateRange[i]);
      if(dates && arrGuests[i]) {
        searchInput.push({
          dates,
          guest: arrGuests[i]
        });
      }
    }

    onSearchSchedules(searchInput);
  }

  render() {
    return (
      <div className="row">
        <TextField
          onChange={e => this.handleGuestInfo(e)}
          className="col-md-6"
          multiline
          rows="4"
          placeholder="Enter the names (one name per line)"
        />
        <TextField
          onChange={e => this.handleDateInfo(e)}
          className="col-md-6"
          multiline
          rows="4"
          placeholder="Enter the date range for each name (one range per line)"
        />
        <Button 
          variant="outlined" 
          color="primary" 
          className="block-center"
          onClick={() => this.searchSchedules()}
        >Get Meals Schedule</Button>
      </div>
    );
  }
}

Bookings.propTypes = {
  onSearchSchedules: PropTypes.func.isRequired
};

export default Bookings;