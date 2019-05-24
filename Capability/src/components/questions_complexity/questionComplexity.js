import React, { Component } from "react";
import axios from 'axios';
import Menu from '../menu/menu';
import './questionComplexity.css';
import {Redirect} from 'react-router-dom';

class QuestionComplexity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded:false,
      error:false,
      addComplex: false,
      complexData: [],
      editElement: -1,
      name: '',
      acronym: '',
      status:0,
      RecordsData: {
        name: '',
        acronym: '',
        status: ''
      }

    };
  }

  handleChoice = () => {
    if (this.state.addComplex === false) {
      this.setState({
        addComplex: true
      });
    }
  };
  handleCancelData=()=>{
    if (this.state.addComplex === true) {
      this.setState({
        addComplex: false
      });
    }
  }
  handleEdit(data, id) {
    this.setState({
      name: data.name,
      acronym: data.acronym,
      status:data.status=== 0 ? 0 :1,
      editElement: id,
 });
    console.log(this.state.editElement+2);
  }

  handleSave(index) {
      const userComplexityEdit={
      name:this.state.name,
      acronym:this.state.acronym,
      status:this.state.status === 0 ? 0 : 1,
      //idValue:this.state.editElement,
      }
   
      axios.put(`http://127.0.0.1:8000/questions/complexityid/${index+1}/`,userComplexityEdit,
      )
      .then(res => {
     //axiosconsole.log(res);
     //console.log(res.data);
     const userQuestioComplexityEdit=res.data;
     console.log(userComplexityEdit);
     console.log(userQuestioComplexityEdit);
     console.log(userQuestioComplexityEdit.id);
   })
    const dummyRecord = this.state.RecordsData;
    dummyRecord.name = this.state.name;
    dummyRecord.acronym = this.state.acronym;
    dummyRecord.status = this.state.status === 0 ? 0 : 1;
    if(dummyRecord.name === "" ||  dummyRecord.acronym === "" || dummyRecord.status === ""  ){
      
      // this.setState({
      //   error:true
      // })
    }
    else{
    const dummycomplexData = this.state.complexData;
    dummycomplexData[index] = dummyRecord;
    this.setState({
      RecordsData: dummyRecord,
      editElement: -1,
      complexData: dummycomplexData,
        name: '',
        acronym: '',
        status:'',
      RecordsData: {
        name: '',
        acronym: '',
        status:''
      }
    });
    console.log(this.state.status);
    
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
  handleClick(){
    this.setState({
      error:false
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
      const userQComplexity={
        name:this.state.name,
        acronym:this.state.acronym,
        status:this.state.status === 0 ? 0: 1,
      }
      axios.post(`http://127.0.0.1:8000/questions/complexity/`,userQComplexity)
      .then(res => {
     //axiosconsole.log(res);
     //console.log(res.data);
     const userQuestionComplexity=res.data;
     console.log(userQComplexity);
     console.log(userQuestionComplexity);
   })
       
    const dummycomplexData = this.state.complexData;
    dummycomplexData[this.state.complexData.length + 1] = dummyRecordsData;
    this.setState({
      RecordsData: dummyRecordsData,
      editElement: -1,
      complexData: dummycomplexData,
      addComplex: false,
      name: '',
      acronym: '',
      // status:'',
      RecordsData: {
        name: '',
        acronym: '',
        // status: ''
      }
    })
  }
}
  handleStatus(data, status, index) {
   const dummyRecord = this.state.RecordsData;
    dummyRecord.name = data.name;
    dummyRecord.acronym = data.acronym;
    dummyRecord.status = status === 0 ? 1 : 0;
    const dummycomplexData = this.state.complexData;
   dummycomplexData[index] = dummyRecord;
       this.setState({
     complexData: dummycomplexData,
      status: status === 0 ? 1 : 0,
      RecordsData: {
        name: '',
        acronym: '',
        status: ''
      }
    });
    // alert(JSON.stringify(this.state.complexData));
  }

  componentWillMount() {
    if (localStorage.getItem('isLoggedIn') != null) {
    axios.get("http://127.0.0.1:8000/questions/complexity/")
      .then(resData => {
        const complexData = resData.data;
        this.setState({
          complexData: complexData,
          isLoaded:true
        })
        console.log(complexData);
        
      })
    }
  }
  render() {
    if (localStorage.getItem('isLoggedIn') === null) {
      return <Redirect to='/login' />
    }
    else{
    const complexData = this.state.complexData.map((item, index) => {
      return (
        <tr key={index}>
          <td>
            {this.state.editElement === index ? <input type="text" className="form-control" onChange={(e) => { this.handleName(e) }} defaultValue={item.name} /> : item.name}</td>

          <td>
            {this.state.editElement === index ?
              <input type="text" className="form-control" onChange={e => { this.handleAcronym(e) }} defaultValue={item.acronym} /> : item.acronym}
          </td>
           <td>
              <label className="switch" id="status">
                <input type="checkbox"  checked={item.status=== 0 ?false : true} disabled = {this.state.editElement === index?false:true} onChange={() => this.handleStatus(item, item.status, index)}/>
                <span className="slider round" />
              </label>
            </td>
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
          <button  type="button"  id="add-row"  className="btn btn-primary"  onClick={this.handleChoice}> Add Question Complex</button>
          </div>
        <div className="alert" style={{display: this.state.error === true ? 'block':'none'}}>
                    <span className="closebtn" onClick={()=>{this.handleClick()}}>&times;</span>
                    <strong>Please Enter Details....</strong>
                  </div>
                  <br />
        <div className="image-container" style={{ display: this.state.isLoaded === false ? 'block' : 'none' }}>
          <p className="image-holder">
            <img  src={require('.././12345.gif')}  alt=""/>
          </p>
        </div>
        <div className="card">
          <div className="card-body">
        <table className="table " style={{display: this.state.isLoaded === true ? 'inline-table' : 'none'}}>
          <thead className="thead-bg">
          <tr>
            <th>Name</th>
            <th>Acronym</th>
            <th>Status</th>
            <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ display: this.state.addComplex === true ? "contents" : "none" }}>
              <td>
                <input type="text" id="name" className="form-control" value={this.state.name} onChange={(e) => { this.handleName(e) }} />
              </td>
              <td>
                <input type="text" id="acronym" className="form-control" value={this.state.acronym} onChange={(e) => { this.handleAcronym(e) }} />
              </td>
              <td><label className="switch" id="status"><input type="checkbox" onChange={() =>this.handleSaveStatus()}/><span className="slider round"></span></label></td>
              <td>
                <button type="button" id="qtopicbutton" className="btn btn-primary" value="save" onClick={(e) => this.handleSaveData(e)} > Save </button>
                <button type="button" id="qtopicbutton" className="btn btn-danger" value="cancel" onClick={(e) => this.handleCancelData(e)} > Cancel </button>
                </td>             
            </tr>
            {complexData}
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

export default QuestionComplexity;
