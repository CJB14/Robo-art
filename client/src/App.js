import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Profile from './pages/Profile';
import NoMatch from './pages/NoMatch';
import { StoreProvider } from './utils/GlobalState';
import OrderHistory from './pages/OrderHistory';
import Detail from './pages/Detail';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <StoreProvider>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route path="/orderHistory" component={OrderHistory} />
              <Route path="/products/:id" component={Detail} />
              <Route path="*" component={NoMatch} />
            </Switch>
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
