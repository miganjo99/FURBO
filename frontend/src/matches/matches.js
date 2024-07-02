//import {IN_GetLastMatches} from '../../intermediate/intermediate.js';

window.addEventListener("load", (event) => {
    console.log("page is fully loaded");
    GetLastMatches();
});



function GetLastMatches(){
    let matches = IN_GetLastMatches(5);
    console.log(matches);

    
}
