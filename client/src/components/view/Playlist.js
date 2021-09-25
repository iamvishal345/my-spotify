import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TrackItem from './TrackItem';
import FeatureChart from './FeatureChart';

import styled from 'styled-components/macro';
import { theme, mixins, media, Main } from '../../styles';
import Modal from './Modal';
import Trash from '../icons/trash';
const { colors, fontSizes, spacing } = theme;

const PlaylistContainer = styled.div`
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
const PlaylistCover = styled.div`
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
`;
const CancelButton = styled.button`
  ${mixins.greenButton};
`;
const RemoveButton = styled.button`
  ${mixins.greenOutlineButton};
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
const ModalHeader = styled.div`
  ${mixins.flexCenter}
  background: ${colors.offRed};
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: auto;
  svg {
    width: 50px;
    fill: ${colors.navBlack};
  }
`;
const ConfirmMessage = styled.h3`
  margin: ${spacing.base} 0;
`;
const FooterContainer = styled.div`
  ${mixins.flexCenter}
  align-items: center;
  gap: ${spacing.base};
  button {
    margin: 0;
  }
`;
const Playlist = ({
  playlist,
  unfollow,
  removePlayList,
  audioFeatures,
  modalActive,
  setModalActive,
  removeSong,
}) => (
  <Main>
    <PlaylistContainer>
      <Left>
        {playlist.images.length && (
          <PlaylistCover>
            <img loading="lazy" src={playlist.images[0].url} alt="Album Art" />
          </PlaylistCover>
        )}

        <a
          href={playlist.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Name>{playlist.name}</Name>
        </a>

        <Owner>By {playlist.owner.display_name}</Owner>

        {playlist.description && (
          <Description
            dangerouslySetInnerHTML={{ __html: playlist.description }}
          />
        )}

        <TotalTracks>{playlist.tracks.total} Tracks</TotalTracks>

        <RecButton to={`/recommendations/${playlist.id}`}>
          Get Recommendations
        </RecButton>

        {!unfollow ? (
          <RemoveButton type="button" onClick={removePlayList}>
            Remove Playlist
          </RemoveButton>
        ) : (
          <h3>PlayList Removed</h3>
        )}

        {audioFeatures && (
          <FeatureChart
            features={audioFeatures.audio_features}
            type="horizontalBar"
          />
        )}
      </Left>
      <Right>
        <ul>
          {playlist.tracks &&
            playlist.tracks.items.map(({ track }, i) => (
              <TrackItem
                track={track}
                playlistId={playlist.id}
                key={i}
                setModalActive={setModalActive}
              />
            ))}
        </ul>
      </Right>
    </PlaylistContainer>
    {modalActive && (
      <Modal
        header={
          <ModalHeader>
            <Trash />
          </ModalHeader>
        }
        body={
          <ConfirmMessage>
            You are about to remove this song from playlist
          </ConfirmMessage>
        }
        footer={
          <FooterContainer>
            <CancelButton type="button" onClick={() => setModalActive(null)}>
              Cancel
            </CancelButton>
            <RemoveButton type="button" onClick={() => removeSong()}>
              Remove
            </RemoveButton>
          </FooterContainer>
        }
      />
    )}
  </Main>
);

Playlist.propTypes = {
  playlist: PropTypes.object.isRequired,
  unfollow: PropTypes.bool.isRequired,
  removePlayList: PropTypes.func.isRequired,
  audioFeatures: PropTypes.object,
  modalActive: PropTypes.string,
  setModalActive: PropTypes.func.isRequired,
  removeSong: PropTypes.func.isRequired,
};

export default Playlist;
