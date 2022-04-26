import React from "react";
import apis from "../../api/api";
class CreateClass extends React.Component {
    constructor(props){
        super(props);
        this.state={
            id:this.props.data.teacher._id,
            classes:[],
            students:[],
            changebutton:true,
            details:false,
            showtable:false,
            data:'',
            count:0,
            list:[],
            a_id:'',
            msg:'',
            
        }
    }
    create=(async)=>{
        var a_id = this.state.a_id;
        var data = this.state.list;
        const payload = {a_id,data}
        apis.updateAsanas(payload).then(res=>{
            if(res.status===201)
            {
                this.setState({msg:'class has been updated with asanas'})
                setTimeout(()=>{
                    this.setState({msg:''})
                },3000)
            }
            else{
                this.setState({msg:'error happend'})
                setTimeout(()=>{
                    this.setState({msg:''})
                },3000)
            }
        })
                                 .catch(e=>console.log(e))
    }
    changeCount=(item)=>{
        let dir = this.state.list;
        let c = this.state.count;
        if(dir.includes(item)){
            c--;
            dir = dir.filter(arrayItem => arrayItem !== item);
        }
        else{
            c++;
            dir.push(item)
        }
        this.setState({list:dir});
        this.setState({count:c});
    }
    componentDidMount=()=>{
        var id = this.state.id;
        apis.showdirectory({id}).then(res=>{this.setState({classes:res.data.directory.bookedclasses})})
                                .catch(e=>console.log(e))
        apis.getAsanas().then(res=>{
                
                                    this.setState({data:res.data.data,fixeddata:res.data.data})
                                    // console.log(res.data.data[6].benefits);
                    
                                })
        
    }
    getdetails=()=>{
        this.setState({showtable:!this.state.showtable})
    }
    hidedetails=()=>{
        this.setState({showtable:!this.state.showtable})
    }
    onselect=(e)=>{
        
        var id = e.target.value;
       this.setState({a_id:id,data:this.state.fixeddata});
      
        apis.findclassbyid({id}).then(res=>{
            this.setState({students:res.data.result.students,details:true})
            
             this.automate()
            // this.setState({msg:msg})
            // setTimeout(()=>{
            //     this.setState({msg:''})
            // })
            
            
          
        })
        .catch(e=>console.log(e));
        
    }
    automate=()=>{
        var data = this.state.students;
        var positions,problems =[];
       
        if(data.length===0){
            this.setState({data:''})
           
        }
        else{
           
        problems = data.map(a=>a.preferences.problems).flat();
        positions = data.map(a=>a.preferences.positions).flat();
        console.log('prob',problems)
        const counts = {};

        for (const num of problems) {
        counts[num] = counts[num] ? counts[num] + 1 : 1;
        }
        const counts2 = {};

        for (const num of positions) {
        counts2[num] = counts2[num] ? counts2[num] + 1 : 1;
        }
       
       
      
      
        
        var asanas = this.state.fixeddata;
        var keys = Object.keys(asanas)
        var student = this.state.students;
        
        
        var final_temp_pos =[];
        var final_temp_con =[];
        var final_temp_rem =[];
        
        for (let i = 0; i < keys.length; i++) {
            const e = asanas[i];
            var a;
            let temp_con_students=[];
            for (let k = 0; k < student.length; k++) {
                const s = student[k];
                if(s.preferences.problems.some(item => e.contraindications.includes(item)))
                        temp_con_students.push(s.name)

                
            }
            let temp_pre_students=[];
            for (let l = 0; l < student.length; l++) {
                const s = student[l];
                if(s.preferences.positions.some(item => e.position.includes(item)))
                    temp_pre_students.push(s.name)
                
            }
            temp_con_students=temp_con_students.filter(x=>x!==undefined)
            temp_pre_students=temp_pre_students.filter(x=>x!==undefined)
            a = Object.assign(e,{'position':temp_pre_students,'students':temp_con_students})
            if(temp_pre_students.length){
                if(temp_con_students.length===0){
                   
                    final_temp_pos.push(a);
                }
                else{
                    final_temp_con.push(a);
                }
            }
            else{
                if(temp_con_students.length) {
                   final_temp_con.push(a);
                }
                else{
                    final_temp_rem.push(a);
                }
            }
           
            
        }
        var final_result = final_temp_pos.concat(final_temp_rem)
        final_result = final_result.concat(final_temp_con)
        this.setState({data:final_result })
    }
        
    }
    render() { 
        var c = this.state.classes;
        var student = this.state.students;
        var data = this.state.data;
        if(c.length===0){
            return <h1>you haven't created any classes </h1>
        }
        else{
        return (    <div className="createclass">
            <br/><br/>
            <h4>please select a class</h4>
            <br/>
            <select className="form-select" aria-label="Default select example" onChange={this.onselect}>
            <option selected>Open this select menu</option>
                {c.map(a=>{
                    return(
                    
                        <option value={a._id}> Date: {a.date} and Time: {a.startTime} </option>
                      
                       
                    )
                })}
                
            </select>
            
            { this.state.details && 
            <div>
            <br/>
            {this.state.showtable===false?
            <button type="button" className="btn btn-primary" onClick={this.getdetails}>show details</button> :
            <button type="button" className="btn btn-primary" onClick={this.hidedetails}>hide details</button>
        }
            { this.state.showtable &&
            <table class="table">
                <thead>
                  <tr>
                    
                    <th scope="col">Name</th>
                    <th scope="col">Preferences</th>
                    <th scope="col">Contradication</th>
                    </tr>
                </thead>
                <tbody>
            {student && student.map(s=>{
                return <tr>
                    <td>{s.name}</td>
                    <td>{s.preferences.positions.map(q=><p>{q}</p>)}</td>
                    <td>{s.preferences.problems.map(q=><p>{q}</p>)}</td>
                     </tr>
            })}
            </tbody>
            </table>
           
        }
<br/>
<h1>{this.state.msg}</h1>
<h4>below are the automatic suggestions: </h4>
<p>{this.state.count} are selected</p>
<div style={{overflowY: 'scroll', height:'300px'}}>
                  {data.length===0 && <h1>No student has been selected this class</h1>}
                  { data.length!==0 &&
                      Object.keys(data).map((item)=>{
                           return (
                             
                            <div classNameName="shadow-sm p-3 mb-5 bg-white rounded" style={{border:'1px solid',padding:'10px',marginTop:'30px', boxShadow:'5px 10px #888888',textDecoration:'none'}}>
                            <div className="container">
                            <div className="row">
                              <div className="col-sm">
                              <img src={data[item].url} className="rounded float-start" alt="..." style={{display: "block",maxWidth: "100%",padding:'10px', height: "auto"}}/>
                              </div>
                              <div className="col-sm">
                              <span className="align-middle">
                              <table style={{height: '100px'}}>
                                    <tbody>
                                            <tr>
                                            <td class="align-bottom"> <p className="h4">{data[item].title}</p></td>
                                            </tr>
                                    </tbody>
                                </table>
                             
                              </span>
                              </div>
                              
                              <div className="col-sm">
                                <p className="lead">
                                <table style={{height: '100px'}}>
                                    <tbody>
                                    <tr>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" style={{width:'20px',height:'30px'}} onChange={()=>this.changeCount(data[item])}/>
                                                </div>
                                            </tr>
                                             <tr>

                                                <br/><br/>
                                              
                                                <br/><br/>

                                            {/* <td className="align-bottom">{data[item].steps.slice(0,150)}....</td> */}
                                             {data[item].students.length!==0 && <p>contraindications to <b> {data[item].students.toString()} </b> </p> }
                                            
                                            
                                            </tr>
                                    </tbody>
                                </table>
                              
                                </p>
                              </div>
                            </div>
                          </div>
                          </div>
                        
                           )

                      })
                  }
                  </div>

                  {
          <div> 
              
            <button type="submit" class="btn btn-primary" onClick={this.create} disabled={this.state.count===0?true:false}>create</button>
            <br/> <br/> <br/> <br/>
            </div>}
            </div>
            
            }
       
        </div>  );
        }
    }
}
 
export default CreateClass;