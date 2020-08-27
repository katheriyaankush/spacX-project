import * as actionType from './action';
const initialState = {
    data:[],
    error:false,
    history:''
    
};

const reducer=(state=initialState,action)=>{


switch (action.type) {
    case actionType.HISTORY:
     
    return{
        
             ...state,
             history: action.history
    
    }
        
      case actionType.DATA:
     
     
      return{
         ...state,
         data: action.data
      }

}


return state;

}

export default reducer;