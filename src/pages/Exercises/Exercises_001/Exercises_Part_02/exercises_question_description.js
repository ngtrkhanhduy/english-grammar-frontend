import { questions_01_02 } from './exercises_question';

const questions = questions_01_02;

export const filterQuestionsByNumber = (questions, numbers) => {
    return questions.filter((question) => numbers.includes(Number(question.questionNumber)));
};

export const Questions01 = filterQuestionsByNumber(questions, [31, 32, 33, 34]);
export const Questions02 = filterQuestionsByNumber(questions, [35, 36, 37, 38]);
export const Questions03 = filterQuestionsByNumber(questions, [39, 40, 41, 42]);
export const Questions04 = filterQuestionsByNumber(questions, [43, 44, 45, 46]);

export const QuestDescription01 = () => {
    return (
        <div>
            <p>
                <strong>To:</strong> samsmith@digitalit.com
            </p>
            <p>
                <strong>From:</strong> sharronb@email.com
            </p>
            <p>
                <strong>Date:</strong> September 24
            </p>
            <p>
                <strong>Subject:</strong> Business Contract
            </p>
            <p>Dear Mr. Smith,</p>
            <p>
                I am Sharron Biggs, CEO and founder of BiggsGraphics. I recently came across your advertisement ____
                (131) the partnership of a graphic design company for a number of your projects. BiggsGraphics has ____
                (132) experience working with various small businesses and companies in designing advertising campaigns,
                logos, and websites. ____ (133).
            </p>
            <p>
                Our website <a href="http://www.biggs-graphics.com">www.biggs-graphics.com</a> also has some information
                about our company. I'm interested in working with your company on your projects and hope we can build a
                beneficial partnership.
            </p>
            <p>
                I look forward <span> ____ (134) </span> your reply.
            </p>
            <p>
                Sincerely,
                <br />
                Sharron Biggs
                <br />
                CEO, BiggsGraphics
            </p>
        </div>
    );
};

export const QuestDescription02 = () => {
    return (
        <div>
            <p>
                Thank you for shopping at Larson's China. Our products are known for their modern and unique patterns
                and color combinations, as well as _____(135) and strength. _____(136). Please note, however, that
                repeated drops and rough handling will _____(137) eventual breakage. We suggest you store them carefully
                and that you don't use harsh chemicals, steel sponges, or _____(138) scrubbing when cleaning them.
                Please visit our website at www.larsonchina.com for information about handling and care or call us at
                555-1234 if you have any questions or concerns.
            </p>
        </div>
    );
};

export const QuestDescription03 = () => {
    return (
        <div>
            <p>
                <strong>Position: Gold & Slide Accounting Firm</strong>
            </p>
            <p>
                We are looking for enthusiastic candidates with an educational background in finance or _____(139). All
                candidates should have some computer experience. Job experience is not _____(140) but preferred.
                Candidates with a bilingual language ability _____(141) favored. Positions include jobs in accounting,
                statistics, and general office assistant. If you are interested, please visit our website at
                www.G&Saccountingfirm.com/employment for more information. You can send your cover letters and resumes
                to Karen Hill at khill@G&S.com. We will begin interviewing candidates on Monday, November 5. _____(142).
            </p>
        </div>
    );
};

export const QuestDescription04 = () => {
    return (
        <div>
            <p>
                <strong>To:</strong> Kitchen staff, office employees
            </p>
            <p>
                <strong>From:</strong> Manager, Larry Park
            </p>
            <p>
                <strong>Date:</strong> March 23
            </p>
            <p>
                <strong>Subject:</strong> Renovations
            </p>

            <p>To all kitchen staff and Harmon employees,</p>

            <p>
                From Sunday, March 23 to Thursday, March 27, the employee cafeteria kitchens will undergo renovations as
                new appliances and equipment ____ (143) to replace the old ones. ____ (144). Instead, the convenience
                shops will carry more sandwiches, prepared lunch boxes, and snacks for the employees during this time.
                The renovations will increase the number of sinks, ovens, and stove tops so that a larger volume of
                meals can be provided ____ (145) the lunch and dinner rushes. We apologize for the inconvenience but we
                hope that the changes will ____ (146) the services in the cafeteria.
            </p>
        </div>
    );
};
