
const initialState={
    user:[]
}

const loginReducer = (state = initialState  , action) =>{
    switch(action.type){
        case "INIT_USER":
                  console.log("never here")
                    return {
                        ...state,
                        // exams:[state.exams,action.data.json]
                        user:state.user.concat(action.data.json)        
                    }
        default:
      
        console.log(state.user);
            return state;
    }
}
export default loginReducer;