import React, { Component } from 'react';
import './questionTopic.css';
import Menu from '../menu/menu';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

class QuestionTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empty: false,
      isLoaded: false,
      topicData: [],
      addTopic: false,
      editElement: -1,
      name: '',
      acronym: '',
      status: 0,
      Record: {
        name: '',
        acronym: '',
        status:''
      }
    }
  }
  handleName(e) {
    this.setState({
      name: e.target.value
    })

  }
  handleAcronym(e) {
    this.setState({
      acronym: e.target.value
    })
    //console.log(this.state.acronym);
  }
  handleSaveStatus(){
    this.setState({
      status:this.state.status === 0 ? 1 : 0,
     
      })
    console.log(this.state.status);
  }
  //componentDidUpdate(){
  handleTopic = () => {
      if (this.state.addTopic === false) {
      this.setState({
        addTopic: true
      });
    }
  }
 
  handleCancelData=()=>{
    if (this.state.addTopic === true) {
      this.setState({
        addTopic: false
      });
    }
  }
  handleEdit(data, id) {

    this.setState({
      name: data.name,
      acronym: data.acronym,
      status:data.status === 0 ? 0 :1,
      editElement: id
    });
  }
  handleSave(index) {
    console.log(index+1);
    const userTopicEdit={
      name:this.state.name,
      acronym:this.state.acronym,
      status:this.state.status === 0 ? 0 : 1,
    }
      axios.put(`http://127.0.0.1:8000/questions/topicid/${index+1}/`,userTopicEdit,
      )
      .then(res => {
     //axiosconsole.log(res);
     //console.log(res.data);
     const userQuestionTopicEdit=res.data;
     console.log(userTopicEdit);
     console.log(userQuestionTopicEdit);
     console.log(userQuestionTopicEdit.id);
   })
    
    const dummyRecord = this.state.Record;
    dummyRecord.name = this.state.name;
    dummyRecord.acronym = this.state.acronym;
    dummyRecord.status=this.state.status === 0 ? 0 :1
    if (dummyRecord.name === "" || dummyRecord.acronym === "") {
      this.setState({
        error: true
      })
    }
    else {
      // dummyRecord.status = this.state.status;
      const dummytopicData = this.state.topicData;
      dummytopicData[index] = dummyRecord;
      this.setState({
        editElement: -1,
        topicData: dummytopicData,
        name: '',
        acronym: '',
        status: '',
        Record: {
          name: '',
          acronym: '',
          status: ''
        }
      });
    }
  }
  handleStatus(data, status, index) {
    const dummyRecord = this.state.Record;
    dummyRecord.name = data.name;
    dummyRecord.acronym = data.acronym;
    dummyRecord.status = status === 0 ? 1 : 0;

    const dummytopicData = this.state.topicData;
    dummytopicData[index] = dummyRecord;
    this.setState({
      topicData: dummytopicData,
      status: status === 0 ? 1 : 0,
      Record: {
        name: '',
        acronym: '',
        status: ''
      }

    });
    console.log(this.state.status);
  }
  handleSaveData() {
        const dummyRecord = this.state.Record;
          dummyRecord.name = this.state.name;
          dummyRecord.acronym = this.state.acronym;
          dummyRecord.status=this.state.status === 0 ? 0 : 1;
    if (dummyRecord.name === "" || dummyRecord.acronym === "") {
      this.setState({
        error: true
      })
    }
    else {
      const userQTopic={
        name:this.state.name,
        acronym:this.state.acronym,
        status:this.state.status === 0 ? 0 :1
      }
      axios.post(`http://127.0.0.1:8000/questions/topic/`,userQTopic)
               .then(res => {
              
              const userQuestionTopic=res.data;
              console.log(userQTopic);
              console.log(userQuestionTopic);
            })
      const dummytopicData = this.state.topicData;
      dummytopicData[this.state.topicData.length + 1] = dummyRecord;
      this.setState({
        Record: dummyRecord,
        topicData: dummytopicData,
        editElement: -1,
        addTopic: false,
        name: '',
        acronym: '',
        // status:0,
        Record: {
          name: '',
          acronym: '',
          // status: 0
        }
      });
      console.log(this.state.status);
      console.log(this.state.Record.status);
    }
  }
  componentWillMount() {
    if (localStorage.getItem('isLoggedIn') != null) {
    axios.get("http://127.0.0.1:8000/questions/topic/")
      .then(response => {
        console.log(response.data);
        const topicData = response.data;
        this.setState({
          topicData,
          isLoaded: true
        })
      })
  }
}
  handleClick() {
    this.setState({
      error: false
    })

  }
  render() {
    if (localStorage.getItem('isLoggedIn') === null) {
      return <Redirect to='/login' />
    }
    else{
    const {topicData,editElement}=this.state;
    const tblTopicData = topicData.map((item, index) => {
      return (
        <tr key={index}>
          <td>{editElement === index ? <input type='text' className="form-control" onChange={(e) => { this.handleName(e) }} defaultValue={item.name} /> : item.name}</td>
          <td>{editElement === index ? <input type='text' className="form-control" onChange={(e) => { this.handleAcronym(e) }} defaultValue={item.acronym} /> : item.acronym}</td>
          <td>
            <label className="switch" id="status">
              <input type="checkbox" checked={item.status === 0 ? false : true} disabled={this.state.editElement === index ? false : true} onChange={() => this.handleStatus(item, item.status, index)} />
              <span className="slider round" />
            </label>
          </td>
          <td>
            <div>
              {editElement === index ? <svg onClick={() => { this.handleSave(index) }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 18 18"><path d="M6.61 11.89L3.5 8.78 2.44 9.84 6.61 14l8.95-8.95L14.5 4z" /></svg> :
                <svg onClick={(e) => { this.handleEdit(item, index) }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /></svg>
              }

            </div>

          </td>

        </tr>
      )
    });


    return (
      <div >
        <Menu />
       <div className="side-content">
        <div>
          <br />
          <button type="button" id="add-row" value="add question topic" className="btn btn-primary" onClick={this.handleTopic}>Add Question Topic</button>
        </div>
        <div className="alert" style={{ display: this.state.error === true ? 'block' : 'none' }}>
          <span className="closebtn" onClick={() => { this.handleClick() }}>&times;</span>
          <strong>Please Enter Details....</strong>
        </div>

        <br />
        <div className="image-container" style={{ display: this.state.isLoaded === false ? 'block' : 'none' }}>
          <p className="image-holder">
            <img src={require('.././12345.gif')} alt="" />
          </p>
        </div>

        <div className="card">
          <div className="card-body">
            <table className="table" style={{ display: this.state.isLoaded === true ? 'inline-table' : 'none' }}>
              <thead className="thead-bg"  >
              <tr>
                <th>Name</th>
                <th>Acronym</th>
                <th>Status</th>
                <th>Action</th>
                </tr>
              </thead>
             <tbody>
                <tr style={{ display: this.state.addTopic ? 'contents' : 'none' }}>
                  <td><input type="text" className="form-control" value={this.state.name} onChange={(e) => this.handleName(e)} /></td>
                  <td><input type="text" className="form-control" value={this.state.acronym} onChange={(e) => this.handleAcronym(e)} /></td>
                  <td>
                    <label className="switch" id="status">
                      <input type="checkbox" value={this.state.status} onChange={() =>this.handleSaveStatus()} />
                      <span className="slider round" />
                    </label>
                  </td>
                  <td><button type="button" id="qtopicbutton" className="btn btn-primary" value="save" onClick={() => { this.handleSaveData() }}>Save</button>
                  <button type="button" id="qtopicbutton" className="btn btn-warning" value="cancel" onClick={() => { this.handleCancelData() }}>Cancel</button>
                  </td>
                </tr>
                {tblTopicData}
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

export default QuestionTopic;
