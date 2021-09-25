import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../spotify';
import { IconUser, IconInfo } from '../icons';
import Loader from '../view/Loader';
import TrackItem from './TrackItem';

import styled from 'styled-components/macro';
import { theme, mixins, media, Main, LogoutButton } from '../../styles';
const { colors, fontSizes, spacing } = theme;

const Header = styled.header`
  ${mixins.flexCenter};
  flex-direction: column;
  position: relative;
`;
const Avatar = styled.div`
  width: 150px;
  height: 150px;
  img {
    border-radius: 100%;
  }
`;
const NoAvatar = styled.div`
  border: 2px solid currentColor;
  border-radius: 100%;
  padding: ${spacing.md};
`;
const UserName = styled.a`
  &:hover,
  &:focus {
    color: ${colors.offGreen};
  }
`;
const Name = styled.h1`
  font-size: 50px;
  font-weight: 700;
  margin: 20px 0 0;
  ${media.tablet`
    font-size: 40px;
  `};
  ${media.phablet`
    font-size: 8vw;
  `};
`;
const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin-top: ${spacing.base};
`;
const Stat = styled.div`
  text-align: center;
`;
const Number = styled.div`
  color: ${colors.green};
  font-weight: 700;
  font-size: ${fontSizes.md};
`;
const NumLabel = styled.p`
  color: ${colors.lightGrey};
  font-size: ${fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: ${spacing.xs};
`;

const Preview = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 70px;
  width: 100%;
  margin-top: 100px;
  ${media.tablet`
    display: block;
    margin-top: 70px;
  `};
`;
const Tracklist = styled.div`
  ${media.tablet`
    &:last-of-type {
      margin-top: 50px;
    }
  `};
`;
const TracklistHeading = styled.div`
  ${mixins.flexBetween};
  margin-bottom: 40px;
  h3 {
    display: inline-block;
    margin: 0;
  }
`;
const MoreButton = styled(Link)`
  ${mixins.button};
  text-align: center;
  white-space: nowrap;
  ${media.phablet`
    padding: 11px 20px;
    font-sizes: ${fontSizes.xs};
  `};
`;
const Mask = styled.div`
  ${mixins.flexCenter};
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: ${colors.white};
  opacity: 0;
  transition: ${theme.transition};
  svg {
    width: 25px;
  }
`;
const Artist = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: ${spacing.md};
  ${media.tablet`
    margin-bottom: ${spacing.base};
  `};
  &:hover,
  &:focus {
    ${Mask} {
      opacity: 1;
    }
  }
`;
const ArtistArtwork = styled(Link)`
  display: inline-block;
  position: relative;
  width: 50px;
  min-width: 50px;
  margin-right: ${spacing.base};
  img {
    width: 50px;
    min-width: 50px;
    height: 50px;
    margin-right: ${spacing.base};
    border-radius: 100%;
  }
`;

const ArtistName = styled(Link)`
  flex-grow: 1;
  span {
    border-bottom: 1px solid transparent;
    &:hover,
    &:focus {
      border-bottom: 1px solid ${colors.white};
    }
  }
`;

const User = ({
  user,
  followedArtists,
  totalPlaylists,
  topArtists,
  topTracks,
}) => (
  <Main>
    <Header>
      <Avatar>
        {user.images.length > 0 ? (
          <img loading="lazy" src={user.images[0].url} alt="avatar" />
        ) : (
          <NoAvatar>
            <IconUser />
          </NoAvatar>
        )}
      </Avatar>
      <UserName
        href={user.external_urls.spotify}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Name>{user.display_name}</Name>
      </UserName>
      <Stats>
        <Stat>
          <Number>{user.followers.total}</Number>
          <NumLabel>Followers</NumLabel>
        </Stat>
        {followedArtists && (
          <Stat>
            <Number>{followedArtists.artists.total}</Number>
            <NumLabel>Following</NumLabel>
          </Stat>
        )}
        {totalPlaylists && (
          <Stat>
            <Link to="playlists">
              <Number>{totalPlaylists}</Number>
              <NumLabel>Playlists</NumLabel>
            </Link>
          </Stat>
        )}
      </Stats>
      <LogoutButton onClick={logout}>Logout</LogoutButton>
    </Header>

    <Preview>
      <Tracklist>
        <TracklistHeading>
          <h3>Top Artists of All Time</h3>
          <MoreButton to="/artists">See More</MoreButton>
        </TracklistHeading>
        <div>
          {topArtists ? (
            <ul>
              {topArtists.items.slice(0, 10).map((artist, i) => (
                <Artist key={i}>
                  <ArtistArtwork to={`/artist/${artist.id}`}>
                    {artist.images.length && (
                      <img
                        loading="lazy"
                        src={artist.images[2].url}
                        alt="Artist"
                      />
                    )}
                    <Mask>
                      <IconInfo />
                    </Mask>
                  </ArtistArtwork>
                  <ArtistName to={`/artist/${artist.id}`}>
                    <span>{artist.name}</span>
                  </ArtistName>
                </Artist>
              ))}
            </ul>
          ) : (
            <Loader />
          )}
        </div>
      </Tracklist>

      <Tracklist>
        <TracklistHeading>
          <h3>Top Tracks of All Time</h3>
          <MoreButton to="/tracks">See More</MoreButton>
        </TracklistHeading>
        <ul>
          {topTracks ? (
            topTracks.items
              .slice(0, 10)
              .map((track, i) => <TrackItem track={track} key={i} />)
          ) : (
            <Loader />
          )}
        </ul>
      </Tracklist>
    </Preview>
  </Main>
);

export default User;
