import React, { useState } from 'react';

import { Form, Title } from './styles';
import { Input } from '@components/Controllers/Input';
import { Button } from '@components/Controllers/Button';
import { TextArea } from '@components/Controllers/TextArea';

export function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleNewUser() {
    setIsLoading(true);
  }

  return (
    <Form>
    <Title>Cadastrar</Title>
    <Input placeholder="E-mail" onChangeText={setEmail} />
    <Input placeholder="Senha" secureTextEntry onChangeText={setPassword} />
    <Button title="Cadastrar" isLoading={isLoading} onPress={handleNewUser} />
  </Form>
  );
}