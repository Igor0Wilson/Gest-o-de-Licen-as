import styled from "styled-components/native";
import {
  getStatusBarHeight,
  getBottomSpace,
} from "react-native-iphone-x-helper";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  padding: ${getStatusBarHeight() + 24}px 24px ${getBottomSpace() + 14}px;
  margin-top: 20px;
  margin-bottom: 5px;
  margin-left: 10px;
  margin-right: 10px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

export const Background = styled.View`
  flex: 1;
  background-color: #0e7490;
`;
