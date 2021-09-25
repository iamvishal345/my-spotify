import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { catchErrors } from '../../utils';
import { getArtist, getArtistAlbums, getArtistTopTracks } from '../../spotify';
import { useParams } from 'react-router-dom';
import ArtistView from '../view/Artist';

const Artist = () => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);
  const [artistTopTracks, setArtistTopTracks] = useState(null);
  const [artistAlbums, setArtistAlbums] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getArtist(artistId);
      setArtist(data);
    };
    const fetchTopTracks = async () => {
      const { data } = await getArtistTopTracks(artistId);
      setArtistTopTracks(data);
    };
    const fetchArtistAlbums = async () => {
      const { data } = await getArtistAlbums(artistId);
      setArtistAlbums(data);
    };
    catchErrors(fetchData());
    catchErrors(fetchTopTracks());
    catchErrors(fetchArtistAlbums());
  }, [artistId]);

  return (
    <ArtistView
      artist={artist}
      artistTopTracks={artistTopTracks}
      artistAlbums={artistAlbums}
    />
  );
};

Artist.propTypes = {
  artistId: PropTypes.string,
};

export default Artist;
