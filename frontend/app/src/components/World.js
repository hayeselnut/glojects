import React, {useState, useEffect} from 'react';
import ReactGlobe from 'react-globe';
import texture from './16k.jpeg';

const sampleData = [
    {
      "id": "marker1",
      "city": "Singapore",
      "color": "red",
      "coordinates": [
        1.3521,
        103.8198
      ],
      "value": 50
    },
    {
      "id": "marker2",
      "city": "New York",
      "color": "blue",
      "coordinates": [
        40.73061,
        -73.935242
      ],
      "value": 25
    },
    {
      "id": "marker3",
      "city": "San Francisco",
      "color": "orange",
      "coordinates": [
        37.773972,
        -122.431297
      ],
      "value": 35
    },
    {
      "id": "marker4",
      "city": "Beijing",
      "color": "gold",
      "coordinates": [
        39.9042,
        116.4074
      ],
      "value": 135
    },
    {
      "id": "marker5",
      "city": "London",
      "color": "green",
      "coordinates": [
        51.5074,
        0.1278
      ],
      "value": 80
    },
    {
      "id": "marker6",
      "city": "Los Angeles",
      "color": "gold",
      "coordinates": [
        29.7604,
        -95.3698
      ],
      "value": 54
    }
]

const World = () => {
    const [projects, setProjects] = useState([]);
    const [focus, setFocus] = useState(null);
    useEffect(() => {
        setProjects(sampleData);
    }, [])

    const options = {
        enableMarkerGlow: true,
        markerRadiusScaleRange: [0.005, 0.02],
        markerType: 'dot',
        enableMarkerToolTip: true,
        focusAnimationDuration: 3000,
        focusDistanceRadiusScale: 1.4,
        focusEasingFunction: ['Circular', 'In'],
        enableDefocus: false,
    }

    // const texture = 'https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/globe_dark.jpg'

    return (
        <>   
            <button onClick={() => setFocus([1.3521, 103.8198])}>Singapore</button>
            <ReactGlobe 
                globeTexture={texture}
                focus={focus}
                height="100vh"
                width="100wh"
                globeCloudsTexture={null}
                markers={projects}
                options={options}
            />
        </>
    )
}

export default World;