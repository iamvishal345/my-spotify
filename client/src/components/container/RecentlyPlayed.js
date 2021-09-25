import React, { useState, useEffect } from 'react';
import { getNextPage, getRecentlyPlayed } from '../../spotify';
import { catchErrors } from '../../utils';

import Loader from '../view/Loader';
import TrackItem from '../view/TrackItem';

import styled from 'styled-components/macro';
import { Main } from '../../styles';
import { useInfiniteScroll } from '../../Hooks';

const TracksContainer = styled.ul`
  margin-top: 50px;
`;

const RecentlyPlayed = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState(null);
  const [loaderRef, page, setPage] = useInfiniteScroll();

  useEffect(() => {
    if (page === 0) {
      const fetchData = async () => {
        const { data } = await getRecentlyPlayed();
        setRecentlyPlayed(data);
      };
      catchErrors(fetchData());
    } else {
      if (recentlyPlayed && recentlyPlayed.next) {
        const fetchData = async () => {
          const { data } = await getNextPage(recentlyPlayed.next);
          data.items = [...recentlyPlayed.items, ...data.items];
          setRecentlyPlayed(data);
          if (data.next === null) {
            setPage(-1);
          }
        };
        catchErrors(fetchData());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <Main>
      <h2>Recently Played Tracks</h2>
      <TracksContainer>
        {recentlyPlayed
          ? recentlyPlayed.items.map(({ track }, i) => (
              <TrackItem track={track} key={i} />
            ))
          : null}
      </TracksContainer>
      <div ref={loaderRef} style={{ display: page === -1 ? 'none' : 'block' }}>
        <Loader size={recentlyPlayed ? 'small' : ''} />
      </div>
    </Main>
  );
};

export default RecentlyPlayed;
