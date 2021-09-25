import React, { useState, useEffect, useLayoutEffect } from 'react';

import { token } from '../spotify';

import LoginScreen from './view/LoginScreen';
import Profile from './view/Profile';

import styled from 'styled-components/macro';
import { GlobalStyle } from '../styles';
import { useHistory } from 'react-router-dom';

const AppContainer = styled.div`
  height: 100%;
  min-height: 100vh;
`;

const App = () => {
  const [accessToken, setAccessToken] = useState('');
  const history = useHistory();
  useEffect(() => {
    setAccessToken(token);
    if (history.location.hash.length > 20) {
      history.push(
        '',
        document.title,
        window.location.pathname + window.location.search
      );
    }
  }, [history]);
  useLayoutEffect(() => {
    document.addEventListener(
      'play',
      function (e) {
        var audios = document.getElementsByTagName('audio');
        for (var i = 0, len = audios.length; i < len; i++) {
          if (audios[i] !== e.target) {
            audios[i].pause();
          }
        }
      },
      true
    );
    return () => {
      document.removeEventListener(
        'play',
        function (e) {
          var audios = document.getElementsByTagName('audio');
          for (var i = 0, len = audios.length; i < len; i++) {
            if (audios[i] !== e.target) {
              audios[i].pause();
            }
          }
        },
        true
      );
    };
  });

  return (
    <AppContainer>
      <GlobalStyle />
      {accessToken ? <Profile /> : <LoginScreen />}
    </AppContainer>
  );
};

export default App;
