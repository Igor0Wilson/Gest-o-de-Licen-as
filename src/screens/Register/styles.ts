import styled from "styled-components/native";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
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

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 48,
  },
})`
  width: 100%;
  margin-top: 50px;
`;

export const SubTitle = styled.Text`
  font-size: 13px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme }) => theme.COLORS.SUBTEXT};
  text-align: center;
  margin: 12px 0 24px;
`;

export const BackButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

export const BackText = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.FONTS.TITLE};
  color: ${({ theme }) => theme.COLORS.PRIMARY};
  margin-left: 5px;
`;
