//import {IN_GetLastMatches} from '../../intermediate/intermediate.js';

window.addEventListener("load", (event) => {
    console.log("page is fully loaded");
    GetLastMatches();
});



function GetLastMatches(){
    IN_GetLastMatches(5);
}
