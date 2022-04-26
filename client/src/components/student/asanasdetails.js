import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import api from '../../api/api';
import ReactHtmlParser from 'react-html-parser';
import {useHistory} from "react-router-dom";
const AsanasDetails = () => {
    const {aid,id} = useParams();
    const history = useHistory();
    const [f,setF] = useState(null)
    const [button,setButton] = useState(false)
    const [data,setData] = useState(null)
    const [isLoading,setLoading]=useState("Loading....") 
    const [msg,setMsg] = useState("");

    const remove = async () =>{
      var data = f.filter(a=>a._id!==aid);
      const payload = {data,id}
      api.updataFavourite(payload).then(res=>{
        if(res.status===200)
          setButton(!button)
          setMsg(`<div class="alert alert-success" role="alert"> Item has been removed from favourites </div>`)
          setTimeout(()=>{
            setMsg("")
            history.goBack()
          },3000)
      })
      .catch(e=>console.log(e))
      
    }
    
    const handleclick = async (data)=>{
       const payload ={data,id} 
       
      await api.favourite(payload).then((res)=>{
        if(res.status===200){
           
            setButton(!button)
            setF(f)
            setMsg(`<div class="alert alert-success" role="alert"> Item has been added to favourites.. </div>`)
          setTimeout(()=>{
            setMsg("")
          },3000)
            
        }
      })
      .catch(e=>{
        console.log(e)
      })
    }
    
    useEffect(()=>{
       
      
        
        api.getAsanasById({aid})
            .then(res=>{

            // console.log(res.data)
            
            setData(res.data.asanas)
            setLoading("")
        })
        .catch(e=>{
            console.log(e)
        })
        
        api.findstudentbyid({id})
              .then(res=>{
               
                 setF(res.data.data.favourite);
              
              })
              .catch(e=>console.log(e))
    },[aid,id])
    return ( 
      
        (data &&f) &&
        <div style={{ overflowX:'hidden'}}>
            <br/><h1>{ReactHtmlParser(isLoading)}</h1><br/>
            {ReactHtmlParser(msg)}
      
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
    {button? <button type="button" class="btn btn-danger" onClick={remove}>Remove</button> : f.map(a=>a._id).includes(data._id) ?  <button type="button" class="btn btn-danger" onClick={remove}>Remove</button> :  <button type="button" class="btn btn-success" onClick={()=>handleclick(data)}>Add to favourite</button>} 
    
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