import React , {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Aux from '../hoc/Axiliury/Axilury';

import Payload from '../components/Payload/Payload';
import Pagination from '../components/Pagination/Pagination';
import History from '../components/History/History';
import Spinner from '../components/Spinner/Spinner'
import './Home.css'

import * as actionType from '../Store/action';







class Home extends Component{

    state={
        data:[],
        error:false,
     
       loading:false,
        currentPage: 1,
        dataPerPage:10,
        history: false,
        searchAdd:'',
        showSpinner:true

    };

componentDidMount(){ 
 
    this.setState({showSpinner: true})

    axios.get('https://api.spacexdata.com/v3/history').then(  respose=> {
 
       this.props.onHistoryAdd(respose.data);
       this.setState({showSpinner: false})

} 
    
    
    ).catch(error=>{
                                 
        this.setState({error: false})
                    
 });

 axios.get('https://api.spacexdata.com/v3/payloads').then(  respose2=> {
         
    this.props.onData(respose2.data);
    this.setState({showSpinner: false})

} 

    ).catch(error=>{
                                   
        this.setState({error: false})
 });





}

 paginate = pageNumber =>{ 
     
    this.setState({currentPage: pageNumber});


};

historyHandler = () =>{ 
     
    this.setState({history: !this.state.history});

}


filterList=(event)=> {
    let value = event.target.value;
      if(!value.length){
        this.componentDidMount();
      
      }

    this.setState({searchAdd: event.target.value});

    let dataVal = this.props.data, data=[];

    data = dataVal.filter((dataVal)=>{
        return dataVal.payload_id.toLowerCase().search(value.toLowerCase()) !== -1;
    });
   // console.log("data",data);
   this.props.onData(data);

   
}

filterListHistory=(event)=> {
    let value = event.target.value;
      if(!value.length){
        this.componentDidMount();
      
      }

    this.setState({searchAdd: event.target.value});

    let dataVal = this.props.historyData, data=[];

    data = dataVal.filter((dataVal)=>{
        return dataVal.event_date_unix.toString().search(value) !== -1;
    });
   // console.log("data",data);
   this.props.onHistoryAdd(data);

   
}




render(){
    

    let indexOfLast = this.state.currentPage * this.state.dataPerPage;
    let indexOfFirst = indexOfLast - this.state.dataPerPage;
    let current= this.props.data.slice(indexOfFirst, indexOfLast);
    if(this.state.history){
         indexOfLast = this.state.currentPage * this.state.dataPerPage;
         indexOfFirst = indexOfLast - this.state.dataPerPage;
        current = this.props.historyData.slice(indexOfFirst, indexOfLast);

    }
    
let element =null;
if(this.state.showSpinner){
element = <Spinner/>;

}
else{
    element =  <div> <h3 onClick = {this.historyHandler} style ={{color:'#301e85', textAlign:'left'}}> Go To {!this.state.history ?  "History" : "Payload" }</h3>

    <h2 style ={{color:'blue'}}>{!this.state.history ?  "Payload Data" : "History Data" } Of SpaceX</h2>
    { !this.state.history ?   <input type="textbox" placeholder="Payload Id Search" value= {this.state.searchAdd} onChange={(e)=>this.filterList(e)}/> : <input type="textbox" placeholder="Event Date Unix Search" value= {this.state.searchAdd} onChange={(e)=>this.filterListHistory(e)}/>  }


  { !this.state.history ? <div><Pagination
      
      dataPerPage={this.state.dataPerPage}
      total={this.props.data.length}
      paginate={this.paginate}
    /> { this.props.data.length !== 0 ? <Payload data={current}  /> : <h3 style={{color:"red"}}> No Record Found</h3> }</div>:<div><Pagination
      
    dataPerPage={this.state.dataPerPage}
    total={this.props.historyData.length}
    paginate={this.paginate}
/> { this.props.historyData.length !== 0 ? <History data={current}  /> : <h3 style={{color:"red"}}> No Record Found</h3> } </div>}
  </div>
}



  


    return(
    
    <Aux  >
      
    {element}
  

 
      
     </Aux>  



    );
}

}

const onStateToProps= state=>{

    return{

        historyData:state.history,
        data:state.data
    }
}
const onDispatchToState= dispatch=>{

    return{

      onHistoryAdd: (history)=>dispatch({type:actionType.HISTORY, history:history}),
       onData:(data)=>dispatch({type:actionType.DATA, data:data})
       
    };
};


export default connect(onStateToProps,onDispatchToState)( Home);