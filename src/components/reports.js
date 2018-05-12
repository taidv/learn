import React from 'react';
import { connect } from "react-redux";
import * as types from '../constants/actionTypes';
import Report from './report';

class Reports extends React.Component {

    render() {
        
        const {reports} = this.props;

        return (
            <div>
                {reports && reports.length > 0 ? 
                reports.map(report => <Report key={report.id} report={report} />) 
                : <p>No report data! </p>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reports: state.report
});

function mapDispatchToProps(dispatch) {
    return {
      loadReports : function() {
        return dispatch({type: types.FETCH_REPORTS_SUCCESS});
      }
    };
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Reports);