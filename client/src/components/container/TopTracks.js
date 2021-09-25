import React, { useState, useEffect } from 'react';
import { getTopTracks } from '../../spotify';
import { catchErrors } from '../../utils';

import Loader from '../view/Loader';
import TrackItem from '../view/TrackItem';

import styled from 'styled-components/macro';
import { theme, mixins, media, Main } from '../../styles';
const { colors, fontSizes } = theme;

const Header = styled.header`
  ${mixins.flexBetween};
  ${media.tablet`
    display: block;
  `};
  h2 {
    margin: 0;
  }
`;
const Ranges = styled.div`
  display: flex;
  margin-right: -11px;
  ${media.tablet`
    justify-content: space-around;
    margin: 30px 0 0;
  `};
`;
const RangeButton = styled.button`
  background-color: transparent;
  color: ${(props) => (props.isActive ? colors.white : colors.lightGrey)};
  font-size: ${fontSizes.base};
  font-weight: 500;
  padding: 10px;
  ${media.phablet`
    font-size: ${fontSizes.sm};
  `};
  span {
    padding-bottom: 2px;
    border-bottom: 1px solid
      ${(props) => (props.isActive ? colors.white : `transparent`)};
    line-height: 1.5;
    white-space: nowrap;
  }
`;
const TracksContainer = styled.ul`
  margin-top: 50px;
`;

const TopTracks = () => {
  const [topTracks, setTopTracks] = useState(null);
  const [activeRange, setActiveRange] = useState('long');
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      const { data } = await getTopTracks(activeRange);
      setTopTracks(data);
      setLoader(false);
    };
    catchErrors(fetchData());
  }, [activeRange]);

  return (
    <Main>
      <Header>
        <h2>Top Tracks</h2>
        <Ranges>
          <RangeButton
            isActive={activeRange === 'long'}
            onClick={() => setActiveRange('long')}
          >
            <span>All Time</span>
          </RangeButton>
          <RangeButton
            isActive={activeRange === 'medium'}
            onClick={() => setActiveRange('medium')}
          >
            <span>Last 6 Months</span>
          </RangeButton>
          <RangeButton
            isActive={activeRange === 'short'}
            onClick={() => setActiveRange('short')}
          >
            <span>Last 4 Weeks</span>
          </RangeButton>
        </Ranges>
      </Header>
      <TracksContainer>
        {!loader && topTracks ? (
          topTracks.items.map((track, i) => <TrackItem track={track} key={i} />)
        ) : (
          <Loader />
        )}
      </TracksContainer>
    </Main>
  );
};

export default TopTracks;
