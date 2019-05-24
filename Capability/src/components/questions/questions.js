import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Menu from '../menu/menu';
import './questions.css';
import {Redirect} from 'react-router-dom';

class Questions extends Component {
constructor(props) {
        super(props)
        this.state = {
            isLoaded:false,
            id:'',
            questionsRelatedTopic:[],
             error:false,
            description: '',
            questiontype_name: '',
            questiontopic_name:'',
            questioncomplexity_name: '',
            complexDropdownData:[],
            topicDropdownData:[],
            status:0,
            Record: {
                id: '',
                description: '',
                questiontopic_name:'',
                questiontype_name: '',
                questioncomplexity_name: '',
                status: ''
            },
            questionsDatas: [],
            currentElement: -1,
        }
     
    }
    handleEdit(data, id) {
        const userId=data.id;
        console.log(userId)
        this.setState({
            id: data.id,
            description: data.description,
            questiontopic_name:data.questiontopic_name,
            questiontype_name: data. questiontype_name,
            questioncomplexity_name: data.questioncomplexity_name,
            currentElement: id
        })
       // this.props.history.push("/menu/questionsPage/${userId}")

        // this.props.history.push({
        //     pathname: 'menu/editQuestions',
        //     state: { userId: 'Put your url here '+userId }
        //   })
        this.props.history.push(`/menu/editQuestions?id=${userId}`)
    }

    handleStatus(data, status, index) {
//alert(data.status);
        const dummyRecord = this.state.Record;
      
        dummyRecord.id = data.id;
        dummyRecord.description = data.description;
        dummyRecord.questiontopic_name=data.questiontopic_name;        
        dummyRecord. questiontype_name = data. questiontype_name;
        dummyRecord.questioncomplexity_name = data.questioncomplexity_name;
        dummyRecord.status = data.status === 0 ? 1 : 0;
      
        const dummytopicData = this.state.questionsDatas;
        dummytopicData[index] = dummyRecord;
        this.setState({
            questionsDatas: dummytopicData,
            status:data.status === 0 ? 1 : 0,
            Record:{
                id: '',
                description: '',
                questiontopic_name:'',
                questiontype_name: '',
                questioncomplexity_name: '',
                status: ''
            }
      
        });
      }

    handleSave(index,data) {
        var RecordDummy = this.state.Record;
        RecordDummy.id = this.state.id;
        RecordDummy.description = this.state.description;
        RecordDummy.questiontopic_name=this.state.questiontopic_name;
        RecordDummy.questiontype_name = this.state.questiontype_name;
        RecordDummy.questioncomplexity_name = this.state.questioncomplexity_name;
        if( RecordDummy.description === "" ||  RecordDummy.questiontype_name === "" ||  RecordDummy.questioncomplexity_name ===""){
            this.setState({
              error:true
            })
          }
          else{
        RecordDummy.status = data.status;
        var questionsDatasDummy = this.state.questionsDatas;
        questionsDatasDummy[index] = RecordDummy;
        // Make a backend call with RecordDummy
        this.setState({
            Record: RecordDummy,
            questionsDatas: questionsDatasDummy,
            currentElement: -1,
            id: '',
            description: '',
            questiontopic_name:'',
            questiontype_name: '',
            questioncomplexity_name: '',
            Record: {
                id: '',
                description: '',
                questiontopic_name:'',
                questiontype_name: '',
                questioncomplexity_name: ''
            }
        })
        //alert(JSON.stringify(this.state.questionsDatas[index]));
    }
    }
    handleQuetionName(e) {
        this.setState({
            description: e.target.value
        });
    }

    handleQuetionType(e) {
        this.setState({
            questiontype_name: e.target.value
        });
    }
    handle

    handleQuetionComplexity(e) {
        this.setState({
            questioncomplexity_name: e.target.value
        });
    }
    componentWillMount() {
        if (localStorage.getItem('isLoggedIn') != null) {
        axios.all([
        axios.get('http://127.0.0.1:8000/questions/getquestion/'),
        axios.get('http://127.0.0.1:8000/questions/complexity/'),
        axios.get('http://127.0.0.1:8000/questions/topic/')
      ])
      .then(axios.spread((questionsDatas, complexDropdownData,topicData) => {
        // do something with both responses
        
        this.setState({
                        questionsDatas: questionsDatas.data,
                        complexDropdownData: complexDropdownData.data,
                        topicDropdownData:topicData.data,
                      isLoaded:true
                    })
      }))
     
    }
        }
      handleClick(){
        this.setState({
            error:false
        })
}
handleTopic=(e)=>{
        //    this.setState({
        //     questionsRelatedTopic:e.target.value
        //    })
        //     console.log(this.state.questionsRelatedTopic);
        // var input, filter, table, tr, td, i, txtValue;
        // input = document.getElementById("myInput");
        // filter = input.value.toUpperCase();
        // table = document.getElementById("tblQues");
        // tr = table.getElementsByTagName("tr");
        // for (i = 0; i < tr.length; i++) {
        //   td = tr[i].getElementsByTagName("td")[0];
        //   if (td) {
        //     txtValue = td.textContent || td.innerText;
        //     if (txtValue.toUpperCase().indexOf(filter) > -1) {
        //       tr[i].style.display = "";
        //     } else {
        //       tr[i].style.display = "none";
        //     }
        //   }       
        // }

           const topicData=e.target.value
 axios.get(`http://127.0.0.1:8000/questions/topicdetails/${topicData}/`)
 
             .then(res=>{
                 
                 console.log(res.data.topiclistques)
                 this.setState({
                    questionsDatas:[...res.data.topiclistques]
                })
             })              
 
}

    render() {
        if (localStorage.getItem('isLoggedIn') === null) {
            return <Redirect to='/login' />
          }
          else{ 
        return (
            
            <div>
                <Menu />
                <div className="side-content">  {/* padding left and right */}
                <div>
                    <br />
                    <button type="button" id="btn" value="add question" className="btn btn-primary" ><NavLink to='/menu/questionsPage'>Add Question</NavLink></button>
                </div>
               
         <div class="topicDrpdwn">
         <select className="form-control" onChange={this.handleTopic}  id="myInput">
         <option>--select--</option>
    {this.state.topicDropdownData.map(drpTopicData =>{
        return(
                <option value={drpTopicData.name}>{ drpTopicData.name}</option>
               )
            })} 
       
       </select> 
       </div>
                   
               
                <div className="alert" style={{display: this.state.error === true ? 'block':'none'}}>
                    <span className="closebtn" onClick={()=>{this.handleClick()}}>&times;</span>
                    <strong>Please Enter Details....</strong>
                  </div>
      
                <div className="image-container" style={{ display: this.state.isLoaded === false ? 'block' : 'none' }}>
          <p className="image-holder">
            <img  src={require('.././12345.gif')}  alt=""/>
          </p>
        </div>
        <br />
        <div className="card">  {/*  Bootstrap cards  */}
        <div className="card-body">
                    <table id="tblQues" className="table" style={{display: this.state.isLoaded === true ? 'inline-table' : 'none'}} >
                        <thead className="thead-bg">
                            <tr>
                                <th>Questions</th><th>Topic</th><th>Type</th>
                                <th>Complexity</th><th>Status</th><th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {console.log(this.state.questionsDatas)}
                            {this.state.questionsDatas.map((questionsData,index) => {
                                return <tr key={index}>
                                    {/* <td>{questionsData.url.split('/')[5]}</td> */}
                                    <td >{index === this.state.currentElement ? <input type='text' class="form-control" onChange={(e) => { this.handleQuetionName(e) }} defaultValue={questionsData.description} /> : questionsData.description}</td>
                                    <td>{questionsData.questiontopic_name}</td>
                                    <td>{questionsData.questiontype_name}</td>

     <td>
    <select className="form-control" disabled={!(index === this.state.currentElement)}>
    {this.state.complexDropdownData.map((drpData,index)=>{
      
               return(
                <option key={index} selected={drpData.name === questionsData.questioncomplexity_name} value={drpData.name === questionsData.questioncomplexity_name ? true : false}>{ drpData.name}</option>
               )
            
       })}</select>
    </td>

                                    {/* <td>{index === this.state.currentElement ? <input type='text' class="form-control" onChange={(e) => { this.handleQuetionComplexity(e) }} defaultValue={questionsData.questioncomplexity_name} /> : questionsData.questioncomplexity_name}</td> */}
                                    <td>
                                        <label className="switch" id="status">
                                            <input type="checkbox" checked={questionsData.status=== 1 ? true : false} disabled = {this.state.currentElement === index?false:true} onChange={() => this.handleStatus(questionsData, questionsData.status, index)} />
                                            <span className="slider round"></span>
                                        </label>
                                    </td> 
                                    {/* <td><label class="switch" id="status"><input type="checkbox" /><span class="slider round"></span></label></td> */}
                                    <td>
                                        <div >  {index === this.state.currentElement ? <svg onClick={() => { this.handleSave(index,questionsData) }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 18 18"><path d="M6.61 11.89L3.5 8.78 2.44 9.84 6.61 14l8.95-8.95L14.5 4z" /></svg> : <svg onClick={() => { this.handleEdit(questionsData, index) }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /></svg>}</div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                                            </table>
                </div>
                </div>
            </div>
            </div>
        )
    }
  }
}
export default Questions;