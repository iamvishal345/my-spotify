import styled from 'styled-components/macro';
import theme from './theme';
import media from './media';
const { fontSizes, colors } = theme;

const LogoutButton = styled.a`
  background-color: transparent;
  color: ${colors.white};
  border: 1px solid ${colors.white};
  border-radius: 30px;
  margin-top: 30px;
  padding: 12px 30px;
  font-size: ${fontSizes.xs};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  &:hover,
  &:focus {
    background-color: ${colors.white};
    color: ${colors.black};
  }
  ${media.thone`
     display: ${(forTop) => (forTop ? 'none' : '')};
    `}
`;

export default LogoutButton;
