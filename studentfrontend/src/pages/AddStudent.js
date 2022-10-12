import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert';
export class AddStudent extends Component {
    state={
        name:'',
        course:'',
        email:'',
        phone:'',
        errorList:[],
        errorStatus:false
    }


    handleInput=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    saveStudent=async(e)=>{
        e.preventDefault();
        const res=await axios.post('http://127.0.0.1:8000/api/add-student',this.state);
        if(res.data.status===200){
            swal({
                title: "Success!",
                text: res.data.message,
                icon: "success",
                button: "OK",
              });
            this.setState({
                name:'',
                course:'',
                email:'',
                phone:'',
                errorList:[],
                errorStatus:false
            })
        }else{
            this.setState({
                errorList:res.data.validate_err,
                errorStatus:true
            });
        }
    }

  render() {
    const errorClass=this.state.errorStatus?'text-danger d-block':'text-danger d-none';
    return (
      <div className='container'>
        
        <div className='row'>
            <div className='col-md-6'>
                <div className='card'>
                    <div className='card-header'>
                        <h4>Add Student <Link to={'/'} className="btn btn-primary btn-small float-end">Home Page</Link></h4>
                        
                    </div>
                    <div className='card-body'>
                        <form onSubmit={this.saveStudent}>
                            <div className="form-group mb-3">
                                <label>Student Name</label>
                                <input type='text' name='name' onChange={this.handleInput} className="form-control" value={this.state.name}/>
                                <small className={errorClass}>{this.state.errorList.name}</small>
                            </div>
                            <div className="form-group mb-3">
                                <label>Student Course</label>
                                <input type='text' name='course' onChange={this.handleInput} className="form-control" value={this.state.course}/>
                                <small className={errorClass}>{this.state.errorList.course}</small>
                            </div>
                            <div className="form-group mb-3">
                                <label>Student Email</label>
                                <input type='text' name='email' onChange={this.handleInput} className="form-control" value={this.state.email}/>
                                <small className={errorClass}>{this.state.errorList.email}</small>
                            </div>
                            <div className="form-group mb-3">
                                <label>Student Phone</label>
                                <input type='text' name='phone' onChange={this.handleInput} className="form-control" value={this.state.phone}/>
                                <small className={errorClass}>{this.state.errorList.phone}</small>
                            </div>
                            <div className="form-group mb-3">
                                <button type="submit" className='btn btn-primary'>Save Student</button>
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

export default AddStudent