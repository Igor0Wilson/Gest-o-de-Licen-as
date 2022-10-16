import styled from "styled-components/native";

export type ClientStyleProps = {
  isValid: true | false;
};

export const Container = styled.View`
  width: 100%;
  height: 160px;
  flex-direction: row;
  overflow: hidden;
  margin-bottom: -22px;
`;

export const Content = styled.View`
  flex: 1;
  height: 120px;
  padding: 0 15px;
  justify-content: center;
  margin-top: -15px;
  /* background-color: #fff; */
`;

export const Header = styled.View`
  flex-direction: row;
  margin-top: 20px;
`;

export const Status = styled.View<ClientStyleProps>`
  width: 10px;
  height: 120px;
  background-color: ${({ theme, isValid }) =>
    isValid === true ? theme.COLORS.PRIMARY : theme.COLORS.SECONDARY};
`;

export const Title = styled.Text`
  flex: 1;
  font-size: 15px;
  font-family: ${({ theme }) => theme.FONTS.TITLE};
  color: ${({ theme }) => theme.COLORS.TEXT};
  margin-bottom: 10px;
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
  font-size: 13px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme }) => theme.COLORS.SUBTEXT};
  margin-left: 3px;
`;

export const GroupsContainer = styled.View`
  margin-left: 80%;
  margin-top: -15%;
  flex-direction: row;
`;
