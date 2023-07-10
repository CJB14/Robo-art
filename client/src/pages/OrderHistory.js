import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { Container, Card, Image, Icon } from 'semantic-ui-react';
import '../App.css';

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }

  return (
    <div className="order-history-page">
      <Container>
      <div className="back-to-products">
          <Link to="/">
            <Icon name="arrow alternate circle left" className="back-icon" />
          </Link>
        </div>

        {user ? (
          <>
            <h2>
              Order History for {user.firstName} {user.lastName}
            </h2>
            {user.orders.map((order) => (
              <div key={order._id} className="my-2">
                <h3>
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h3>
                <div className="flex-row">
                  {order.products.map(({ _id, image, name, price }, index) => (
                    <Card key={index} className="px-1 py-1">
                      <Link to={`/products/${_id}`}>
                        <Image src={`/images/${image}`} alt={name} />
                        <Card.Content>
                          <Card.Description>{name}</Card.Description>
                        </Card.Content>
                      </Link>
                      <Card.Content extra>
                        <span>${price}</span>
                      </Card.Content>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : null}
      </Container>
    </div>
  );
}

export default OrderHistory;
