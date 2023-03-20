import { Box, useTheme } from '@mui/material';

const FixedBackground = () => {
  const theme = useTheme();

  return (
    <Box sx={{ position: 'fixed', top: 0, left: 0, width: 1, height: 1, zIndex: -1, lineHeight: 0 }}>
      <svg viewBox="0 0 900 600" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <g transform="translate(900, 0)">
          <path
            d="M0 513.8C-52.3 467.3 -104.5 420.8 -165.3 399.1C-226.1 377.5 -295.5 380.6 -351.4 351.4C-407.4 322.2 -449.9 260.6 -474.7 196.6C-499.5 132.6 -506.6 66.3 -513.8 0L0 0Z"
            fill={theme.palette.primary.main}
            fillOpacity="0.2"
          ></path>
          <path
            d="M0 256.9C-26.1 233.6 -52.3 210.4 -82.7 199.6C-113.1 188.7 -147.7 190.3 -175.7 175.7C-203.7 161.1 -224.9 130.3 -237.3 98.3C-249.8 66.3 -253.3 33.2 -256.9 0L0 0Z"
            fill={theme.palette.primary.main}
            fillOpacity="0.2"
          ></path>
        </g>
        <g transform="translate(0, 600)">
          <path
            d="M0 -513.8C48.2 -459.4 96.3 -405.1 160.3 -387.1C224.3 -369.1 304.2 -387.5 361.3 -361.3C418.5 -335.1 453 -264.3 474.7 -196.6C496.3 -129 505.1 -64.5 513.8 0L0 0Z"
            fill={theme.palette.primary.main}
            fillOpacity="0.2"
          ></path>
          <path
            d="M0 -256.9C24.1 -229.7 48.2 -202.5 80.2 -193.6C112.2 -184.6 152.1 -193.8 180.7 -180.7C209.3 -167.6 226.5 -132.1 237.3 -98.3C248.2 -64.5 252.5 -32.2 256.9 0L0 0Z"
            fill={theme.palette.primary.main}
            fillOpacity="0.2"
          ></path>
        </g>
      </svg>
    </Box>
  );
};

export default FixedBackground;
