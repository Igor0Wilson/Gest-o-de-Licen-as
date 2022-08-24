import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { Order, OrderProps } from '@components/Controllers/Order';
import { Container, Header, Title, Counter } from './styles';
import { Load } from '@components/Layout/Spinner';

export function Client() {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<OrderProps[]>([]);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  return (
    <Container>

      <Header>
        <Title>Clientes cadastrados</Title>
        <Counter>{orders.length}</Counter>
      </Header>

      {
        isLoading ?
        <Load />
        : <FlatList
          data={orders}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Order data={item} />}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        /> 
      }
    </Container>
  );
}