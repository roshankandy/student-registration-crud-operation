import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert';
export class Student extends Component {
    state={
        students:[],
        loading:true
    }

    async componentDidMount(){
        const res=await axios.get('http://127.0.0.1:8000/api/students');
        console.log(res);
        if(res.data.status===200){
            this.setState({
                students:res.data.students,
                loading:false
            });
        }
    }

    confirmDelete=(e,id)=>{
        const currentTarget=e.currentTarget;
        currentTarget.innerText="Deleting...";
        swal({
            title: "Delete ?",
            text: "Are you sure you want to delete this file",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                console.log(e);
                this.deleteStudent(currentTarget,id);
            }else{
                currentTarget.innerText="Delete";
            } 
        });
    }
    deleteStudent=async (currentTarget,id)=>{
        // const currentTarget=e.currentTarget;
        // currentTarget.innerText="Deleting...";
        const res=await axios.delete(`http://127.0.0.1:8000/api/delete-student/${id}`);
        if(res.data.status===200){
            currentTarget.closest("tr").remove();
            swal({
                title: "Success!",
                text: res.data.message,
                icon: "success",
                button: "OK",
              });
        }else if(res.data.status===404){
            swal({
                title: "Warning !",
                text: res.data.message,
                icon: "warning",
                button: "OK",
            });
        }
    }

    render() {
        var STUDENT_HTML_TABLE="";
        if(this.state.loading){
            STUDENT_HTML_TABLE=<tr><td colSpan="6"><h3>Loading..</h3></td></tr>
        }else{
            STUDENT_HTML_TABLE=this.state.students.map((item=>{
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.course}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>
                            <Link to={`edit-student/${item.id}`} className="btn btn-sm  btn-warning">Edit</Link>
                            &nbsp;
                            <button type="button" onClick={(e)=>this.confirmDelete(e,item.id)} className="btn btn-sm btn-danger">Delete</button>
                        </td>
                    </tr>
                ) 
            }))
        }
        return (
            <div className='container'>
            
            <div className='row'>
                <div className='col-md-12'>
                    <div className='card'>
                        <div className='card-header'>
                            <h4>Student Data <Link to={'add-student'} className="btn btn-primary btn-small float-end">Add Student</Link></h4>
                            
                        </div>
                        <div className='card-body'>
                            <table className='table table-bordered table-striped'>
                                <thead>
                                    <tr>
                                        <td>ID</td>
                                        <td>Name</td>
                                        <td>Course</td>
                                        <td>Email</td>
                                        <td>Phone</td>
                                        <td>Action</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {STUDENT_HTML_TABLE}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default Student