import React from 'react';
import { connect } from "react-redux";
import Report from './report';
import { fetchReportsSuccess, fetchReportsBegin, clearReports } from '../actions/reportActions';

class Reports extends React.Component {

    render() {
        
        const {reports, fetchReportsBegin, clearReports} = this.props;
        console.log(this);
        return (
            <div>
                {reports && reports.length > 0 ? 
                reports.map(report => <Report key={report.id} report={report} />) 
                : <p>No report data! </p>}
                <button onClick={fetchReportsBegin}>Refresh</button> - 
                <button onClick={clearReports}>Clear</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reports: state.report.reports
});

const mapDispatchToProps = {
    fetchReportsSuccess,
    fetchReportsBegin,
    clearReports
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Reports);