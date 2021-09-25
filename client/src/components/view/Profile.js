import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import ScrollToTop from '../utils/ScrollToTop';
import Nav from './Nav';
import styled from 'styled-components/macro';
import { theme, media, LogoutButton } from '../../styles';
import Loader from './Loader';
import { logout } from '../../spotify';

const User = lazy(() => import('../container/User'));
const RecentlyPlayed = lazy(() => import('../container/RecentlyPlayed'));
const TopArtists = lazy(() => import('../container/TopArtists'));
const TopTracks = lazy(() => import('../container/TopTracks'));
const Playlists = lazy(() => import('../container/Playlists'));
const Playlist = lazy(() => import('../container/Playlist'));
const Recommendations = lazy(() => import('../container/Recommendations'));
const Track = lazy(() => import('../container/Track'));
const Artist = lazy(() => import('../container/Artist'));
const Album = lazy(() => import('../container/Album'));

const SiteWrapper = styled.div`
  padding-left: ${theme.navWidth};
  ${media.tablet`
    padding-left: 0;
    padding-bottom: 50px;
  `};
`;

const Profile = () => (
  <SiteWrapper>
    <Nav />
    <ScrollToTop />
    <Suspense fallback={<Loader />}>
      <Route
        path="/:path"
        render={() => (
          <LogoutButton
            style={{
              position: 'absolute',
              right: 0,
              margin: '1em',
              marginLeft: '0',
            }}
            forTop={true}
            onClick={logout}
          >
            Logout
          </LogoutButton>
        )}
      />
      <Switch>
        <Route exact path="/" component={User} />
        <Route exact path="/recent" component={RecentlyPlayed} />
        <Route exact path="/artists" component={TopArtists} />
        <Route exact path="/tracks" component={TopTracks} />
        <Route exact path="/playlists" component={Playlists} />
        <Route path="/playlist/:playlistId" component={Playlist} />
        <Route
          path="/recommendations/:playlistId"
          component={Recommendations}
        />
        <Route path="/track/:trackId" component={Track} />
        <Route path="/artist/:artistId" component={Artist} />
        <Route path="/album/:albumId" component={Album} />
      </Switch>
    </Suspense>
  </SiteWrapper>
);

export default Profile;
