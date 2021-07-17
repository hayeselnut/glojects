import React, { useState, useEffect } from 'react';
import ReactGlobe from 'react-globe';
import texture from './16k.jpeg';

import { filterByExactField } from './WorldUtil/projectsUtil';
import { zoomToMarker } from './WorldUtil/cameraAnimations';

const sampleData = [...Array(50).keys()].map(() => ({
  projectName: 'Project Name',
  experience: ['beginner', 'moderate', 'expert'][Math.round(Math.random() * 2)],
  coordinates: [(Math.random() - 0.5) * 180, (Math.random() - 0.5) * 360],
  value: 50,
}));

sampleData.forEach((marker, index) => {
  marker['id'] = index.toString();
  if (marker.experience === 'beginner') {
    marker['color'] = 'green';
  } else if (marker.experience === 'moderate') {
    marker['color'] = 'blue';
  } else if (marker.experience === 'expert') {
    marker['color'] = 'red';
  }
});

console.log(sampleData);

const World = () => {
  const [projects, setProjects] = useState([]);
  const [focus, setFocus] = useState(null);
  useEffect(() => {
    setProjects(sampleData);
  }, []);

  const options = {
    enableMarkerGlow: true,
    // markerGlowCoefficient: 1,
    // markerGlowPower: 1,
    // markerGlowRadiusScale: 0.8,
    markerRadiusScaleRange: [0.005, 0.02],
    markerOffsetRadiusScale: 0,
    markerType: 'dot',
    enableMarkerToolTip: true,
    // markerEnterAnimationDuration: 3000,
    // markerEnterEasingFunction: ['Bounce', 'InOut'],
    // markerExitEasingFunction: ['Cubic', 'Out'],
    // markerTooltipRenderer: marker =>
    //     `${marker.city} (Sales: ${marker.value}.0M)`,
    // markerRadiusScaleRange: [0.01, 0.05],

    // focusAnimationDuration: 2000,
    // focusDistanceRadiusScale: 1.5,
    cameraRotateSpeed: 0.5,
    focusEasingFunction: ['Linear', 'None'],
    enableDefocus: true,
  };

  // const texture = 'https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/globe_dark.jpg'

  return (
    <>
      <button
        onClick={() =>
          setProjects(filterByExactField(projects, 'experience', 'beginner'))
        }
      >
        Filter by Beginner
      </button>
      <button onClick={() => setFocus([1.3521, 103.8198])}>Singapore</button>
      <ReactGlobe
        globeTexture={texture}
        focus={focus}
        height="100vh"
        width="100wh"
        markers={projects}
        options={options}
        // onClickMarker={obj => zoomToMarker(setFocus, obj)}
      />
    </>
  );
};

export default World;
