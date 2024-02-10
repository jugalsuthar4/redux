import { createStore ,combineReducers} from "redux";

const  initialCakeState={
    numOfCakes:10
}

const initialIceCreamState={
    numOfIceCreams:10
}
const BUY_CAKE="BUY_CAKE";
const BUY_ICECREAM="BUY_ICECREAM"

const buyCake=()=>{
    return {
        type:BUY_CAKE
    }
}
const buyIceCream=()=>{
    return {
        type:BUY_ICECREAM
    }
}

const cakeReducer=(state=initialCakeState,action)=>{
     switch(action.type){
        case BUY_CAKE:{
            return {
                ...state,
                numOfCakes:state.numOfCakes-1
            }
        }
        default:
            return state;
     }
}

const iceCreamReducer=(state=initialIceCreamState,action)=>{
    switch(action.type){
        case BUY_ICECREAM:{
            return {
              ...state,
              numOfIceCreams:state.numOfIceCreams-1
            }
        }
        default:
            return state;
    }
}

const rootReducer=combineReducers({
    cake:cakeReducer,
    icecream:iceCreamReducer
})
const store=createStore(rootReducer);

console.log("intial state is ",store.getState());

const unsubscribe=store.subscribe(()=>{
    console.log("updated state is ",store.getState())
})
store.dispatch(buyCake())
store.dispatch(buyIceCream())
unsubscribe();
