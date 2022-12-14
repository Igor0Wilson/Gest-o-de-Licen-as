import styled from 'styled-components/native';

export const Form = styled.View`
  width: 100%;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-family: ${({ theme }) => theme.FONTS.TITLE};
  color: ${({ theme }) => theme.COLORS.TEXT};
  margin-bottom: 24px;
  align-self: center;
`;

export const ErrorText = styled.Text`
  font-size: 12px;
  color: red;
`;



