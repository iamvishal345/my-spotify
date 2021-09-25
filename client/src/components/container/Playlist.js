import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  getPlaylist,
  getAudioFeaturesForTracks,
  unFollowPlayList,
  removeTrackFromPlayList,
} from '../../spotify';
import { catchErrors } from '../../utils';

import Loader from '../view/Loader';
import PlaylistView from '../view/Playlist';

const Playlist = () => {
  const { playlistId } = useParams();
  const [unfollow, setUnfollow] = useState(false);
  const [playlist, setPlaylist] = useState(null);
  const [modalActive, setModalActive] = useState(null);
  const [audioFeatures, setAudioFeatures] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getPlaylist(playlistId);
      setPlaylist(data);
    };
    catchErrors(fetchData());
  }, [playlistId]);

  useEffect(() => {
    const fetchData = async () => {
      if (playlist) {
        const { data } = await getAudioFeaturesForTracks(playlist.tracks.items);
        setAudioFeatures(data);
      }
    };
    catchErrors(fetchData());
  }, [playlist]);

  const removePlayList = () => {
    const fetchData = async () => {
      if (playlist) {
        await unFollowPlayList(playlistId);
        setUnfollow(true);
      }
    };
    catchErrors(fetchData());
  };

  const removeSong = () => {
    const removeTrack = async () => {
      await removeTrackFromPlayList(playlistId, [{ uri: modalActive }]);
      setModalActive(null);
      const fetchData = async () => {
        const { data } = await getPlaylist(playlistId);
        setPlaylist(data);
      };
      catchErrors(fetchData());
    };
    catchErrors(removeTrack());
  };

  return (
    <React.Fragment>
      {playlist ? (
        <PlaylistView
          playlist={playlist}
          unfollow={unfollow}
          audioFeatures={audioFeatures}
          removePlayList={removePlayList}
          modalActive={modalActive}
          setModalActive={setModalActive}
          removeSong={removeSong}
        />
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
};

Playlist.propTypes = {
  playlistId: PropTypes.string,
};

export default Playlist;
