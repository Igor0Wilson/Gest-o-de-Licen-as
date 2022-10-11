import styled from "styled-components/native";

export const Container = styled.View`
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 30px;
  margin-left: 15px;
  margin-bottom: 15px;
  width: 100%;
  height: 50px;
`;

export const Greeting = styled.View``;

export const Title = styled.Text`
  font-size: 24px;
  font-family: ${({ theme }) => theme.FONTS.TITLE};
  color: #fff;
`;

export const SubTitle = styled.Text`
  font-size: 15px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: #fff;
`;
