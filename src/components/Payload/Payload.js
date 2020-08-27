import React from 'react';
import   './Payload.css';




const table =(props)=>{

      
return(

<div>

<div className="center">

        <table  >
        <tbody>
        <tr>
        <th>Payload Id </th>
        <th>Manufacturer</th>
        <th>Nationality</th>
        <th> Payload Type </th>
        <th>Orbit </th>
        <th>Customer</th>
        <th>Payload mass kg</th>
        </tr>
        {  props.data.map((data)=>{  return (
                
                <tr key = {data.payload_id}>
                <td>{data.payload_id}</td>
                <td>{data.manufacturer}</td>
            <td>{data.nationality} </td>
                <td>{data.payload_type}</td>
                <td>{data.orbit}</td>

        <td>{data.customers[0]}</td>
        <td>{data.payload_mass_kg}</td>

              
              
           
        
              </tr>
  

    )})}
    
</tbody>
</table>

</div>
</div>

);
     }



export default table ;