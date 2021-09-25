import React, { useState, useEffect } from 'react';
import { getNextPage, getPlaylists } from '../../spotify';
import { catchErrors } from '../../utils';
import { useInfiniteScroll } from '../../Hooks';
import PlaylistView from '../view/Playlists';

const Playlists = () => {
  const [playlists, setPlaylists] = useState(null);
  const [loaderRef, page, setPage] = useInfiniteScroll();

  useEffect(() => {
    if (page === 0) {
      const fetchData = async () => {
        const { data } = await getPlaylists();
        setPlaylists(data);
      };
      catchErrors(fetchData());
    } else {
      if (playlists && playlists.next) {
        const fetchData = async () => {
          const { data } = await getNextPage(playlists.next);
          data.items = [...playlists.items, ...data.items];
          setPlaylists(data);
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
    <PlaylistView loaderRef={loaderRef} playlists={playlists} page={page} />
  );
};

export default Playlists;
