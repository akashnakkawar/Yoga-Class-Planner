import React from 'react';
import api from '../../api/api'


class Class extends React.Component{
    constructor(props){
        super(props);
        this.state={
            by:this.props.details.teacher._id,
            date:'',
            startTime:'',
            endTime:'',
            capacity:'',
            value:'',
            class:'',
        }
    }
    handlechange = (e) =>{
        const {name,value} =e.target
        this.setState({[name]:value})
        
    
    }

    updateClass = async ()=>{
        console.log('inside update')
        console.log(this.state.by,' ',this.state.class)
        const teacher = this.state.by
        const c = this.state.class
        const payload ={teacher,c}
        await api.teacherbookclass(payload)
                    .then(res=>{
                        console.log(res)
                    })
    }

    createClass= async e=>{
        e.preventDefault();
        const {by,date,startTime,endTime,capacity}= this.state
        const capacityLeft = this.state.capacity;
        const payload = {by,date,startTime,endTime,capacity,capacityLeft}
        await api.createClass(payload)
                .then(res=>{
                    this.setState({class:res.data.c})
                    
            this.setState({value:'class has been created...'})
            this.updateClass()
        })
        
        setTimeout(()=>{
            this.setState({value:''});
        },3000);
    
    }
    render(){
        return(
            <div className="class">
                <br/><br/>
                <h3>create class by using following form</h3>
                <br/><br/>
                <form>
                    <label>Date:</label> <br/>
                    <input
                        type='date'
                        name='date'
                        onChange={this.handlechange}
                        required
                    /> <br/><br/>
                    <label>Starting Time:</label> <br/>
                    <input
                        type='time'
                        name='startTime'
                        onChange={this.handlechange}
                        required
                    /> <br/><br/>
                    <label>Ending Time:</label> <br/>
                    <input
                        type='time'
                        name='endTime'
                        onChange={this.handlechange}
                        required
                    /> <br/><br/>
                    <label>Capacity of students:</label> <br/>
                    <input
                        type='number'
                        name='capacity'
                        onChange={this.handlechange}
                        required
                    /> <br/><br/>
                    <button
                        onClick={this.createClass}
                    >create class</button>
                </form>
                <br/><br/>
               <p style={{color:"green"}}>{this.state.value}</p> 
            </div>
        )
    }
}

export default Class;