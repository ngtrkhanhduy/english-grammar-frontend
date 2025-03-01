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
import PresentSimple from '~/pages/Tenses/PresentSimple';
import PresentContinuous from '~/pages/Tenses/PresentContinuous';
import PresentPerfect from '~/pages/Tenses/PresentPerfect';
import PresentPerfectContinuous from '~/pages/Tenses/PresentPerfectContinuous';
import PastSimple from '~/pages/Tenses/PastSimple';
import PastContinuous from '~/pages/Tenses/PastContinuous';
import PastPerfect from '~/pages/Tenses/PastPerfect';
import PastPerfectContinuous from '~/pages/Tenses/PastPerfectContinuous';
import FutureSimple from '~/pages/Tenses/FutureSimple';
import FutureContinuous from '~/pages/Tenses/FutureContinuous';
import FuturePerfect from '~/pages/Tenses/FuturePerfect';
import FuturePerfectContinuous from '~/pages/Tenses/FuturePerfectContinuous';
import Logout from '~/pages/Logout';
import { Practice_ToeicExercises_001, ToeicExercises_001 } from '~/pages/Exercises/Exercises_001';
import ChangePassword from '~/pages/ChangePassword';
// Public routes
const privateRoutes = {
    default: [
        { path: '/', component: Home },
        { path: '/home', component: Home },
        { path: '/profile', component: Profile },
        { path: '/change-password', component: ChangePassword },
        { path: '/introduce', component: Introduce },
        { path: '/road-map', component: RoadMap },
        { path: '/logout', component: Logout },
        { path: '/exercises', component: Exercises },
        { path: '/download-document', component: Document },
        { path: '/download-videos', component: Videos },

        { path: '/toiec-exercises-001', component: ToeicExercises_001 },
        { path: '/toiec-exercises-001/practice', component: Practice_ToeicExercises_001 },
    ],
    learning: [
        { path: '/tenses', component: Tenses },
        { path: '/present-simple', component: PresentSimple },
        { path: '/present-continuous', component: PresentContinuous },
        { path: '/present-perfect', component: PresentPerfect },
        { path: '/present-perfect-continuous', component: PresentPerfectContinuous },
        { path: '/past-simple', component: PastSimple },
        { path: '/past-continuous', component: PastContinuous },
        { path: '/past-perfect', component: PastPerfect },
        { path: '/past-perfect-continuous', component: PastPerfectContinuous },
        { path: '/future-simple', component: FutureSimple },
        { path: '/future-continuous', component: FutureContinuous },
        { path: '/future-perfect', component: FuturePerfect },
        { path: '/future-perfect-continuous', component: FuturePerfectContinuous },
        { path: '/grammatical-structure', component: GrammaticalStructure },
        { path: '/paths-of-speech', component: PathsOfSpeech },
        { path: '/questions', component: Questions },
        { path: '/sentence-structure', component: SentenceStructure },
        { path: '/download-document', component: Document },
        { path: '/download-videos', component: Videos },
    ],
};

const publicRoutes = [{ path: '/Login', component: Login }];

export { publicRoutes, privateRoutes };
