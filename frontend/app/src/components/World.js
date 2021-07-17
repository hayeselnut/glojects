import React, {useState, useEffect} from 'react';
import ReactGlobe from 'react-globe';

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
        // markerEnterAnimationDuration: 3000,
        // markerEnterEasingFunction: ['Bounce', 'InOut'],
        // markerExitEasingFunction: ['Cubic', 'Out'],
        // markerTooltipRenderer: marker => 
        //     `${marker.city} (Sales: ${marker.value}.0M)`,
        // markerRadiusScaleRange: [0.01, 0.05],

        focusAnimationDuration: 2000,
        focusDistanceRadiusScale: 2,
        focusEasingFunction: ['Circular', 'In'],
        enableDefocus: false,
    }

    return (
        <>   
            <button onClick={() => setFocus([1.3521, 103.8198])}>Singapore</button>
            <ReactGlobe 
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