import React from 'react';
import User from './user';
import Reports from './reports';

class Top extends React.Component {
    render() {
        return (
            <div>
                <User />
                <Reports />
            </div>
        )
    }
}

export default Top;