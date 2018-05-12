import React from 'react';
import { connect } from "react-redux";
import { fetchUserSuccess, fetchUserBegin, clearUser } from '../actions/userActions';

class User extends React.Component {

    render() {
        
        const { user, fetchUserBegin, clearUser } = this.props;

        return (
            <div>
                {user ?
                <table>
                    <thead>
                        <tr>
                            <th> User </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Company Name: </td> 
                            <td>{user.companyName} </td>
                        </tr>
                        <tr>
                            <td>Company Id: </td>
                            <td> {user.companyId} </td>
                        </tr>
                        <tr>
                            <td>UserName: </td>
                            <td> {user.username} </td>
                        </tr>
                        <tr>
                            <td>User ID: </td>
                            <td> {user.userId} </td>
                        </tr>
                        <tr>
                            <td>Email: </td>
                            <td> {user.email} </td>
                        </tr>
                    </tbody>
                </table>
                :
                <p>No user data!</p>}
                <button onClick={fetchUserBegin}>Refresh</button> - 
                <button onClick={clearUser}>Clear</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = {
    fetchUserSuccess,
    fetchUserBegin,
    clearUser
}

export default connect(mapStateToProps, mapDispatchToProps)(User);