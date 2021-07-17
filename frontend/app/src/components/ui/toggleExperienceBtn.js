// import React, {useState, useEffect} from 'react';
// import { Button } from 'semantic-ui-react';
// import { filterByExactField } from '../WorldUtil/projectsUtil';
// const toggleExperienceBtn = (markers, setMarkers) => {
//     const [state, setState] = useState("all");

//     const getNextState = () => {
//         if (state === "all") {
//             return "easy";
//         } else if (state === "easy") {
//             return "medium";
//         } else if (state === "medium") {
//             return "hard";
//         } else if (state === "hard") {
//             return "all";
//         }
//     }

//     const onClick = () => {
//         setState(getNextState());
//         setMarkers(filterByExactField())
//     }

//     return (
//         <Button onClick={onClick}>
//             Experience: {state}
//         </Button>
//     )
// }

// export default toggleExperienceBtn;