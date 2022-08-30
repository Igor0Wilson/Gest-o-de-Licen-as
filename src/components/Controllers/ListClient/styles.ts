import styled from "styled-components/native";

export type ClientStyleProps = {
  isValid: true | false;
};

export const Container = styled.View`
  width: 100%;
  height: 94px;
  flex-direction: row;
  overflow: hidden;
  margin-bottom: 16px;
`;

export const Content = styled.View`
  flex: 1;
  height: 94px;
  padding: 0 15px;
  justify-content: center;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const Header = styled.View`
  flex-direction: row;
`;

export const Status = styled.View<ClientStyleProps>`
  width: 10px;
  height: 94px;
  background-color: ${({ theme, isValid }) =>
    isValid === true ? theme.COLORS.PRIMARY : theme.COLORS.SECONDARY};
`;

export const Title = styled.Text`
  flex: 1;
  font-size: 16px;
  font-family: ${({ theme }) => theme.FONTS.TITLE};
  color: ${({ theme }) => theme.COLORS.TEXT};
  margin-bottom: 18px;
`;

export const Info = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Footer = styled.View`
  width: 100%;
  justify-content: space-between;
  /* flex-direction: row; */
`;

export const Label = styled.Text`
  font-size: 12px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme }) => theme.COLORS.SUBTEXT};
  margin-left: 3px;
`;

export const GroupsContainer = styled.View`
  margin-left: 44%;
  flex-direction: row;
`;
