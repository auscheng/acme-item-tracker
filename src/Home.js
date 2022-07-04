import React from 'react';
import { connect } from 'react-redux';

const Home = ({ users, things })=> {
  let bestThing = '';
  if (things.length!==0) {
      const maxRankThing = things.reduce((prev, curr) => {
          return (curr.ranking > prev.ranking) ? curr : prev
      })
      bestThing = maxRankThing.name
  } else {
    bestThing = ''
  }
  return (
    <div>
      <h1>Home</h1>
      <p>
        Here at the Acme Item Tracker Corp we have { users.length } users and { things.length } things!
      </p>
      <p>
        Best Thing: { bestThing }
      </p>
    </div>
  );
};

const mapStateToProps = (state)=> {
  return {
    users: state.users,
    things: state.things
  };
};

export default connect(mapStateToProps)(Home);
