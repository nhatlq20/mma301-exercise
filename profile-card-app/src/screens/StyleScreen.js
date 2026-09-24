import React from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { users } from '../data/user';

const SafeContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: #eef2f7;
`;

const Header = styled.View`
  padding: 18px 20px;
  background-color: #ffffff;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #dcdde1;
`;

const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #3742fa;
`;

const HeaderSubtitle = styled.Text`
  font-size: 13px;
  color: #718093;
  margin-top: 4px;
`;

const ScrollList = styled.ScrollView.attrs({
    contentContainerStyle: {
        padding: 16,
        paddingBottom: 30,
    },
})``;

const Card = styled.View`
  flex-direction: row;
  background-color: #ffffff;
  border-radius: 14px;
  margin-bottom: 16px;
  padding: 16px;
  align-items: center;
  elevation: 3;
`;

const Avatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: 16px;
`;

const InfoBox = styled.View`
  flex: 1;
`;

const NameText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #2f3542;
`;

const JobText = styled.Text`
  font-size: 14px;
  color: #718093;
  margin-top: 4px;
`;

const StyledScreen = () => {
    return (
        <SafeContainer edges={['top', 'left', 'right']}>
            <Header>
                <HeaderTitle>Styled-Components Screen</HeaderTitle>
                <HeaderSubtitle>CSS-in-JS (Expo SDK 57)</HeaderSubtitle>
            </Header>
            <ScrollList showsVerticalScrollIndicator={false}>
                {users.map((user) => (
                    <Card key={user.id}>
                        <Avatar source={{ uri: user.avatar }} resizeMode="cover" />
                        <InfoBox>
                            <NameText>{user.name}</NameText>
                            <JobText>{user.job}</JobText>
                        </InfoBox>
                    </Card>
                ))}
            </ScrollList>
        </SafeContainer>
    );
};

export default StyledScreen;