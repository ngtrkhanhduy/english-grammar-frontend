import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faCoins,
    faEarthAsia,
    faGear,
    faKeyboard,
    faSignOut,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

export const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

export const userMenu = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'View profile',
        to: '/@hoaa',
    },
    {
        icon: <FontAwesomeIcon icon={faCoins} />,
        title: 'Get coins',
        to: '/coin',
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Settings',
        to: '/settings',
    },
    ...MENU_ITEMS,
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Log out',
        to: '/logout',
        separate: true,
    },
];

export const MENU_TAB_GIOITHIEU = {
    title: 'GIỚI THIỆU',
    url: '/introduce',
};

export const MENU_TAB_LOTRINHHOC = {
    title: 'LỘ TRÌNH HỌC TIẾNG ANH',
    url: '/road-map',
};

export const MENU_TAB_KIEMTRA = {
    title: 'ÔN TẬP',
    url: '/exercises',
};

export const MENU_TAB_NGUPHAP = {
    title: 'NGỮ PHÁP',
    menu: [
        {
            title: '12 Thì cơ bản',
            to: '/tenses',
        },
        {
            title: 'Từ loại',
            to: '/paths-of-speech',
        },
        {
            title: 'Các dạng câu hỏi',
            to: '/questions',
        },
        {
            title: 'Cấu trúc câu',
            to: '/sentence-structure',
        },

        {
            title: 'Cấu trúc ngữ pháp',
            to: '/grammatical-structure',
        },
    ],
};

export const MENU_TAB_TAILIEU = {
    title: 'TÀI LIỆU',
    menu: [
        {
            title: 'Tài liệu',
            to: '/download-document',
        },
        {
            title: 'Videos',
            to: '/download-videos',
        },
    ],
};
