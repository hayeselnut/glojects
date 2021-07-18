import React, { useState, useEffect } from 'react';
import ReactGlobe, { defaultDotMarkerOptions } from 'react-globe';
import texture from './8k.jpeg';

import api from '../api';

import ToggleExperienceBtn from './ui/toggleExperienceBtn';
import { zoomToMarker } from './WorldUtil/cameraAnimations';
import { scrapeToGlojectObj } from './WorldUtil/projectsUtil';
import RandomGlojectBtn from './ui/RandomGlojectBtn';

import GlobjectCard from '../components/common/GlojectCard';
import { Button } from 'semantic-ui-react';

const markers = [
  {
    id: 'marker1',
    city: 'Sydney',
    color: 'red',
    coordinates: [-33, 151],
    value: 1
  },
  {
    id: 'marker2',
    city: 'Perth',
    color: 'red',
    coordinates: [-27, 121],
    value: 1
  },
  {
    id: 'marker3',
    city: 'Shanghai',
    color: 'red',
    coordinates: [31, 121],
    value: 1
  },
  {
    id: 'marker4',
    city: 'England',
    color: 'red',
    coordinates: [52, -1],
    value: 1
  },
  {
    id: 'marker5',
    city: 'South Africa',
    color: 'red',
    coordinates: [-15, 34],
    value: 1
  }
]

const initAnimations = [
  {
    coordinates: [-33, 151],
    focusAnimationDuration: 3000,
    focusDistanceRadiusScale: 1.5,
    focusEasingFunction: ['Linear', 'None'],
  },
  {
    coordinates: [-27, 121],
    focusAnimationDuration: 3000,
    focusDistanceRadiusScale: 1.5,
    focusEasingFunction: ['Linear', 'None'],
  },
  {
    coordinates: [31, 121],
    focusAnimationDuration: 3000,
    focusDistanceRadiusScale: 1.5,
    focusEasingFunction: ['Linear', 'None'],
  },
  {
    coordinates: [52, -1],
    focusAnimationDuration: 3000,
    focusDistanceRadiusScale: 1.5,
    focusEasingFunction: ['Linear', 'None'],
  },
  {
    coordinates: [-15, 34],
    focusAnimationDuration: 3000,
    focusDistanceRadiusScale: 1.5,
    focusEasingFunction: ['Linear', 'None'],
  },
]

const initOptions = {
  enableMarkerGlow: true,
  markerGlowCoefficient: 1,
  markerGlowPower: 1,
  markerGlowRadiusScale: 0.6,

  markerRadiusScaleRange: [0.005, 0.02],
  markerType: 'dot', // dot | bar
  enableMarkerToolTip: true,
  markerTooltipRenderer: (marker) => `${marker.title}`,
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
  const [id, setId] = useState('');
  const [team, setTeam] = useState('');
  const [animations, setAnimation] = useState();

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
    setId(obj.id);
    setTeam(obj.team);
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

  const showTeam = () => {
    setAnimation(initAnimations);
    updateGlojects(markers);
  }

  return (
    <>
      {console.log('In world')}
      <Button
        onClick={showTeam}
      >
        Show Team!
      </Button>
      {open ? (
        <div style={startModalStyle}>
          <div style={upperText} />
          <div style={middleText}>
            <div style={left}>
              G<span style={{ letterSpacing: 0 }}>L</span>
            </div>
            <div style={middle} />
            <div style={right}>JECTS</div>
          </div>
          <div style={lowerText}>Press any key to continue</div>
        </div>
      ) : null}
      {!open ? (
        <RandomGlojectBtn glojects={glojects} updateFocus={updateFocus} />
      ) : null}
      {!open ? <ToggleExperienceBtn updateGlojects={updateGlojects} /> : null}
      {hover ? (
        <div style={cardStyle}>
          <GlobjectCard
            src={cardSrc}
            title={cardTitle}
            tags={cardTags}
            description={cardDescription}
            owner={cardOwner}
            id={id}
            team={team}
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
        animations={animations}
      />
    </>
  );
};

export default World;

const cardStyle = {
  position: 'fixed',
  right: '10%',
  top: '20%',
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
  fontSize: '8vw',
  fontWeight: 'bold',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  letterSpacing: '2vw',
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
