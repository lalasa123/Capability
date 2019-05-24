import React, { Component } from "react";
import axios from 'axios';
import Menu from '../menu/menu';
import './questionType.css';
import {Redirect} from 'react-router-dom';

class QuestionType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded:false,
      addType: false,
      error:false,
      typeData: [],
      editElement: -1,
      name: '',
      acronym: '',
      status: 0,
      RecordsData: {
        name: '',
        acronym: '',
        status: ''
      }

    };
  }

  handleChoice = () => {
    if (this.state.addType === false) {
      this.setState({
        addType: true
      });
    }
  };
  handleCancelData=()=>{
    if (this.state.addType === true) {
      this.setState({
        addType: false
      });
    }
  }
  handleClick(){
    this.setState({
      error:false
    })
   
  }
  handleEdit(data, id) {
    console.log(id +1)
    this.setState({
      name: data.name,
      acronym: data.acronym,
      status:data.status === 0 ? 0 : 1,
      editElement: id
    });
  }

  handleSave(index) {
    const userTypeEdit={
      name:this.state.name,
      acronym:this.state.acronym,
      status:this.state.status === 0 ? 0 : 1,
      //idValue:this.state.editElement,
      }
   
      axios.put(`http://127.0.0.1:8000/questions/typeid/${index+1}/`,userTypeEdit,
      )
      .then(res => {
     //axiosconsole.log(res);
     //console.log(res.data);
     const userQuestionTypeEdit=res.data;
     console.log(userTypeEdit);
     console.log(userQuestionTypeEdit);
     console.log(userQuestionTypeEdit.id);
   })
    const dummyRecord = this.state.RecordsData;
    dummyRecord.name = this.state.name;
    dummyRecord.acronym = this.state.acronym;
    dummyRecord.status=this.state.status === 0 ? 0 : 1;
    if(dummyRecord.name === "" ||  dummyRecord.acronym === ""  ){
      // this.setState({
      //   error:true
      // })
    }
    else{
    const dummytypeData = this.state.typeData;
    dummytypeData[index] = dummyRecord;
    this.setState({
      RecordsData: dummyRecord,
      editElement: -1,
      typeData: dummytypeData,
      name:'',
      acronym:'',
      status:'',
      RecordsData: {
        name: '',
        acronym: '',
        status: ''
      }
    });
  }
  }
  handleName(e) {
    this.setState({
      name: e.target.value
    });
  };
  handleAcronym(e) {
    this.setState({
      acronym: e.target.value
    })
  }
  handleSaveStatus(){
    this.setState({
      status:this.state.status === 0 ? 1 : 0,
     
      })
    console.log(this.state.status);
  }
  handleSaveData() {

    const dummyRecordsData = this.state.RecordsData;
    dummyRecordsData.name = this.state.name;
    dummyRecordsData.acronym = this.state.acronym;
    dummyRecordsData.status=this.state.status === 0 ? 0 : 1;
    console.log(dummyRecordsData.status);
    if(dummyRecordsData.name === "" ||  dummyRecordsData.acronym === ""  ){
      this.setState({
        error:true
      })
    }
    else{
      const userQType={
        name:this.state.name,
        acronym:this.state.acronym,
        status:this.state.status === 0 ? 0 :1,
      }
      axios.post(`http://127.0.0.1:8000/questions/type/`,userQType)
      .then(res => {
     //axiosconsole.log(res);
     //console.log(res.data);
     const userQuestionType=res.data;
     console.log(userQType);
     console.log(userQuestionType);
   })
    const dummytypeData = this.state.typeData;
    dummytypeData[this.state.typeData.length + 1] = dummyRecordsData;
    this.setState({
      RecordsData: dummyRecordsData,
      editElement: -1,
      typeData: dummytypeData,
      addType: false,
      name: '',
      acronym: '',
      // status: '',
      RecordsData: {
        name: '',
        acronym: '',
        // status: '',
      }
    })
    console.log(this.state.status);
  }
}
  handleStatus(data, status, index) {
    const dummyRecord = this.state.RecordsData;
    dummyRecord.name = data.name;
    dummyRecord.acronym = data.acronym;
    dummyRecord.status = status === 0 ? 1 : 0;
    const dummytypeData = this.state.typeData;
    dummytypeData[index] = dummyRecord;
    this.setState({
      RecordsData: dummyRecord,
      typeData: dummytypeData,
      status:status === 0 ? 1 : 0
    })
  }
  componentWillMount() {
    if (localStorage.getItem('isLoggedIn') != null) {
    axios.get("http://127.0.0.1:8000/questions/type/")
      .then(res => {
        const typeData = res.data;
        this.setState({
          typeData : typeData,
          isLoaded:true
        })
      })
    }
  }
  render() {
    if (localStorage.getItem('isLoggedIn') === null) {
      return <Redirect to='/login' />
    }
    else{
    const typeData = this.state.typeData.map((item, index) => {

      return (

        <tr key={index} style={{ visibility: this.state.typeData.status === false ? 'hidden' : 'visible' }}>
          <td>
            {this.state.editElement === index ? <input type="text" className="form-control" onChange={(e) => { this.handleName(e) }} defaultValue={item.name} /> : item.name}</td>

          <td>
            {this.state.editElement === index ?
              <input type="text" className="form-control" onChange={e => { this.handleAcronym(e) }} defaultValue={item.acronym} /> : item.acronym}
          </td>
          <td><label className="switch" id="status">
            <input type="checkbox" checked={item.status=== 0 ?false : true} disabled = {this.state.editElement === index?false:true} onChange={() => this.handleStatus(item, item.status, index)} /><span className="slider round">
            </span>
          </label></td>
          <td>
            <div>
              {this.state.editElement === index ? <svg onClick={() => { this.handleSave(index) }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 18 18"><path d="M6.61 11.89L3.5 8.78 2.44 9.84 6.61 14l8.95-8.95L14.5 4z" /></svg> :
                <svg onClick={(e) => { this.handleEdit(item, index) }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /></svg>
              }
            </div>
          </td>
        </tr>

      );
    });
    return (
      <div>
        <Menu />
        <div className="side-content">
        <div>
          <br />
          <button
            type="button"
            id="add-row"
            value="add question choice"
            className="btn btn-primary"
            onClick={this.handleChoice}
          >
            Add Question Type
          </button>
        </div>
        <div className="alert" style={{display: this.state.error === true ? 'block':'none'}}>
                    <span className="closebtn" onClick={()=>{this.handleClick()}}>&times;</span>
                    <strong>Please Enter Details....</strong>
                  </div>
        <div className="image-container" style={{ display: this.state.isLoaded === false ? 'block' : 'none' }}>
          <p className="image-holder">
            <img  src={require('.././12345.gif')} alt="" />
          </p>
        </div>
        
        <br />
     <div className="card">
        <div className="card-body">
        <table className="table" style={{display: this.state.isLoaded === true ? 'inline-table' : 'none'}}>
          <thead className="thead-bg">
            <tr>
            <th>Name</th>
            <th>Acronym</th>
            <th>Status</th>
            <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ display: this.state.addType === true ? "contents" : "none" }}>
              <td>
                <input type="text" id="name" className="form-control" value={this.state.name} onChange={(e) => { this.handleName(e) }} />
              </td>
              <td>
                <input type="text" id="acronym" className="form-control" value={this.state.acronym} onChange={(e) => { this.handleAcronym(e) }} />
              </td>
              <td><label className="switch" id="status"><input type="checkbox" value={this.state.status} onChange={() =>this.handleSaveStatus()}/><span className="slider round"></span></label></td>
              <td>
                <button type="button" id="qtopicbutton" className="btn btn-primary" value="save" onClick={(e) => this.handleSaveData(e)} >Save </button>
                <button type="button" id="qtopicbutton" className="btn btn-warning"  value="Cancel"  onClick={(e) => this.handleCancelData(e)}> Cancel </button>
                </td>
            </tr>
            {typeData}
          </tbody>
        </table>
        </div>
        </div>
        </div>
      </div>
    );
  }
}
}      

export default QuestionType;
                 
                 
                  
                
               
              


