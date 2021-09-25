import React, { useState, useEffect } from 'react';
import { getTopArtists } from '../../spotify';
import { catchErrors } from '../../utils';

import TopArtistViw from '../view/TopArtists';

const TopArtists = () => {
  const [topArtists, setTopArtists] = useState(null);
  const [activeRange, setActiveRange] = useState('long');
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      const { data } = await getTopArtists(activeRange);
      setTopArtists(data);
      setLoader(false);
    };
    catchErrors(fetchData());
  }, [activeRange]);

  return (
    <TopArtistViw
      topArtists={topArtists}
      activeRange={activeRange}
      setActiveRange={setActiveRange}
      loader={loader}
    />
  );
};

export default TopArtists;
