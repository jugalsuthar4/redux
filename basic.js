import { createStore } from "redux";


const initialState={
    numOfCakes:10
}
const BUY_CAKE="BUY_CAKE";

const buyCake=()=> {
   return { type:BUY_CAKE }
}


const reducer=(state=initialState,action)=>{
    switch(action.type){
        case BUY_CAKE:
            return {
                ...state,
                numOfCakes:state.numOfCakes-1
            }
       default: return state;
    }
}


const store=createStore(reducer);
console.log("initail state is ",store.getState())
const unsubscribe=store.subscribe(()=>{
    console.log("updated state is ",store.getState())
})
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
unsubscribe();
store.dispatch(buyCake())



