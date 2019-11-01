import React, { useState, useEffect } from 'react';

import Card from '../card/card.component';

const UseEffectExample = () => {
  const [user, setUser] = useState(null); //useState gives us back 2 values in a desctructured array' first one is the state, the second value is a function that allows us set the first value aka state. null is the initial value of user
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => { //unlike useState, useEffetc does not get back any value. Instead it gets a function that gets called whenever the component changes/updates and rerenders. It mimics componentDidMount and update lifecycle methods
    if (searchQuery.length) { //conditionals to be only used INSIDE the hooks functions, can't wrap them outside
    const fetchFunc = async () => {
      //console.log('hello'); //this will log every time we change the input just like what setState will do in a class componenet
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?username=${searchQuery}`
      );
      const resJson = await response.json();
      setUser(resJson[0]);
    };

    fetchFunc();
    }
  }, [searchQuery]); //[searchQuery] is the secondary parameter that will tell useEffect to only fire when searchQuery changes. If we take it off and console log anything inside the main function, setUser will fire useEffecy again, and this loop goes infinitly. if this array is empty then we will see an affect simillr to componentDidMount

  return (
    <Card>
      <input
        type='search'
        value={searchQuery}
        onChange={event => setSearchQuery(event.target.value)}
      />
      {user ? (
        <div>
          <h3>{user.name}</h3>
          <h3> {user.username} </h3>
          <h3> {user.email} </h3>
        </div>
      ) : (
        <p>No user found</p>
      )}
    </Card>
  );
};

export default UseEffectExample;
