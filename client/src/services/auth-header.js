export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('under_one_roof'));
  
    if (user && user.accessToken) {
      return { 'x-access-token': user.accessToken };
    } else {
      return {};
    }
}