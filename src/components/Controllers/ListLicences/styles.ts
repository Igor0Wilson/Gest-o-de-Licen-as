import styled from "styled-components/native";

export type LicencesStyleProps = {
  expired: true | false;
};

export const Container = styled.View`
  width: 100%;
  height: 160px;
  flex-direction: row;
  margin-top: 20px;
  overflow: hidden;
  margin-bottom: -22px;
`;

export const Content = styled.View`
  flex: 1;
  height: 120px;
  margin-top: 15px;
  padding: 0 15px;
  justify-content: center;
  background-color: #fff;
`;

export const Header = styled.View`
  flex-direction: row;
  width: 160px;
  margin-top: 15px;
`;

export const Status = styled.View<LicencesStyleProps>`
  width: 10px;
  height: 140px;
  background-color: #164e63;
`;

export const Title = styled.Text`
  flex: 1;
  font-size: 14px;
  font-family: ${({ theme }) => theme.FONTS.TITLE};
  color: ${({ theme }) => theme.COLORS.TEXT};
  margin-bottom: 10px;
`;

export const Info = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const UserDiv = styled.View`
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
`;

export const ClientDiv = styled.View`
  margin-left: 5px;
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
  margin-top: -9px;
  flex-direction: row;
`;
