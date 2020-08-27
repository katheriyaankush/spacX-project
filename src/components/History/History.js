import React from 'react';
import   './History.css';




const table =(props)=>{

      
return(

<div>

<div className="center">

        <table  >
        <tbody>
        <tr>
        <th>Event Date Unix</th>
        <th>Details   </th>
        <th>Event Date UTC</th>
        <th>Flight Number </th>
        <th>Article</th>
       
        </tr>
        {  props.data.map((data)=>{  return (
                
                <tr key = {data.event_date_unix}>
                <td>{data.event_date_unix}</td>
        <td> {data.details}</td>
                <td>{data.event_date_utc}</td>
            <td>{data.flight_number} </td>
                <td>{data.links.article}</td>

        

              
              
           
        
              </tr>
  

    )})}
    
</tbody>
</table>

</div>
</div>

);
     }



export default table ;