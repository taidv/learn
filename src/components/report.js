import React from 'react';

class Report extends React.Component {

    render() {

        const {report} = this.props;

        return (
            report ?
            <p> {report.id} - {report.name} : {report.value} </p>
            :
            <p>No report data! </p>
        )
    }
}

  
export default Report;