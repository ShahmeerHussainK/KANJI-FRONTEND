

// import fetch from 'cross-fetch'
export const FETCH_LOGIN_SUCCESS = 'INIT_USER';

export const fetchExamsSuccess = json => ({
  type: FETCH_LOGIN_SUCCESS,
  data: { json }
});

function fetchExamsMiddleHandler() {
  return dispatch => {
    return fetch("http://127.0.0.1:8000/addExam/")
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        
        dispatch(fetchExamsSuccess(json));
        return json;
      })
  };
  }
export default function fetchExams(){
  return function (dispatch){
    return dispatch(
      fetchExamsMiddleHandler(dispatch)
    )
  }
}  
  
  // Handle HTTP errors since fetch won't.
  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }