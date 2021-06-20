import {mapCanvas, similarObjectsFragment} from './popup.js';
import {makeDeactivatePage, makeActivatePage} from './form.js';

mapCanvas.appendChild(similarObjectsFragment.childNodes[0]);
makeDeactivatePage();
makeActivatePage();

