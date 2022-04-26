import React from 'react';
import { Link } from 'react-router-dom';
import api from './../../api/api';
class Search extends React.Component{
    constructor(props){
        super(props);
            this.state={ data:'', isSet:'', teacher_id:this.props.details.teacher._id, fixeddata:'',
                problem:'', position:'', msg:'', keys:'',final:[], } }
    updateChange =(e)=>{
            var data = this.state.data;  var keys = Object.keys(data);  let value = e.target.value
            var newData = [];
            var newData2 =[];
            var newData3 =[]; 
            if(value.length===0) { this.setState({data:this.state.fixeddata,msg:''}) }
            else {
            var temp =[];
            var problem=[];
            var position =[];
            temp = value.split(" ");
            for(let k=0;temp.length>k;k++){
                if(temp[k].toLowerCase()==="bp" ||temp[k].toLowerCase()==="backpain" || temp[k].toLowerCase()==="neckpain" || temp[k].toLowerCase()==="headache" || temp[k].toLowerCase()==="astma" || temp[k].toLowerCase()==="fitness" ){
                    problem.push(temp[k]);
                    for(let i=0; keys.length>i;i++){
                           
                            if(JSON.stringify(data[i].type.adv.toLowerCase())===JSON.stringify(problem[0].toLowerCase())){
                                newData.push(data[i]);
                            }
                        } 
                }
               
            }
            for(let k=0;temp.length>k;k++){
                if(temp[k].toLowerCase()==="standing" ||temp[k].toLowerCase()==="bending" || temp[k].toLowerCase()==="seated" ){
                    position.push(temp[k]);
                    
                   
                    for(let i=0; keys.length>i;i++){
                           
                            if(JSON.stringify(data[i].type.t.toLowerCase())===JSON.stringify(position[0].toLowerCase())){
                                newData2.push(data[i]);
                            } } } }
 
            if(problem.length > 0 && position.length > 0){
                
                if( newData.length ===0 || newData2.length ===0) {  this.setState({msg:"no data found.."}) } }
            if(problem.length>0 && problem.length>0){
                 for(let i=0;i<Object.keys(newData).length;i++){
                  for(let j=0;j<Object.keys(newData2).length;j++){
                        if(newData[i]._id===newData2[j]._id){
                            newData3.push(newData[i]);
                        }
                    }
                }
                this.setState({data:newData3});      }
            if(problem.length===0 && position.length>0) {   this.setState({data:newData2}); } 
            if(position.length===0 && problem.length>0) {     this.setState({data:newData}); } } }     
           
