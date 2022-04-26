import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import api from '../../api/api';

const AsanasDetails = () => {
    const {aid} = useParams();
  
   
   
    const [data,setData] = useState(null)
    const [isLoading,setLoading]=useState("Loading....") 
    
   
    useEffect(()=>{
       
        
        api.getAsanasById({aid})
            .then(res=>{

            console.log(res.data.asanas)
           
            setData(res.data.asanas)
            setLoading("")
        })
        .catch(e=>{
            console.log(e)
        })

        
       
    },[aid])
    return ( 
      
        data &&
        <div style={{ overflowX:'hidden'}}>
            <br/><h1>{isLoading}</h1><br/>
      
            <div class="container">
  <div class="row">
    <div class="col">
    <img src={data.url} class="img-fluid" alt='' style={{display: "block",padding:'10px', height: "auto"}}/>
    </div>
    <div class="col">
        <br/><br/><br/><br/>
    <h4>{data.title}</h4>
    <br/><br/><br/><br/>
   
    {/* {data && Object.keys(f.favourite).includes(data._id)?setButton(false):setButton(true)} */}
    {/* {button? <button type="button" class="btn btn-success" disabled> Added to favorites..!</button> : f.map(a=>a._id).includes(data._id) ? <button type="button" class="btn btn-success" disabled> Added to favorites..!</button> :  <button type="button" class="btn btn-danger" onClick={()=>handleclick(data)}>Add to favourite</button>} */}
    </div>
  </div>
  <div class="row">
    <div class="col">
    <h5>Benefits</h5>
    <ul>
      {
        data.benefits.map(a=>{
        return <li>
          {a}
        </li>
      })}
      </ul>
    </div>
    <div class="col">
    <h5>Contradications</h5>
    <ul>
      {
        data.contraindications.map(a=>{
        return <li>
          {a}
        </li>
      })}
      </ul>
    </div>
    <div class="col">
    <h5>Type of Asana</h5>
    <ul>
      {
        data.position.map(a=>{
        return <li>
          {a}
        </li>
      })}
      </ul>
    </div>
  </div>
  <div class="row">
    <div class="col">
    <h5>Steps:</h5>
    </div>
  </div>
  <div class="row">
    <div class="col">
    <p>{data.steps}</p>
    </div>
  </div>
   
  </div>
  <br/><br/>
  </div>




      
    
        
     );
}
 
export default AsanasDetails;