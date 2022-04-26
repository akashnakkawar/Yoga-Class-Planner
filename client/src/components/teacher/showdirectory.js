import React from 'react';
import api from '../..//api/api';

class ShowDirectory extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:'',
            enableEdit:false,
            date:'',
            items:[],
        
        }
    }
    modify=(date)=>{
        this.setState({enableEdit:!this.state.enableEdit})
        this.setState({date:date})

    }
    handleselecteditems=()=>{
        var id = this.props.data.teacher._id;
        var data = this.state.data;
        data = data.map((item)=>{
           if(item.date===this.state.date)
                    {
                        var size = Object.keys(item.c).length;
                        var size2 = Object.keys(this.state.items).length
                        console.log(size);
                        console.log('size 2 is',size2);
                        if(size === size2){
                            console.log('above');
                            this.delete(this.state.date);
                            console.log('below');
                        }
                       
                        var l =[];
                        var k = this.state.items;
                        for (let i = 0; i < item.c.length; i++) {
                            if(!k.includes(item.c[i])){
                                l.push(item.c[i])
                            }
                            
                        }
                        // item.c.map(i=>{
                        //     if(!k.includes(i)){
                        //         l.push(i);
                        //     }
                            
                        // })
                        item.c=l;
                        return item;
                    }
           return item;
        })
        var payload = {data,id}
        api.deleteDirectory(payload)
            .catch(e=>console.log(e))
        this.setState({data:data, date:''})
    


    }
    handleItems=(item)=>{
        
        var dir = this.state.items;
        
        if(dir.includes(item)){
            
            dir = dir.filter(arrayItem => arrayItem !== item);
        }
        else{
        
            dir.push(item)
        }
        this.setState({items:dir})
        

    }
    delete=(date)=>{

        
        console.log('date',date);
        var data = this.state.data;
        console.log('data is ',data);
        var id = this.props.data.teacher._id;
        data = data.filter(i=> i.date!==date)
        console.log(data);
        var payload = {data,id}
        api.deleteDirectory(payload).then(res=>{
            console.log(res.status);
        })
            .catch(e=>console.log(e))
        this.setState({data:data})
        var i = this.state.items;
        this.setState({items:i});

        
    }
    componentDidMount=()=>{

        var id = this.props.data.teacher._id;
        var payload = {id}
        api.showdirectory(payload).then(res=>{
            
            this.setState({data:res.data.directory.directory})
            console.log(res.data.directory);
        })
        .catch(e=>{
            console.log(e);
        })

    }
    render(){
        var data=this.state.data;
        var count =1;
        if(!data){
            return(<h4>No data has been found</h4>)
        }
        return(
            <div className="showdirectory">
                <br/> <br/>
                <h3>Directory of classes are listed below:</h3>
                <br/> <br/>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Sequences</th>
                        <th scope="col">Actions</th>
                       
                        
                        </tr>
                    </thead>
                    <tbody>
                       
                        {

                            
                            Object.keys(data).map((item)=>{
                              
                               return(
                               <tr key={data[item]._id}>
                                    <td>
                                        {count++}
                                    </td>
                                    <td>
                                        {data[item].name}
                                    </td>
                                    <td>
                                        {data[item].date.slice(0,10)}<br/> {data[item].date.slice(11,16)}
                                    </td>
                                    <td>
                                        {
                                            
                                            Object.keys(data[item].c).map(i=>{
                                                return(
                                                    <p>
                                                        {data[item].c[i].title} &nbsp;
                                                        
                                                       {  this.state.date===data[item].date? <input type='checkbox' onChange={()=>this.handleItems(data[item].c[i])}/> :<p> </p> }
                                                    </p>
                                                )
                                            })
                                        }
                                    </td>
                                    <td>
                                   
                                    <button type="button" class="btn btn-danger" onClick={()=>this.delete(data[item].date)}>Delete</button> &nbsp;
                                  {Object.keys(data[item].c).length!==1?  <button type="button" class="btn btn-success" onClick={()=>this.modify(data[item].date)}>Modify</button> : <p></p>} <br/> <br/>
                                  {  this.state.date===data[item].date?<button type="button" class="btn btn-danger" onClick={()=>this.handleselecteditems()}>Delete seleted items</button> :<p> </p> }
                                   

                                    </td>
                                </tr>
                               )

                            })
                        }
                    
                    
                    </tbody>
                    </table>
                
                
            </div>
        )
    }
}
export default ShowDirectory;