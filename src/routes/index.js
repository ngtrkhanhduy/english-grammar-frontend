// Pages
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Login from '~/pages/Login';
import Exercises from '~/pages/Exercises';
import Introduce from '~/pages/Introduce';
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
import Noun from '~/pages/Tenses/Noun';
import Verb from '~/pages/Tenses/Verb';
import Adjective from '~/pages/Tenses/Adjective';
import Adverb from '~/pages/Tenses/Adverb';
import Pronoun from '~/pages/Tenses/Pronoun';
import Logout from '~/pages/Logout';
import { Practice_ToeicExercises_001, ToeicExercises_001 } from '~/pages/Exercises/Exercises_001';
import ChangePassword from '~/pages/ChangePassword';
import Preposition from '~/pages/Tenses/Preposition';
import Conjunction from '~/pages/Tenses/Conjunction';
import Interjection from '~/pages/Tenses/Interjection';
import YesNoQuestion from '~/pages/Tenses/YesNoQuestion';
import WhQuestion from '~/pages/Tenses/WhQuestion';
import TagQuestion from '~/pages/Tenses/TagQuestion';
import ChoiceQuestion from '~/pages/Tenses/ChoiceQuestion';
import NegativeQuestion from '~/pages/Tenses/NegativeQuestion';
import SimpleSentence from '~/pages/Tenses/SimpleSentence';
import CompoundSentence from '~/pages/Tenses/CompoundSentence';
import ComplexSentence from '~/pages/Tenses/ComplexSentence';
import CompoundComplexSentence from '~/pages/Tenses/CompoundComplexSentence';
import ConditionalSentence from '~/pages/Tenses/ConditionalSentence';
import PassiveSentence from '~/pages/Tenses/PassiveSentence';
import ReportedSpeech from '~/pages/Tenses/ReportedSpeech';
import ComparativeSentence from '~/pages/Tenses/ComparativeSentence';
import PhrasalVerb from '~/pages/Tenses/PhrasalVerb';
import CommitSoon from '~/pages/CommingSoon';

// Public routes
const privateRoutes = {
    default: [
        { path: '/profile', component: Profile },
        { path: '/change-password', component: ChangePassword },
        { path: '/introduce', component: Introduce },
        { path: '/logout', component: Logout },
        { path: '/exercises', component: Exercises },
        { path: '/toiec-exercises-001', component: ToeicExercises_001 },
        { path: '/toiec-exercises-001/practice', component: Practice_ToeicExercises_001 },
        { path: '/comming-soon', component: CommitSoon },
        { path: '/comming-soon/practice', component: CommitSoon },
    ],
    learning: [
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
        { path: '/noun', component: Noun },
        { path: '/verb', component: Verb },
        { path: '/adjective', component: Adjective },
        { path: '/adverb', component: Adverb },
        { path: '/pronoun', component: Pronoun },
        { path: '/preposition', component: Preposition },
        { path: '/conjunction', component: Conjunction },
        { path: '/interjection', component: Interjection },
        { path: '/yes-no-question', component: YesNoQuestion },
        { path: '/wh-question', component: WhQuestion },
        { path: '/tag-question', component: TagQuestion },
        { path: '/choice-question', component: ChoiceQuestion },
        { path: '/negative-question', component: NegativeQuestion },
        { path: '/simple-sentence', component: SimpleSentence },
        { path: '/compound-sentence', component: CompoundSentence },
        { path: '/complex-sentence', component: ComplexSentence },
        { path: '/compound-complex-sentence', component: CompoundComplexSentence },
        { path: '/conditional-sentence', component: ConditionalSentence },
        { path: '/passive-sentence', component: PassiveSentence },
        { path: '/reported-speech', component: ReportedSpeech },
        { path: '/comparative-sentence', component: ComparativeSentence },
        { path: '/phrasal-verb', component: PhrasalVerb },
    ],
};

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/Login', component: Login },
    { path: '/home', component: Home },
];

export { publicRoutes, privateRoutes };
