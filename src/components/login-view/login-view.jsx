// Implements useState Hook
import React, { useState } from 'react';

export function LoginView(props) {
    const [ username, setUsername] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        // Send a request to the server for authentication
        // then call props.onLoggenIn(username)
        //props.onLoggedIn(username);
    };
}