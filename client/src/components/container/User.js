import React, { useState, useEffect } from 'react';
import { getUserInfo } from '../../spotify';
import { catchErrors } from '../../utils';
import Loader from '../view/Loader';
import UserView from '../view/User';

const User = () => {
  const [user, setUser] = useState(null);
  const [followedArtists, setFollowedArtists] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { user, followedArtists, playlists, topArtists, topTracks } =
        await getUserInfo();
      setUser(user);
      setFollowedArtists(followedArtists);
      setPlaylists(playlists);
      setTopArtists(topArtists);
      setTopTracks(topTracks);
    };
    catchErrors(fetchData());
  }, []);

  const totalPlaylists = playlists ? playlists.total : 0;

  return (
    <React.Fragment>
      {user ? (
        <UserView
          totalPlaylists={totalPlaylists}
          user={user}
          followedArtists={followedArtists}
          topArtists={topArtists}
          topTracks={topTracks}
        />
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
};

export default User;
