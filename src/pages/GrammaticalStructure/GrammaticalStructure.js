function grammaticalStructure() {
    const lessons = [
        { title: 'Bài 1: Thì hiện tại đơn', to: '/present-simple' },
        { title: 'Bài 2: Thì hiện tại tiếp diễn', to: '/present-continuous' },
        { title: 'Bài 3: Thì hiện tại hoàn thành', to: '/present-perfect' },
        { title: 'Bài 4: Thì hiện tại hoàn thành tiếp diễn', to: '/present-perfect-continuous' },
        { title: 'Bài 5: Thì quá khứ đơn', to: '/past-simple' },
        { title: 'Bài 6: Thì quá khứ tiếp diễn', to: '/past-continuous' },
        { title: 'Bài 7: Thì quá khứ hoàn thành', to: '/past-perfect' },
        { title: 'Bài 8: Thì quá khứ hoàn thành tiếp diễn', to: '/past-perfect-continuous' },
        { title: 'Bài 9: Thì tương lai đơn', to: '/future-simple' },
        { title: 'Bài 10: Thì tương lai tiếp diễn', to: '/future-continuous' },
        { title: 'Bài 11: Thì tương lai hoàn thành', to: '/future-perfect' },
        { title: 'Bài 12: Thì tương lai hoàn thành tiếp diễn', to: '/future-perfect-continuous' },
        { title: 'Bài 13: Danh từ', to: '/noun' },
        { title: 'Bài 14: Động từ', to: '/verb' },
        { title: 'Bài 15: Tính từ', to: '/adjective' },
        { title: 'Bài 16: Trạng từ', to: '/adverb' },
        { title: 'Bài 17: Đại từ', to: '/pronoun' },
        { title: 'Bài 18: Giới từ', to: '/preposition' },
        { title: 'Bài 19: Liên từ', to: '/conjunction' },
        { title: 'Bài 20: Thán từ', to: '/interjection' },
        { title: 'Bài 21: Câu hỏi Yes/No', to: '/yes-no-question' },
        { title: 'Bài 22: Câu hỏi Wh-', to: '/wh-question' },
        { title: 'Bài 23: Câu hỏi đuôi', to: '/tag-question' },
        { title: 'Bài 24: Câu hỏi lựa chọn', to: '/choice-question' },
        { title: 'Bài 25: Câu hỏi phủ định', to: '/negative-question' },
        { title: 'Bài 26: Câu đơn', to: '/simple-sentence' },
        { title: 'Bài 27: Câu ghép', to: '/compound-sentence' },
        { title: 'Bài 28: Câu phức', to: '/complex-sentence' },
        { title: 'Bài 29: Câu ghép phức', to: '/compound-complex-sentence' },
        { title: 'Bài 30: Câu điều kiện', to: '/conditional-sentence' },
        { title: 'Bài 31: Câu bị động', to: '/passive-sentence' },
        { title: 'Bài 32: Câu tường thuật', to: '/reported-speech' },
        { title: 'Bài 33: Câu so sánh', to: '/comparative-sentence' },
        { title: 'Bài 34: Cụm động từ', to: '/phrasal-verb' },
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to EnglishGrammar Course</h1>
            <p className="text-lg text-gray-700 mb-6 text-center">
                Explore grammar lessons to improve your writing and communication skills.
            </p>
            <div className="mt-6 w-full max-w-lg">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Course Lessons</h2>
                <ul className="bg-white shadow-lg rounded-lg p-4">
                    {lessons.map((lesson, index) => (
                        <li key={index} className="mb-2">
                            <a href={lesson.to} className="text-blue-500 hover:underline">
                                {lesson.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default grammaticalStructure;
