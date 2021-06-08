import {createObj} from './util.js';
import {OBJECT_COUNT} from './data.js';

const createSimilarObjects = () => new Array(OBJECT_COUNT).fill(null).map(() => createObj());
createSimilarObjects();
