import {mapCanvas, similarObjectsFragment} from './popup.js';
import {setDeactivatePageState, setActivatePageState} from './form.js';

mapCanvas.appendChild(similarObjectsFragment.childNodes[0]);
setDeactivatePageState();
setActivatePageState();

