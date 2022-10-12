import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import withRouter from './../components/withRouter';
import swal from 'sweetalert';
export class EditStudent extends Component {
    state={
        name:'',
        course:'',
        email:'',
        phone:'',
        error_list:[]
    }


    handleInput=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    async componentDidMount(){
        const studentId=this.props.id;
        const res=await axios.get(`http://127.0.0.1:8000/api/edit-student/${studentId}`);
        if(res.data.status===200){
             this.setState({
                name:res.data.student.name,
                course:res.data.student.course,
                email:res.data.student.email,
                phone:res.data.student.phone,
             });
        }else if(res.data.status===404){
            swal({
                title: "Warning !",
                text: res.data.message,
                icon: "warning",
                button: "OK",
            });
            this.props.history('/');
        }
    }

    updateStudent=async(e)=>{
        e.preventDefault();
        
        let updateButton=document.getElementById('updateButton');
        updateButton.innerText='Updating';
        updateButton.disabled=true;

        const studentId=this.props.id;
        const res=await axios.put(`http://127.0.0.1:8000/api/update-student/${studentId}`,this.state);
        if(res.data.status===200){
            swal({
                title: "Success!",
                text: res.data.message,
                icon: "success",
                button: "OK",
              });
            updateButton.innerText='Update Student';
            updateButton.disabled=false;
            this.props.history('/');
        }else{
            this.setState({
                error_list:res.data.validate_err
            });
            updateButton.innerText='Update Student';
            updateButton.disabled=false;
        }
    }

  render() {
    return (
      
      <div className='container'>
        
        <div className='row'>
            <div className='col-md-6'>
                <div className='card'>
                    <div className='card-header'>
                        <h4>Edit Student <Link to={'/'} className="btn btn-primary btn-small float-end">Home Page</Link></h4>
                        
                    </div>
                    <div className='card-body'>
                        <form onSubmit={this.updateStudent}>
                        <div className="form-group mb-3">
                                <label>Student Name</label>
                                <input type='text' name='name' onChange={this.handleInput} className="form-control" value={this.state.name}/>
                                <small className="text-danger">{this.state.error_list.name}</small>
                            </div>
                            <div className="form-group mb-3">
                                <label>Student Course</label>
                                <input type='text' name='course' onChange={this.handleInput} className="form-control" value={this.state.course}/>
                                <small className="text-danger">{this.state.error_list.course}</small>
                            </div>
                            <div className="form-group mb-3">
                                <label>Student Email</label>
                                <input type='text' name='email' onChange={this.handleInput} className="form-control" value={this.state.email}/>
                                <small className="text-danger">{this.state.error_list.email}</small>
                            </div>
                            <div className="form-group mb-3">
                                <label>Student Phone</label>
                                <input type='text' name='phone' onChange={this.handleInput} className="form-control" value={this.state.phone}/>
                                <small className="text-danger">{this.state.error_list.phone}</small>
                            </div>
                            <div className="form-group mb-3">
                                <button type="submit" className='btn btn-primary' id='updateButton'>Update Student</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default withRouter(EditStudent)