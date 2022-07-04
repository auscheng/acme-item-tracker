import React from 'react';
import { connect } from 'react-redux';
import UserForm from './UserForm'
import axios from 'axios';

const Users = ({ users, deleteUser })=> {
    const belongings = (user) => {
        return (user.things) ?
            user.things.map((thing) => {
                return thing.name
            }).join(', ') :
            'nothing'
    };
    return (
        <div>
            <h1>Users</h1>
            <ul>
                {
                    users.map(user => {
                        return (
                            <li key={user.id}>
                                {user.name} owns {belongings(user)}
                                <button onClick={() => {
                                    deleteUser(user.id)
                                }}>X
                                </button>
                            </li>
                        );
                    })
                }
            </ul>
            <UserForm/>
        </div>
    );
}

const mapStateToProps = (state)=> {
  return {
    users: state.users
  };
}

const mapDispatchToProps = (dispatch)=> {
    return {
        deleteUser: async(id) => {
            await axios.delete(`/api/users/${id}`);
            dispatch( { type: 'DELETE_USER', payload: { id }});
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Users);
