const MenuItem_Learning = [
    {
        title: 'Ngữ pháp',
        to: '/tenses',
        subItems: [
            {
                title: 'Thì hiện tại đơn',
                to: '/present-simple',
                completed: true,
            },
            {
                title: 'Thì hiện tại tiếp diễn',
                to: '/present-continuous',
                completed: true,
            },
            {
                title: 'Thì hiện tại hoàn thành',
                to: '/present-perfect',
                completed: false,
            },
            {
                title: 'Thì hiện tại hoàn thành tiếp diễn',
                to: '/present-perfect-continuous',
                completed: false,
            },
            {
                title: 'Thì quá khứ đơn',
                to: '/past-simple',
                completed: false,
            },
            {
                title: 'Thì quá khứ tiếp diễn',
                to: '/past-continuous',
                completed: false,
            },
            {
                title: 'Thì quá khứ hoàn thành',
                to: '/past-perfect',
                completed: false,
            },
            {
                title: 'Thì quá khứ hoàn thành tiếp diễn',
                to: '/past-perfect-continuous',
                completed: false,
            },
            {
                title: 'Thì tương lai đơn',
                to: '/future-simple',
                completed: false,
            },
            {
                title: 'Thì tương lai tiếp diễn',
                to: '/future-continuous',
                completed: false,
            },
            {
                title: 'Thì tương lai hoàn thành',
                to: '/future-perfect',
                completed: false,
            },
            {
                title: 'Thì tương lai hoàn thành tiếp diễn',
                to: '/future-perfect-continuous',
                completed: false,
            },
        ],
    },
    {
        title: 'Từ loại',
        to: '/paths-of-speech',
        subItems: [
            {
                title: 'Danh từ',
                to: '/nouns',
            },
            {
                title: 'Động từ',
                to: '/verbs',
            },
            {
                title: 'Tính từ',
                to: '/adjectives',
            },
            {
                title: 'Trạng từ',
                to: '/adverbs',
            },
            {
                title: 'Đại từ',
                to: '/pronouns',
            },
            {
                title: 'Giới từ',
                to: '/prepositions',
            },
            {
                title: 'Liên từ',
                to: '/conjunctions',
            },
            {
                title: 'Thán từ',
                to: '/interjections',
            },
        ],
    },
    {
        title: 'Các dạng câu hỏi',
        to: '/question',
        subItems: [
            {
                title: 'Câu hỏi Yes/No',
                to: '/yes-no-questions',
            },
            {
                title: 'Câu hỏi Wh-',
                to: '/wh-questions',
            },
            {
                title: 'Câu hỏi đuôi',
                to: '/tag-questions',
            },
            {
                title: 'Câu hỏi lựa chọn',
                to: '/choice-questions',
            },
            {
                title: 'Câu hỏi phủ định',
                to: '/negative-questions',
            },
        ],
    },
    {
        title: 'Cấu trúc câu',
        to: '/sentence-structure',
        subItems: [
            {
                title: 'Câu đơn',
                to: '/simple-sentences',
            },
            {
                title: 'Câu ghép',
                to: '/compound-sentences',
            },
            {
                title: 'Câu phức',
                to: '/complex-sentences',
            },
            {
                title: 'Câu ghép phức',
                to: '/compound-complex-sentences',
            },
        ],
    },
    {
        title: 'Cấu trúc ngữ pháp',
        to: '/grammar-structure',
        subItems: [
            {
                title: 'Câu điều kiện',
                to: '/conditional-sentences',
            },
            {
                title: 'Câu bị động',
                to: '/passive-voice',
            },
            {
                title: 'Câu tường thuật',
                to: '/reported-speech',
            },
            {
                title: 'Câu so sánh',
                to: '/comparative-sentences',
            },
            {
                title: 'Cụm động từ',
                to: '/phrasal-verbs',
            },
        ],
    },
];

const MenuItem_Document = [
    {
        title: 'Document 1',
        to: '/',
    },
    {
        title: 'Document 2',
        to: '/',
    },
];

export { MenuItem_Learning, MenuItem_Document };
