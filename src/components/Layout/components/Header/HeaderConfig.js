import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';

export const userMenu = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'View profile',
        to: '/profile',
    },
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Change password',
        to: '/change-password',
    },
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Log out',
        to: '/logout',
        separate: true,
    },
];

export const MENU_TAB_HOME = {
    title: 'TRANG CHỦ',
    url: '/',
};

export const MENU_TAB_KIEMTRA = {
    title: 'ÔN TẬP',
    url: '/exercises',
};

export const MENU_TAB_NGUPHAP = {
    title: 'NGỮ PHÁP',
    url: '/present-simple',
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
