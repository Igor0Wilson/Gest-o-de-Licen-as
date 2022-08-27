import { Button } from '@components/Controllers/Button';
import styled from 'styled-components/native';

export const Form = styled.View``;

export const Title = styled.Text`
  font-size: 20px;
  margin-bottom: 24px;
  margin-top: 24px;
  align-self: flex-start;
  font-family: ${({ theme }) => theme.FONTS.TITLE};
  color: ${({ theme }) => theme.COLORS.TEXT};
`;

export const Footer = styled.View`    
  flex-direction: row;
  justify-content: space-between;
  align-items: center; 
  margin-top: 50px; 
`;
