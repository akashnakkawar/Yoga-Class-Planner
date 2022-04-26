import React from 'react';
import { storage } from '../firebase';
import api from './../api/api'
class Admin extends React.Component{
    constructor(props){
        super(props);
        this.state={
              title:'',
              file:'',
              steps:'',
              position:'',
              benefits:'',
              contraindications:'',
              url:'',
              successMsg:'',
              status:'',
        }
    }
   
  handleInput = (e) =>{
      const {name,value} =e.target
      var new_value = value.toLowerCase();
      this.setState({[name]:new_value})
  
  }
  controlSubmit = async (e)=>{
    console.log('first')
    e.preventDefault();
    var benefits = this.state.benefits;
    var position = this.state.position;
    var contraindications = this.state.contraindications;
    var payload ={benefits,contraindications,position}
    await api.manageSearch(payload)
              .then(res => {
                if(res.status===201){
                  this.handleUpload();
                  console.log('calling second one')
                }
                else{
                  console.log('error')
                }
              })
                .catch(e=>console.log('error occured ',e))
  }
    handlefile =(e)=>{

        this.setState({file:e.target.files[0]})
        

    }
   
    handleSubmit = async () =>{
      console.log('final')
      const title = this.state.title.trim()
      const url = this.state.url
      const steps = this.state.steps.trim()
      var benefits =[]
      benefits = this.state.benefits.split(',')
      benefits = benefits.map(a=>a.trim().toLowerCase());
      var position =[]
      position = this.state.position.split(',')
      position = position.map(a=>a.trim().toLowerCase())
      var contraindications =[];
      contraindications = this.state.contraindications.split(',')
      contraindications = contraindications.map(a=>a.trim().toLowerCase())

      const payload = {url,title,steps,benefits,position,contraindications}
     
      
      await api.createAsanas(payload)
                      .then(()=>{
                        this.setState({successMsg:"Yoga pose is successfully uploaded.."})
                      })
                      .catch(error=>{
                        this.setState({successMsg:"Error Occured...",error})
                      })
      
      setTimeout(()=>{
            this.setState({successMsg:'',status:''})
            },3000);

    }
    handleUpload = () => {
            console.log('handle upload')
            
            const uploadTask = storage.ref(`asanas/${this.state.file.name}`).put(this.state.file);
            uploadTask.on(
              "state_changed",
              snapshot => {
                  const progress = Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes)*100
                  )
                
                      this.setState({status:'progress is '+progress})
                
              },
              error => {
                console.log(error);
              },
              () => {
                storage
                  .ref("asanas")
                  .child(this.state.file.name)
                  .getDownloadURL()
                  .then(url => {
                    this.setState({url:url})
                    
                    this.handleSubmit()
                  })
                  .catch(e=>console.log('storage error ',e))
              }
            );
          
    }
    render(){
        return(
            <div className="admin" style={{alignContent:"center",position:'fixed',top:"15%",left:"30%"}}> 
               
                <h4>Upload Asanas</h4><br/> 
                <h3>{this.state.successMsg}</h3>
                <h4>{this.state.status}</h4>
                {/* <form onSubmit={(event)=>this.handleUpload(event)}> */}
                <form onSubmit={this.controlSubmit}>
                <label>Please enter title of the pose(asana):</label> <br/>
                <input type="text" 
                        name="title"
                        onChange={this.handleInput}
                        required
                        /><br/><br/> 
                <label>Please select a file to upload:</label>
              <input
                type="file"
                onChange={this.handlefile}
                required={true}/>  <br/><br/> 
                 <label>select asanas type</label>
                 <input type="text" 
                        name="position"
                        required
                        placeholder="enter position of the asanas"
                        onChange={this.handleInput}
                        /><br/><br/> 
                <label>Enter Contraindications</label> <br/>
                <input type="text" 
                        name="contraindications"
                        placeholder="separate them with comma(,)"
                        onChange={this.handleInput}
                        required
                        /><br/>
                 <label>Enter Benefits</label> <br/>
                <input type="text" 
                        name="benefits"
                        placeholder="separate them with comma(,)"
                        onChange={this.handleInput}
                        required
                        /><br/><br/>                     
                <label>Enter description (steps) about asana  :</label> <br/>
                <textarea
                    rows="4"
                    cols="50"
                    name="steps"
                    onChange={this.handleInput}
                    required={true}
                    /> <br/>
                <button 
                    type="submit"
                    
                > Upload </button>
                </form>
        
            </div>
        )
    }
}
export default Admin;