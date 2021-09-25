import React from 'react';
import PropTypes from 'prop-types';
import { formatWithCommas } from '../../utils';

import Loader from '../view/Loader';

import styled from 'styled-components/macro';
import { theme, mixins, media, Main } from '../../styles';
import TrackItem from '../view/TrackItem';
import Albums from './Albums';
const { colors, fontSizes, spacing } = theme;

const ArtistContainer = styled.div`
  ${mixins.flexCenter};
  justify-content: space-evenly;
  height: 100%;
  text-align: center;
  ${media.tablet`
    flex-direction:column
  `};
`;
const Artwork = styled.div`
  ${mixins.coverShadow};
  border-radius: 100%;
  img {
    object-fit: cover;
    border-radius: 100%;
    width: 300px;
    height: 300px;
    ${media.netbook`
      width: 250px;
      height: 250px;
  `};
    ${media.tablet`
      width: 200px;
      height: 200px;
    `};
  }
`;
const ArtistName = styled.h1`
  font-size: 70px;
  margin-top: ${spacing.md};
  ${media.netbook`
    font-size: 50px;
  `};
  ${media.tablet`
    font-size: 7vw;
  `};
`;
const Stats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: ${spacing.sm};
  margin-top: ${spacing.md};
  text-align: center;
`;
const Stat = styled.div`
  display: block;
`;
const Number = styled.div`
  color: ${colors.blue};
  font-weight: 700;
  font-size: ${fontSizes.lg};
  text-transform: capitalize;
  ${media.tablet`
    font-size: ${fontSizes.md};
  `};
`;
const GenreContainer = styled.div`
  ${mixins.flexCenter};
  gap: ${spacing.base};
  margin-top: ${spacing.sm};
  flex-wrap: wrap;
  min-width: 200px;
`;
const Genre = styled.div`
  font-size: ${fontSizes.xs};
  border: 1px solid;
  padding: ${spacing.xs} ${spacing.sm};
  background-blend-mode: color-dodge;
  background: #2e2e31;
  text-transform: capitalize;
`;
const NumLabel = styled.p`
  color: ${colors.lightGrey};
  font-size: ${fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: ${spacing.xs};
`;
const TracksContainer = styled.ul`
  margin-top: 50px;
`;

const Header = styled.h2`
  margin: 0;
  margin-top: ${spacing.base};
`;

const Artist = ({ artist, artistTopTracks, artistAlbums }) => (
  <Main>
    {artist ? (
      <ArtistContainer>
        <Artwork>
          <img loading="lazy" src={artist.images[0].url} alt="Artist Artwork" />
        </Artwork>
        <div>
          <ArtistName>{artist.name}</ArtistName>
          <Stats>
            <Stat>
              <Number>{formatWithCommas(artist.followers.total)}</Number>
              <NumLabel>Followers</NumLabel>
            </Stat>

            {artist.popularity && (
              <Stat>
                <Number>{artist.popularity}%</Number>
                <NumLabel>Popularity</NumLabel>
              </Stat>
            )}
          </Stats>
          <GenreContainer>
            {artist.genres &&
              artist.genres.map((genre) => <Genre key={genre}>{genre}</Genre>)}
          </GenreContainer>
        </div>
      </ArtistContainer>
    ) : (
      <Loader />
    )}
    <Header>Top Songs</Header>
    <TracksContainer>
      {artistTopTracks ? (
        artistTopTracks.tracks.map((track, i) => (
          <TrackItem track={track} key={i} />
        ))
      ) : (
        <Loader />
      )}
    </TracksContainer>
    <Header>Album</Header>
    <TracksContainer>
      {artistAlbums ? <Albums albums={artistAlbums} /> : <Loader />}
    </TracksContainer>
  </Main>
);

Artist.propTypes = {
  artist: PropTypes.object,
  artistTopTracks: PropTypes.object,
  artistAlbums: PropTypes.object,
};

export default Artist;
