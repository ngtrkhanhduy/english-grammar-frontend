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
    url: '/gioithieu',
};

export const MENU_TAB_THUVIEN = {
    title: 'THƯ VIỆN',
    menu: [
        {
            title: 'Lộ trình học Tiếng Anh',
            to: '/road-map',
        },
        {
            title: 'Từ vựng tiếng Anh',
            to: '/vocabulary',
        },
        {
            title: 'Ngữ Pháp Tiếng Anh',
            to: '/grammar',
        },
        {
            title: 'Blog',
            to: '/blog',
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
