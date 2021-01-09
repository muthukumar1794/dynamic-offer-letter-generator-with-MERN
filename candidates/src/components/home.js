import React, { Component } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom';
import Modal from "react-modal";


class home extends Component {

constructor(props) {
    super(props)

    this.state = {
         candidatesList:[],
         show:false,
         name:'',
         number:"",
         city:'',
         state:'',
         email:'',
         zip:'',
         selected:false,
         selected:false,

    }
}

async componentDidMount(){
    try{
         const response = await Axios.get('http://localhost:9080/users')
        console.log("reeeeeeeeeee",response.data.response)
        this.setState({
            candidatesList:response.data.response
        })
    }
    catch(err){
        throw err
    }
}
addCandidate=()=>{
    this.setState({
        show:true
    })
}
handleClose = ()=>{
    this.setState({
        show:false
    }) 
} 

submitForm = (e) => {
    e.preventDefault();
    if(!this.state.name || !this.state.number || !this.state.city || !this.state.state || !this.state.email || !this.state.zip || !this.state.selected){
this.setState({
    visible:true
})

    }
    let req_url;
  req_url = 'http://localhost:9080/addusers'

    Axios.post(req_url, this.state)
      .then((response) => {
        if (response.data.message == "success") {
          this.setState({
            user_id: null,
            name: "",
            number: "",
            city:"",
            state:'',
            zip:'',
            email:'',
            show: false,
            selected:false,
            visible:false
          });
          Axios.get(`http://localhost:9080/users`)
            .then((response) => {
              this.setState({
                candidatesList:response.data.response
              });
            })
            .catch((err) => {
              console.log("error", err);
            });
        }
      })
      .catch((err) => {
        console.log("error", err);
        this.setState({
          errorHolder: err.response.data.data,
        });
      });
  };
  onchange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSelected = (e)=>{
    this.setState({
        selected: e.target.checked,
      });
  }
    render() {
        if(this.state.visible){
            setTimeout(
                () => this.setState({ visible: false }), 
                2000
              );
        }
        console.log("state::::::",this.state.selected)
        const {candidatesList,name,city,state,zip,number,email,selected} = this.state
        return (
            <div>
                  <Modal
            isOpen={this.state.show}
            ariaHideApp={false}
            style={{
              overlay: {
                backgroundColor: "grey",
              },
              content: {
                left: "25%",
                right: "25%",
              },
            }}
          >
            <button type="button" className="close" onClick={this.handleClose}>
              &times;
            </button>
            <form
              method="post"
              noValidate
              className="form-horizontal"
              onSubmit={this.submitForm}
              encType="multipart/form-data"
            >
              
              <div className="form-group">
                <div className="form-group">
                  <label
                    htmlFor="Name"
                    className="col-sm-4 control-label text-center required"
                  >
                    <b>Name</b>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Username"
                    name="name"
                    value={name}
                    required
                    className="col-sm-4"
                    onChange={this.onchange}
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="Email"
                    className="col-sm-4 control-label text-center required"
                  >
                    <b>Email</b>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    name="email"
                    value={email}
                    required
                    className="col-sm-4"
                    onChange={this.onchange}
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="Number"
                    className="col-sm-4 control-label text-center required"
                  >
                    <b>Number</b>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Number"
                    name="number"
                    value={number}
                    required
                    className="col-sm-4"
                    onChange={this.onchange}
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="City"
                    className="col-sm-4 control-label text-center required"
                  >
                    <b>City</b>
                  </label>
                  <input
                    type="city"
                    placeholder="Enter City"
                    name="city"
                    value={city}
                    required
                    className="col-sm-4"
                    onChange={this.onchange}
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="State"
                    className="col-sm-4 control-label text-center required"
                  >
                    <b>State</b>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter State"
                    name="state"
                    value={state}
                    required
                    className="col-sm-4"
                    onChange={this.onchange}
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="Zip"
                    className="col-sm-4 control-label text-center required"
                  >
                    <b>Zip</b>
                  </label>
                  <input
                    type="zip"
                    placeholder="Enter zip"
                    name="zip"
                    value={zip}
                    required
                    className="col-sm-4"
                    onChange={this.onchange}
                  />
                </div>
                
                <div className="form-group">
                    <label  className="col-sm-4 control-label text-center required" for="selected">Selected</label>
          
<select class="col-sm-4" name="selected" onChange={this.onchange}>
<option value="false">Not Selected</option> 
<option value="true">Selected</option>    

</select>
      </div>
      <p className="text-center text-danger" style={this.state.visible ? {display:'block'} : {display:'none'}}>mandatory fields are requied</p>
                
                <div className={`form-group`} style={{textAlign:'center'}}>
                  <button className="btn btn-success" type="submit">
                   Add
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={this.handleClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            </form>
          </Modal>
                <div class="container">
  <h2>Candidates List</h2>
  <button onClick={this.addCandidate}>Add New Candidate</button>            
  <table class="table table-striped"  style={{border:'1px solid'}}>
    <thead>
      <tr>
      <th>S.No</th>
        <th>Name</th>
        <th>Email</th>
        <th>Mobile No</th>
        <th>City</th>
        <th>State</th>
        <th>Status</th>
        </tr>
    </thead>
    <tbody >
    {candidatesList.map((can,index)=>
      <tr>
      <td>{index+1}</td>
        <td>{can.name}</td>
        <td>{can.email}</td>
        <td>{can.mobNo}</td>
        <td>{can.city}</td>
        <td>{can.state}</td>
        <td>{can.selected ?<a href={`http://localhost:9080/candidates/appointment/${can._id}`} >Generate Offer</a> : "failed"}</td>
      </tr>)}
    </tbody>
  </table>
</div>
            </div>
        )
    }
}

export default home
