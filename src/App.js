import React, {Component} from 'react';
import Bookings from './components/Bookings';
import Meals from './components/Meals';
import Error from './components/Error';

const getDatesList = (from, to) => {
    let arr = [];
    let dtFrom = new Date(from);
    let dtTo = new Date(to);
    let i = 0;
    while(dtFrom <= dtTo && i<20) {
        const curr = `${dtFrom.getUTCFullYear()}-${dtFrom.getUTCMonth()+1}-${dtFrom.getUTCDate()}`
        arr.push(curr);
        dtFrom.setUTCDate(dtFrom.getUTCDate() + 1);
        i++;
    };

    return arr;
}

const generateMealPlan = (search) => {
    const acc = {};
    for(let line of search) {
        const { dates: { from, to }, guest } = line;
        let dateRange = getDatesList(from, to);
        for(let date of dateRange) {
            if(!acc[date]) {
                acc[date] = {
                    guests: [],
                    ts: new Date(date).getTime(),
                    date
                };
            }

            acc[date].guests.push(guest);
        }
    }

    const sortFn = (a, b) => (a.ts - b.ts);
    return Object.keys(acc).map(k => acc[k]).sort(sortFn);
}

class App extends Component {
    constructor(props) {
        super(props);

        // we can set up a redux store and feed data via props, but there doesn't appear 
        // to be any http get or async retrieval so we'll start with a a react app state
        // which is responsible for passing data to child components.
        this.state = {
            search: []
        }
    }

    render() {
        const { search } = this.state;
        const errors = search.filter(res => !!res.dates.error).map(res => res.guest);
        const results = generateMealPlan(search);
        return (
            <div className="container-fluid">
                <center>
                    <h2>Menu scheduler</h2>
                </center>
                <div className="container">
                    <Bookings onSearchSchedules={search => this.setState({ search })} />
                    {errors.map(guest => <Error key={guest} guest={guest} />)}
                    <Meals results={results}></Meals>
                </div>
            </div>
        );
    }
}

export default App;