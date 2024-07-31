import Cookies from 'universal-cookie';
// export const url = 'airsig.kgpl.com';
// export const media_url = 'airsig.kgpl.com/media/';
// export const url = 'http://airsig.kgpl.com';
export const url = 'http://127.0.0.1:8000/';
// export const media_url = 'http://airsig.kgpl.com/';
export const media_url = 'http://127.0.0.1:8000/media/';
// export const url = 'http://airsig.kgpl.com'
export function logout() {
  const cookies = new Cookies();
  cookies.remove('loggedIn', { path: '/' });
  console.log(cookies.get('loggedIn'));
  // alert("removed "+cookies.get('loggedIn'))
  window.location = '/login';
}

export const getUserInfo = () => {
  const cookies = new Cookies();
  const user_id = cookies.get('user_id');
  const token = cookies.get('token');
  const loggedIn = cookies.get('loggedIn');
  return {
    user_id,
    token,
    loggedIn
  } 
}
