import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TrackItem from './TrackItem';
import FeatureChart from './FeatureChart';

import styled from 'styled-components/macro';
import { theme, mixins, media, Main } from '../../styles';
const { colors, fontSizes, spacing } = theme;

const AlbumContainer = styled.div`
  display: flex;
  ${media.tablet`
    display: block;
  `};
`;
const Left = styled.div`
  width: 30%;
  text-align: center;
  min-width: 200px;
  ${media.tablet`
    width: 100%;
    min-width: auto;
  `};
`;
const Right = styled.div`
  flex-grow: 1;
  margin-left: 50px;
  ${media.tablet`
    margin: 50px 0 0;
  `};
`;
const AlbumCover = styled.div`
  ${mixins.coverShadow};
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  ${media.tablet`
    display: none;
  `};
`;
const Name = styled.h3`
  font-weight: 700;
  font-size: ${fontSizes.xl};
  margin-top: 20px;
`;
const Description = styled.p`
  font-size: ${fontSizes.sm};
  color: ${colors.lightGrey};
  a {
    color: ${colors.white};
    border-bottom: 1px solid transparent;
    &:hover,
    &:focus {
      border-bottom: 1px solid ${colors.white};
    }
  }
`;
const RecButton = styled(Link)`
  ${mixins.greenButton};
  margin-bottom: ${spacing.lg};
`;
const Owner = styled.p`
  font-size: ${fontSizes.sm};
  color: ${colors.lightGrey};
`;
const TotalTracks = styled.p`
  font-size: ${fontSizes.sm};
  color: ${colors.white};
  margin-top: 20px;
`;

const Album = ({ album, audioFeatures }) => {
  return (
    <Main>
      <AlbumContainer>
        <Left>
          {album.images.length && (
            <AlbumCover>
              <img loading="lazy" src={album.images[0].url} alt="Album Art" />
            </AlbumCover>
          )}

          <a
            href={album.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Name>{album.name}</Name>
          </a>

          <Owner>By {album.label}</Owner>

          {album.description && (
            <Description
              dangerouslySetInnerHTML={{ __html: album.description }}
            />
          )}

          <TotalTracks>{album.tracks.total} Tracks</TotalTracks>

          <RecButton to={`/recommendations/${album.id}`}>
            Get Recommendations
          </RecButton>

          {audioFeatures && (
            <FeatureChart
              features={audioFeatures.audio_features}
              type="horizontalBar"
            />
          )}
        </Left>
        <Right>
          <ul>
            {album.tracks &&
              album.tracks.items.map((track, i) => (
                <TrackItem track={track} key={i} />
              ))}
          </ul>
        </Right>
      </AlbumContainer>
    </Main>
  );
};

Album.propTypes = {
  album: PropTypes.object,
  audioFeatures: PropTypes.object,
};

export default Album;
