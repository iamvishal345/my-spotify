import React, { useState, useEffect } from 'react';
import { catchErrors } from '../../utils';
import { getTrackInfo } from '../../spotify';
import TrackView from '../view/Track';
import Loader from '../view/Loader';
import { useParams } from 'react-router-dom';

const Track = () => {
  const { trackId } = useParams();

  const [track, setTrack] = useState(null);
  const [audioAnalysis, setAudioAnalysis] = useState(null);
  const [audioFeatures, setAudioFeatures] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTrackInfo(trackId);
      setTrack(data.track);
      setAudioAnalysis(data.audioAnalysis);
      setAudioFeatures(data.audioFeatures);
    };
    catchErrors(fetchData());
  }, [trackId]);

  return (
    <React.Fragment>
      {track ? (
        <TrackView
          track={track}
          audioAnalysis={audioAnalysis}
          audioFeatures={audioFeatures}
        />
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
};

export default Track;
