import { createStore ,applyMiddleware} from "redux";
import * as  thunk from "redux-thunk";
import axios from "axios";

const FETCH_USERS_REQUEST="FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS="FETCH_USERS_SUCCESS";
const FETCH_USERS_ERROR="FETCH_USERS_ERROR";

const initialState={
    loading:false,
    users:[],
    error:""
}

const fetchUsersRequest=()=>{
    return {
       type:FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess=users=>{
    return {
       type:FETCH_USERS_SUCCESS,
       payload:users
    }
}

const fetchUsersError=error=>{
    return {
        type:FETCH_USERS_ERROR,
        payload:error
    }
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case FETCH_USERS_REQUEST:{
            return {
                ...state,
                loading:true
            }
        }
        case FETCH_USERS_SUCCESS:{
            return {
                ...state,
                loading:false,
                users:action.payload,
                error:""
            }
        }
        case FETCH_USERS_ERROR:{
            return {
                ...state,
                loading:false,
                users:[],
                error:action.payload
            }
        }
        default:return state;
    }
}

const fetchUser=()=>async (dispatch)=>{
   dispatch(fetchUsersRequest());
    try {
        const result=await axios.get("https://jsonplaceholder.typicode.com/todos/");
        // console.log("result is ",result);
        const users=result.data.map((user)=>user.id);
        console.log("users is ");
        dispatch(fetchUsersSuccess(users))
    } catch (error) {
        dispatch(fetchUsersError(error.message))
    }
}

const store=createStore(reducer,applyMiddleware(thunk.thunk));
const unsubscribe=store.subscribe(()=>{
    console.log("updated state is ",store.getState())
});

store.dispatch(fetchUser())
