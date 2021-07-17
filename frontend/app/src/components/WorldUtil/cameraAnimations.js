/* Animation helpers, including zooming around the globe to your points*/

// Given a marker, sets the focus to that marker, updating the state
export const zoomToMarker = (setFocus, m) => {
    console.log("Setting focus to marker", m);
    setFocus([m.coordinates[0], m.coordinates[1]]);
}