import { PATHS } from "routes/Path";
import { getCurrentUser } from "core/utils/functionHelpers";

const currentUser = getCurrentUser();
const id = currentUser?.user?.id;

export const pages = [
    { name: 'Home', path: '/home' },
    { name: 'About us', path: '/about-us' },
    { name: 'Contact us', path: '/contact-us' },
];

export const settings = [
    { name: 'Dashboard', path: "/profile" },
    // { name: 'My Advertises', path:"/myadvertises/" +id},
    // { name: 'Reservations', path: `${PATHS.MYRESERVATIONS}`},
    { name: 'Logout', path: '' }
];