import React, { useState, useEffect } from 'react';
import ReactGlobe from 'react-globe';
import texture from './8k.jpeg';

import api from '../api';

import ToggleExperienceBtn from './ui/toggleExperienceBtn';
import { zoomToMarker } from './WorldUtil/cameraAnimations';
import { scrapeToGlojectObj } from './WorldUtil/projectsUtil';
import RandomGlojectBtn from './ui/RandomGlojectBtn';

import GlobjectCard from '../components/common/GlojectCard';

// const sampleData = [...Array(25).keys()].map(() => ({
//     projectName: "Project Name",
//     difficulty: ["Easy", "Medium", "Hard"][Math.round(Math.random() * 2)],
//     coordinates: [(Math.random() - 0.5) * 180, (Math.random() - 0.5) * 360],
//     value: 25,
// }));

// sampleData.forEach((marker, index) => {
//     marker['id'] = index.toString();
//     if (marker.difficulty === "Easy") {
//         marker['color'] = 'green';
//     } else if (marker.difficulty === "Medium") {
//         marker['color'] = 'blue';
//     } else if (marker.difficulty === "Hard") {
//         marker['color'] = 'red';
//     }
// })

// console.log(sampleData);

const initOptions = {
  enableMarkerGlow: true,
  markerGlowCoefficient: 1,
  markerGlowPower: 1,
  markerGlowRadiusScale: 0.6,

  markerRadiusScaleRange: [0.005, 0.02],
  markerType: 'dot', // dot | bar
  enableMarkerToolTip: true,
  // markerEnterAnimationDuration: 3000,
  // markerEnterEasingFunction: ['Bounce', 'InOut'],
  // markerExitEasingFunction: ['Cubic', 'Out'],
  markerTooltipRenderer: (marker) => `${marker.title}`,
  // markerRadiusScaleRange: [0.01, 0.05],

  // cameraAutoRotateSpeed: 0.5,

  focusAnimationDuration: 2000,
  focusDistanceRadiusScale: 1.5,
  cameraRotateSpeed: 0.5,
  focusEasingFunction: ['Linear', 'None'],
  enableDefocus: true,
};

const World = () => {
  const [glojects, setGlojects] = useState([]);
  const [focus, setFocus] = useState(null);
  const [open, setOpen] = useState(true);
  const [options, setOptions] = useState(initOptions);
  const [hover, setHover] = useState(false);

  const [cardSrc, setCardSrc] = useState('');
  const [cardTitle, setCardTitle] = useState('');
  const [cardTags, setCardTags] = useState([]);
  const [cardDescription, setCardDescription] = useState('');
  const [cardOwner, setCardOwner] = useState('');

  const initZoom = () => {
    // const newOptions = {...options};
    // newOptions.cameraAutoRotateSpeed = 0.1;
    window.removeEventListener('keydown', initZoom, true);
    window.removeEventListener('click', initZoom, true);
    setFocus([-33, 151]);
    setOpen(false);
    // setOptions(newOptions);
  };

  useEffect(() => {
    window.addEventListener('keydown', initZoom, true);
    window.addEventListener('click', initZoom, true);

    api.glojects.getAllActives().then((res) => {
      const newGlojects = [];
      res.forEach((value, index) => {
        newGlojects.push(scrapeToGlojectObj(value));
      });

      console.log('New glojects are ', newGlojects);
      setGlojects(newGlojects);
    });
  }, []);


  const onClick = (obj) => {
    zoomToMarker(updateFocus, obj);
    setCardSrc(obj.image);
    setCardTitle(obj.title);
    setCardTags(obj.tags);
    setCardDescription(obj.description);
    setCardOwner(obj.owner);
    setHover(true);
  };

  const onDefocus = () => {
    setHover(false);
  };

  const updateGlojects = (newGlojects) => {
    setGlojects(newGlojects);
  };

  const updateFocus = (coordinates) => {
    setFocus(coordinates);
  };

  return (
    <>
      {console.log('In world')}
      {open ? (
        <div style={startModalStyle}>
          <div style={upperText} />
          <div style={middleText}>
            <div style={left}>
                G<span style={{letterSpacing: 0}}>L</span>
            </div>
            <div style={middle}/>
            <div style={right}>JECTS</div>
          </div>
          <div style={lowerText}>Press any key to continue</div>
        </div>
      ) : null}
      {!open ? <RandomGlojectBtn glojects={glojects} updateFocus={updateFocus} /> : null}
      {!open ? <ToggleExperienceBtn updateGlojects={updateGlojects}/> : null}
      {hover ? (
        <div style={cardStyle}>
          <GlobjectCard
            src={cardSrc}
            title={cardTitle}
            tags={cardTags}
            description={cardDescription}
            owner={cardOwner}
          />
        </div>
      ) : null}
      <ReactGlobe
        globeTexture={texture}
        focus={focus}
        height="100vh"
        width="100wh"
        markers={glojects}
        options={options}
        onClickMarker={onClick}
        onDefocus={onDefocus}
        initialCameraDistanceRadiusScale={25}
      />
    </>
  );
};

export default World;

const cardStyle = {
  position: 'fixed',
  right: '10%',
  top: '35%',
};

const startModalStyle = {
  width: '100%',
  height: '100%',
  position: 'fixed',
  backgroundColor: 'rgba(0, 0, 0, 0)',
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
    fontSize: "8vw",
    fontWeight: "bold",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    letterSpacing: "2vw",
    // marginLeft: "20vw",
    // paddingLeft: "18%"
}

const left = {
    flex: 4,
    display: "flex",
    flexDirection: "row",
    // border: "2px solid purple",
    alignItems: "flex-end",
    justifyContent: "flex-end",
}

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
