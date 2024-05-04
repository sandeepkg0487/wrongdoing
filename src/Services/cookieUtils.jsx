
// cookieUtils.js
import { useCookies } from 'react-cookie';

const cookieUtils = (cookieName) => {
    const [cookies] = useCookies([cookieName]);
    return cookies[cookieName];
}

export default cookieUtils;
