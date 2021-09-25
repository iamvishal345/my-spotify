import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getAlbum, getAudioFeaturesForTracks } from '../../spotify';
import { catchErrors } from '../../utils';
import Loader from '../view/Loader';
import AlbumView from '../view/Album';

const Album = () => {
  const { albumId } = useParams();

  const [album, setAlbum] = useState(null);
  const [audioFeatures, setAudioFeatures] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getAlbum(albumId);
      setAlbum(customizeTracks(data));
    };
    catchErrors(fetchData());
  }, [albumId]);

  const customizeTracks = (data) => {
    data.tracks.items = data.tracks.items.map((track) => ({
      ...track,
      album: { images: [...data.images], name: data.name },
    }));
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (album) {
        const { data } = await getAudioFeaturesForTracks(
          album.tracks.items.map((track) => ({ track }))
        );
        setAudioFeatures(data);
      }
    };
    catchErrors(fetchData());
  }, [album]);

  return (
    <React.Fragment>
      {album ? (
        <AlbumView album={album} audioFeatures={audioFeatures} />
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
};

Album.propTypes = {
  albumId: PropTypes.string,
};

export default Album;
