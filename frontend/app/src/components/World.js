import React, {useState, useEffect} from 'react';
import Globe from 'react-globe.gl';

const sampleData = [...Array(100).keys()].map(() => ({
    projectName: "My Project",
    lat: (Math.random() - 0.5) * 180,
    lng: (Math.random() - 0.5) * 360,
    size: 1,
    color: ['blue', 'yellow', 'green', 'red'][Math.round(Math.random() * 3)]
}));

const World = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        setProjects(sampleData);
    }, []);

    const filterByColor = (color) => {
        const newProjects = projects.filter(p => p.color === color);
        setProjects(newProjects);
    }
    
    return (
        <>
            <button onClick={() => {filterByColor("green")}}>FILTER</button>
            <Globe
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                pointsData={projects}
                pointAltitude={0}
                pointRadius={d => d.size}
                pointLabel={d => d.projectName}
                pointColor={d => d.color}
                onPointClick={d => console.log("Clicked on ", d)}
                onPointHover={d => console.log("Hovering on ", d)}
                animateIn={true}
            />
        </>
    )
}

export default World;