// Pages
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Login from '~/pages/Login';
import Document from '~/pages/Document';
import Tenses from '~/pages/Tenses';
import Exercises from '~/pages/Exercises';
import GrammaticalStructure from '~/pages/GrammaticalStructure';
import PathsOfSpeech from '~/pages/PathsOfSpeech';
import RoadMap from '~/pages/RoadMap';
import SentenceStructure from '~/pages/SentenceStructure';
import Videos from '~/pages/Videos';
import Introduce from '~/pages/Introduce';
import Questions from '~/pages/Questions';

// Public routes
const privateRoutes = {
    default: [
        { path: '/', component: Home },
        { path: '/profile', component: Profile },
        { path: '/introduce', component: Introduce },
        { path: '/road-map', component: RoadMap },
    ],
    learning: [
        { path: '/tenses', component: Tenses },
        { path: '/exercises', component: Exercises },
        { path: '/grammatical-structure', component: GrammaticalStructure },
        { path: '/paths-of-speech', component: PathsOfSpeech },
        { path: '/questions', component: Questions },
        { path: '/sentence-structure', component: SentenceStructure },
    ],
    document: [
        { path: '/download-document', component: Document },
        { path: '/download-videos', component: Videos },
    ],
};

const publicRoutes = [{ path: '/Login', component: Login }];

export { publicRoutes, privateRoutes };