        searchForChange =(e)=>{
            e.preventDefault();
            var keys = (this.state.keys)[0];
            var data = this.state.data;
            var keywords = []
            keywords = e.target.value.split(' ')      
            var benefits =[];
            var position =[];
            var temp_data =[[],[],[],[],[]];
            var contraindications =[];
            //searching for benefits, positions and contraindications 
            for(let i=0; keywords.length>i;i++){
                let z = keywords[i].toLowerCase();
                for(let j=0;keys.benefits.length>j;j++){
                           let x = keys.benefits[j].toLowerCase();
                           if(x.match(z))
                                   benefits.push(x.toLowerCase())  
                }
                for(let j=0;keys.position.length>j;j++){
                    let x = keys.position[j].toLowerCase();
                    if(x.match(z))
                       position.push(x.toLowerCase()) 
                } 
                for(let j=0;keys.contraindications.length>j;j++){
                    let x = keys.contraindications[j].toLowerCase();
                                if(x.match(z))
                                   contraindications.push(x.toLowerCase())  
                }
                
                
            } //end of for loop
            //serching for name
            var data_keys = Object.keys(data);
            for (let i = 0; i < keywords.length; i++) {
                const element = keywords[i].toLowerCase();
                for (let j = 0; j < data_keys.length; j++) {
                    const data_item = data[j].title.toLowerCase();
                    if(data_item.match(element))
                        temp_data[0].push(data[j]) //pushing found elements into temp_data[0] 
                   
                }   }          
            for (let i = 0; i < benefits.length; i++) {
                const element = benefits[i].toLowerCase();
                for (let j = 0; j < data_keys.length; j++) {
                 if(data[j].benefits.includes(element))
                         temp_data[1].push(data[j])
                }
                
            }
            for (let i = 0; i < position.length; i++) {
                const element = position[i].toLowerCase();
                for (let j = 0; j < data_keys.length; j++) {
                   if(data[j].position.includes(element))
                         temp_data[2].push(data[j])                    
                }
            }
            for (let i = 0; i < contraindications.length; i++) {
                const element = contraindications[i].toLowerCase();
                 for (let j = 0; j < data_keys.length; j++) {
                   if(data[j].contraindications.includes(element))
                         temp_data[3].push(data[j])
                } 
            }
            var final_temp =[];
            if(benefits.length && position.length && contraindications.length){
                let temp = [];
                if(temp_data[0].length) temp.push(...temp_data[0]);
                temp.push(...temp_data[1]);
                temp.push(...temp_data[2]);
                temp.push(...temp_data[3]); 
                const duplicates = temp.filter((item, index) => index !== temp.indexOf(item));
                final_temp.push(duplicates);
            }
            else if(benefits.length===0 && position.length && contraindications.length){
                let temp = [];
                if(temp_data[0].length) temp.push(...temp_data[0]);
               // temp.push(...temp_data[1]);
                temp.push(...temp_data[2]);
                temp.push(...temp_data[3]); 
                const duplicates = temp.filter((item, index) => index !== temp.indexOf(item));
                final_temp.push(duplicates);

            }
            else if(benefits.length && position.length===0 && contraindications.length){
                let temp = [];
                if(temp_data[0].length) temp.push(...temp_data[0]);
                temp.push(...temp_data[1]);
                //temp.push(...temp_data[2]);
                temp.push(...temp_data[3]); 
                const duplicates = temp.filter((item, index) => index !== temp.indexOf(item));
                final_temp.push(duplicates);

            }
            else if(benefits.length && position.length && contraindications.length===0){
                let temp = [];
                if(temp_data[0].length) temp.push(...temp_data[0]);
                temp.push(...temp_data[1]);
                temp.push(...temp_data[2]);
                //temp.push(...temp_data[3]); 
                const duplicates = temp.filter((item, index) => index !== temp.indexOf(item));
                final_temp.push(duplicates);

            }
            else{
                let temp = [];
                if(temp_data[0].length) temp.push(...temp_data[0]);
                temp.push(...temp_data[1]);
                temp.push(...temp_data[2]);
                temp.push(...temp_data[3]);
                const unique = [...new Set(temp)]
                final_temp.push(unique);
            }
            console.log(position)
            if(e.target.value.length===0) {  this.setState({data:this.state.fixeddata}) }
            this.setState({final:final_temp})
        }
        update=()=>{
            var temp = this.state.final;
            var data = temp[0];
            // ReactDOM.findDOMNode(this.refs.search).focus();
            console.log(data)
            if(data.length===0) this.setState({data:0})
            else this.setState({data:data})
        }
        componentDidMount=()=>{
            api.getAsanas().then(res=>{
                this.setState({data:res.data.data,fixeddata:res.data.data})  })
                // console.log(res.data.data[6].benefits);
            api.getSearch().then((res)=>this.setState({keys:res.data.data}))
                            .catch(e=>console.log('error ',e))
    
            window.addEventListener('popstate', (event) => {
                this.setState({isSet:false})
              }); }
    render(){
        
        var data =this.state.data
        if(data===0){
            return (
                <div className="notfoundresult">
                    <br/><br/>
                    <div className="input-group">
                 <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search"
                         aria-describedby="search-addon" onChange={this.searchForChange} />
                <button type="button" class="btn btn-outline-primary" onClick={this.update}>search</button>
                     </div>
                     <br/><br/>
                     <h4>No result found</h4>
                </div>
            )
        }
       else {
        return ( 
            <div>
           <br/><br/>
           <div className="input-group">
                 <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search"
                         aria-describedby="search-addon" onChange={this.searchForChange} ref="search"/>
                <button type="button" class="btn btn-outline-primary" onClick={this.update}>search</button>
          
          </div>
          <br/><br/>
         <div style={{overflowY: 'scroll', height:'700px'}}>
               { data.length!==0 &&
                      Object.keys(data).map((item)=>{
                           return (
                               <Link to={`/teacher-dashboard/asanasdetails/${data[item]._id}/${this.state.student_id}`} style={{textDecoration:'none',color:'black'}}>
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
                                          <tr>  <br/> <br/> <br/> <br/>
                                             {/* <td className="align-bottom">{data[item].steps.slice(0,150)}....</td> */}
                                            </tr>
                                    </tbody>
                                </table>
                             </p>
                              </div>
                            </div>
                          </div>
                          </div>
                          </Link>
                           )

                      })
                  }
                  </div>
            </div>
            
         ); }
                
    }
}
export default Search;