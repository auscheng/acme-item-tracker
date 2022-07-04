import React from 'react';
import ThingForm from './ThingForm';
import { connect } from 'react-redux';
import axios from 'axios';

const Things = ({ things, users, deleteThing, increaseRank, decreaseRank })=> {
    const owners = (thing)=> {
        return (thing.users) ?
        thing.users.map((user) => { return user.name }).join(', ') :
        'no one'}
    return (
        <div>
            <h1>Things</h1>
            <ul>
                {
                    things.map(thing => {
                        return (
                            <li key={thing.id}>
                                {thing.name}, {thing.ranking},
                                <button onClick={() => {
                                    increaseRank(thing.id, thing.ranking + 1)
                                }}>+
                                </button>
                                <button onClick={() => {
                                    decreaseRank(thing.id, thing.ranking - 1)
                                }}>-
                                </button>
                                <button onClick={() => {
                                    deleteThing(thing.id)
                                }}>X
                                </button>
                                ,
                                owned by {owners(thing)?owners(thing):'no one'}
                                <form>
                                    <label>
                                        <select>
                                            <option>No User</option>
                                            {users.map((user)=>{
                                                return <option>{user.name}</option>
                                            })}

                                        </select>
                                    </label>
                                    <input type='submit' value='Add User' />
                                </form>
                            </li>
                        );
                    })
                }
            </ul>
            <ThingForm/>
        </div>
    );
};

const mapStateToProps = (state)=> {
    return {
        things: state.things,
        users: state.users
    };
}
const mapDispatchToProps = (dispatch)=> {
    return {
        deleteThing: async(id)=> {
            await axios.delete(`/api/things/${id}`);
            dispatch({ type: 'DELETE_THING', payload:{ id }});
        },
        increaseRank: async(id, newRanking) => {
            await axios.put(`/api/things/${id}`, { ranking: newRanking});
            dispatch({ type: 'INCREASE_RANK', payload:{ id, newRanking }})
        },
        decreaseRank: async(id, newRanking) => {
            await axios.put(`/api/things/${id}`, { ranking: newRanking});
            dispatch({ type: 'DECREASE_RANK', payload:{ id, newRanking }})
        }
    };
    // return {
    //     async deleteThing(id) {
    //         await axios.delete(`/api/things/${id}`);
    //         dispatch({ type: 'DELETE_THING', payload:{ id }})
    //     }
    // };
    // return {
    //     deleteThing: async function(id) {
    //         await axios.delete(`/api/things/${id}`);
    //         dispatch({ type: 'DELETE_THING', payload:{ id }})
    //     }
    // };
};
export default connect(mapStateToProps, mapDispatchToProps)(Things);
