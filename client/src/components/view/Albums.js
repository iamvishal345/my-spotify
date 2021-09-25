import React from 'react';
import { Link } from 'react-router-dom';
import { IconMusic } from '../icons';

import styled from 'styled-components/macro';
import { theme, mixins, media } from '../../styles';
const { colors, fontSizes, spacing } = theme;

const AlbumsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: ${spacing.md};
  width: 100%;
  margin-top: 50px;
  ${media.tablet`
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  `};
  ${media.phablet`
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  `};
`;
const Playlist = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
const PlaylistMask = styled.div`
  ${mixins.flexCenter};
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 30px;
  color: ${colors.white};
  opacity: 0;
  transition: ${theme.transition};
`;
const PlaylistImage = styled.img`
  object-fit: cover;
`;
const PlaylistCover = styled(Link)`
  ${mixins.coverShadow};
  position: relative;
  width: 100%;
  margin-bottom: ${spacing.base};
  &:hover,
  &:focus {
    ${PlaylistMask} {
      opacity: 1;
    }
  }
`;
const PlaceholderArtwork = styled.div`
  ${mixins.flexCenter};
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  background-color: ${colors.darkGrey};
  svg {
    width: 50px;
    height: 50px;
  }
`;
const PlaceholderContent = styled.div`
  ${mixins.flexCenter};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;
const AlbumName = styled(Link)`
  display: inline;
  border-bottom: 1px solid transparent;
  &:hover,
  &:focus {
    border-bottom: 1px solid ${colors.white};
  }
`;
const TotalTracks = styled.div`
  text-transform: uppercase;
  margin: 5px 0;
  color: ${colors.lightGrey};
  font-size: ${fontSizes.xs};
  letter-spacing: 1px;
`;

const Albums = ({ albums }) => {
  return (
    <AlbumsContainer>
      {albums
        ? albums.items.map(({ id, images, name, total_tracks }, i) => (
            <Playlist key={i}>
              <PlaylistCover to={`/album/${id}`}>
                {images.length ? (
                  <PlaylistImage
                    loading="lazy"
                    src={images[0].url}
                    alt="Album Art"
                  />
                ) : (
                  <PlaceholderArtwork>
                    <PlaceholderContent>
                      <IconMusic />
                    </PlaceholderContent>
                  </PlaceholderArtwork>
                )}
                <PlaylistMask>
                  <i className="fas fa-info-circle" />
                </PlaylistMask>
              </PlaylistCover>
              <div>
                <AlbumName to={`/album/${id}`}>{name}</AlbumName>
                <TotalTracks>{total_tracks} Tracks</TotalTracks>
              </div>
            </Playlist>
          ))
        : null}
    </AlbumsContainer>
  );
};

export default Albums;
