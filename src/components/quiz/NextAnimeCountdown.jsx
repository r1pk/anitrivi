import { forwardRef, useEffect, useRef, useState } from 'react';

import { Typography } from '@mui/material';

const NextAnimeCountdown = forwardRef((props, ref) => {
  const [remainingTime, setRemainingTime] = useState('23:59:59');

  const timer = useRef(null);

  useEffect(function startTimer() {
    timer.current = setInterval(() => {
      const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;
      const remainingTimeToday = new Date(MILLISECONDS_IN_DAY - (Date.now() % MILLISECONDS_IN_DAY));

      setRemainingTime(remainingTimeToday.toLocaleTimeString('en-US', { hour12: false, timeZone: 'UTC' }));
    }, 1000);

    return function clearTimer() {
      clearInterval(timer.current);
    };
  }, []);

  return (
    <Typography variant="button" ref={ref} {...props}>
      Time until next anime: {remainingTime}
    </Typography>
  );
});

NextAnimeCountdown.displayName = 'NextAnimeCountdown';

export default NextAnimeCountdown;
