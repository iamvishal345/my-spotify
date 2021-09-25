import React, { useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import IconPlay from '../icons/play';
import IconPause from '../icons/pause';
import { theme } from '../../styles';

const PlayButton = styled.button`
  padding: 0;
  margin: 0;
  background-color: transparent;
  margin-top: 6px;
  svg {
    height: 12px;
    width: 12px;
    fill: ${theme.colors.green};
    &:hover,
    &:focus {
      fill: ${theme.colors.offGreen};
    }
  }
`;

const Player = ({ url }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  useLayoutEffect(() => {
    const ref = audioRef.current;
    ref.addEventListener('ended', () => {
      setIsPlaying(false);
    });
    return () => {
      ref.removeEventListener('ended', () => {
        setIsPlaying(false);
      });
    };
  });
  useLayoutEffect(() => {
    const ref = audioRef.current;
    ref.addEventListener('pause', () => {
      setIsPlaying(false);
    });
    return () => {
      ref.removeEventListener('pause', () => {
        setIsPlaying(false);
      });
    };
  });
  return (
    <>
      <audio preload="none" ref={audioRef} src={url}></audio>
      <PlayButton
        type="button"
        onClick={() => {
          if (audioRef.current) {
            audioRef.current.paused
              ? audioRef.current.play()
              : audioRef.current.pause();
            setIsPlaying(!isPlaying);
          }
        }}
      >
        {isPlaying ? (
          <>
            <IconPause />
          </>
        ) : (
          <>
            <IconPlay />
          </>
        )}
      </PlayButton>
    </>
  );
};

Player.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Player;
