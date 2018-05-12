import React from 'react';
import { connect } from "react-redux";
import * as types from '../constants/actionTypes';

class User extends React.Component {

    render() {
        
        const {user} = this.props;

        return (
            user ?
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
            <p>No user data!</p>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
});

function mapDispatchToProps(dispatch) {
    return {
        loadUser : function() {
            return dispatch({type: types.FETCH_USER_SUCCESS});
        }
    };
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(User);