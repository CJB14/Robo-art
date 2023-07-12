import React, { useState } from 'react';
import { useStripe } from 'react-stripe-js';

const Donate = () => {
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState(null);

  const stripe = useStripe();

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'amount':
        setAmount(value);
        break;
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = await stripe.createToken({
        amount: amount,
        currency: 'usd',
        name: name,
        email: email,
      });
      setToken(token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Donate</h1>
      <input
        type="number"
        placeholder="Amount"
        name="amount"
        value={amount}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Donate</button>
      {token && <p>Token: {token.id}</p>}
    </div>
  );
};

export default Donate;
