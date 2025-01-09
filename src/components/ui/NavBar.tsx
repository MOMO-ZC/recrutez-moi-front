import { View } from 'react-native';
import styled from 'styled-components';
import Feather from '@expo/vector-icons/Feather';
import { usePathname, useRouter } from 'expo-router';
import { useThemeColor } from '@/src/hooks/useThemeColor';

const NavBar = () => {
  const fill = useThemeColor({}, 'black');
  const stroke = useThemeColor({}, 'placeholder');

  const router = useRouter();

  const pathname = usePathname();

  return (
    <Footer>
      <NavBarContainer>
        <Feather
          name="target"
          size={24}
          color={pathname === '/' ? fill : stroke}
          onPress={() => router.replace('/(tabs)')}
        />
        <Feather
          name="heart"
          size={24}
          color={pathname === '/liked' ? fill : stroke}
          onPress={() => router.replace('/(tabs)/liked')}
        />
        <Feather
          name="dribbble"
          size={24}
          color={pathname === '/projects' ? fill : stroke}
          onPress={() => router.replace('/(tabs)/projects')}
        />
        <Feather
          name="user"
          size={24}
          color={pathname === '/profile' ? fill : stroke}
          onPress={() => router.replace('/(tabs)/profile')}
        />
      </NavBarContainer>
    </Footer>
  );
};

const Footer = styled(View)`
  position: absolute;
  bottom: 0;
  align-self: center;
  align-items: center;
  margin-bottom: 32px;
`;
const NavBarContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  border-radius: 36px;
  justify-content: space-around;
  width: 90%;
  padding: 16px;
  background-color: #ffffff90;
`;

export default NavBar;
