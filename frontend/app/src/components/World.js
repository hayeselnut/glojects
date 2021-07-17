import React, { useState, useEffect } from 'react';
import ReactGlobe from 'react-globe';
import texture from './8k.jpeg';

import { filterByExactField } from './WorldUtil/projectsUtil';
import { zoomToMarker } from './WorldUtil/cameraAnimations';

import GlobjectCard from '../components/common/GlojectCard';

const sampleData = [...Array(25).keys()].map(() => ({
  projectName: 'Project Name',
  experience: ['beginner', 'moderate', 'expert'][Math.round(Math.random() * 2)],
  coordinates: [(Math.random() - 0.5) * 180, (Math.random() - 0.5) * 360],
  value: 25,
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

const initOptions = {
  enableMarkerGlow: true,
  // markerGlowCoefficient: 1,
  // markerGlowPower: 1,
  // markerGlowRadiusScale: 0.8,
  markerRadiusScaleRange: [0.005, 0.02],
  markerType: 'dot',
  enableMarkerTooltip: false,
  // markerEnterAnimationDuration: 3000,
  // markerEnterEasingFunction: ['Bounce', 'InOut'],
  // markerExitEasingFunction: ['Cubic', 'Out'],
  // markerTooltipRenderer: marker =>
  //     `${marker.city} (Sales: ${marker.value}.0M)`,
  // markerRadiusScaleRange: [0.01, 0.05],

  // cameraAutoRotateSpeed: 0.5,

  focusAnimationDuration: 2000,
  focusDistanceRadiusScale: 1.5,
  cameraRotateSpeed: 0.5,
  focusEasingFunction: ['Linear', 'None'],
  enableDefocus: true,
  // markerToolTipRenderer: () => <GlobjectCard
  //   style={{ position: 'sticky', right: '200px' }}
  //   src="https://i.ytimg.com/vi/MPV2METPeJU/maxresdefault.jpg"
  //   title="Boss Coffee Boss Iced Long Black"
  //   tags={['coffee', 'tea']}
  //   description="iced long black flas k brew breed hot / chilled fast - no1 coffee in japan kawaiiiiiidesu"
  //   owner="35Z6uU2PpFRb9XbVG0rF"
  // />, markerRenderer
  // markerToolTipRenderer: marker => `HELP ME PLEASE ${marker.color}`,
};

const World = () => {
  const [projects, setProjects] = useState([]);
  const [focus, setFocus] = useState(null);
  const [open, setOpen] = useState(true);
  const [options, setOptions] = useState(initOptions);
  const [hover, setHover] = useState(false);

  const initZoom = () => {
    // const newOptions = {...options};
    // newOptions.cameraAutoRotateSpeed = 0.1;
    setFocus([-33, 151]);
    setOpen(false);
    // setOptions(newOptions);
  };

  useEffect(() => {
    setProjects(sampleData);

    window.addEventListener('keydown', () => {
      initZoom();
      window.removeEventListener('keydown', initZoom);
    });
  }, []);

  const onClick = (obj) => {
    console.log('obj');
    zoomToMarker(setFocus, obj);
    const newOptions = { ...options };
    newOptions.cameraAutoRotateSpeed = 0;
    setOptions(newOptions);
  };

  const onDefocus = () => {
    const newOptions = { ...options };
    newOptions.cameraAutoRotateSpeed = 0.1;
    setOptions(newOptions);
  };

  const onMouseOverMarker = (marker) => {
    console.log(`MARKER: ${marker}`);
    setHover(true);
  }

  const onMouseOutMarker = (marker) => {
    console.log(`Leaving card`);
    // setHover(false);
  }

  return (
    <>
      {/* <button onClick={() => setProjects(filterByExactField(projects, "experience", "beginner"))}>Filter by Beginner</button> */}
      {/* <button onClick={() => setFocus([1.3521, 103.8198])}>Singapore</button> */}
      {open ? (
        <div style={startModalStyle}>
          <div style={upperText} />
          <div style={middleText}>
            <div style={left}>G L</div>
            <div style={middle} />
            <div style={right}>J E C T S</div>
          </div>
          <div style={lowerText}>Press any key to continue</div>
        </div>
      ) : null}
      {hover ? (
        <div style={cardStyle}>
          <GlobjectCard
            style={{ position: 'sticky', right: '200px' }}
            src="https://i.ytimg.com/vi/MPV2METPeJU/maxresdefault.jpg"
            title="Boss Coffee Boss Iced Long Black"
            tags={['coffee', 'tea']}
            description="iced long black flas k brew breed hot / chilled fast - no1 coffee in japan kawaiiiiiidesu"
            owner="35Z6uU2PpFRb9XbVG0rF"
          />
        </div>
      ) : null
      }
      <ReactGlobe
        globeTexture={texture}
        focus={focus}
        height="100vh"
        width="100wh"
        markers={projects}
        options={options}
        onClickMarker={onClick}
        onDefocus={onDefocus}
        initialCameraDistanceRadiusScale={25}
        onMouseOverMarker={onMouseOverMarker}
        onMouseOutMarker={onMouseOutMarker}
      />
    </>
  );
};

export default World;

const cardStyle = {
  width: "5vw",
  height: "5vw",
  position: 'fixed'
}

const startModalStyle = {
  width: '100%',
  height: '100%',
  position: 'fixed',
  backgroundColor: 'rgba(0, 0, 0, 0)',
  // border: "10px solid blue",
  display: 'flex',
  flexDirection: 'column',
  color: 'white',
  justifyContent: 'center',

  pointEvents: 'none',
};

const upperText = {
  flex: 4,
  // border: "5px solid red",
  // backgroundColor: "red",
  // fontSize: "50px"
};

const middleText = {
  flex: 3,
  // backgroundColor: "green"
  // border: "5px solid green",
  fontSize: '8vw',
  fontWeight: 'bold',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  // letterSpacing: "1vw",
  // marginLeft: "20vw",
  // paddingLeft: "18%"
};

const left = {
  flex: 4,
  display: 'flex',
  flexDirection: 'row',
  // border: "2px solid purple",
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
};
const middle = {
  flex: 1,
  // border: "2px solid white",
};

const right = {
  flex: 4,
  // border: "2px solid orange",
  alignItems: 'flex-start',
};

const lowerText = {
  flex: 4,
  // border: "5px solid yellow",
  textAlign: 'center',
  // backgroundColor: "yellow"
};
