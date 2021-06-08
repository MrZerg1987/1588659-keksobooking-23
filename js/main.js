import {OBJECT_COUNT} from './data.js';
import {createObj} from './util.js';

const createSimilarObjects = () => new Array(OBJECT_COUNT).fill(null).map(() => createObj());
createSimilarObjects();
