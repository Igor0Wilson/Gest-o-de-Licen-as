import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { Filters } from '@components/Controllers/Filters';
import { Order, OrderProps } from '@components/Controllers/Order';
import { Container, Header, Title, Counter } from './styles';
import { Divider, Heading, HStack, Spinner } from 'native-base';
import { Load } from '@components/Controllers/Spinner';

export function Licences() {
  const [status, setStatus] = useState('open');
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<OrderProps[]>([]);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  return (
    <Container>
      <Filters onFilter={setStatus} />

      <Header>
        <Title>Licenças {status === 'open' ? 'Válidas' : 'Expiradas'}</Title>
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