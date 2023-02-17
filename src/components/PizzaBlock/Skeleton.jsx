import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={260}
    height={470}
    viewBox="0 0 260 470"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="279" rx="10" ry="10" width="260" height="30" />
    <rect x="0" y="323" rx="10" ry="10" width="260" height="90" />
    <rect x="0" y="0" rx="20" ry="20" width="260" height="260" />
    <rect x="0" y="422" rx="10" ry="10" width="260" height="40" />
  </ContentLoader>
);

export default Skeleton;
