import Cookies from 'universal-cookie';
export const url = 'http://192.168.10.53:8000'
export const media_url = 'http://192.168.10.53:8000/media/'
// export const url = 'http://61.69.119.182:8000'
export  function logout(){
    const cookies = new Cookies();
    cookies.remove('loggedIn',{ path: '/' })
    console.log(cookies.get('loggedIn'))
    // alert("removed "+cookies.get('loggedIn'))
    window.location = '/login'
}