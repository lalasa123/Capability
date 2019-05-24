import React, { Component } from 'react';
import Menu from '../menu/menu';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import './editQuestions.css';

class editQuestions extends Component {
    // componentDidMount () {
    //      document.body.style = 'background: #e9ecef;';
    //     //alert(this.props.location.state.userId);
        
    //    }    
    constructor(props){
        super(props)
        this.state ={
            editQuesData:[],
            topicData:[],
            typeData:[],
            complexData:[],
            isLoaded:false,
            check1: '',
            check2: '',
            check3: '',
            check4: '',
            RecordData:{
                selectedRadio:'',
                option1:'',
                option2:'',
                option3:'',
                option4:'',
                questionData:'',
                mName:'',
                questionsqueryData:''               
            },

            getInitialState: function() {
                return {
                    check_me1: true,
                    check_me2: true,
                    check_me3: true,
                    check_me4: true
                };
            },
        }
    }
    
     componentWillMount() {           
        if (localStorage.getItem('isLoggedIn') != null) { 
            const idData=this.props.location.search;
            var idvalue =  idData.split("?id=");  
            var id = idvalue.slice(1, 3);
            console.log(id[0]);
            axios.all([
                axios.get('http://127.0.0.1:8000/questions/top/'),
                axios.get('http://127.0.0.1:8000/questions/comp/'),
                axios.get('http://127.0.0.1:8000/questions/typ/'),
                axios.get(`http://127.0.0.1:8000/questions/editquestionchoiceans/${id[0]}/`)
              ])
              .then(axios.spread((topicData, complexData,typeData,editQuesData) => {
                // do something with both responses
                console.log(editQuesData.data)
                this.setState({
                    topicData: topicData.data,
                    complexData: complexData.data,
                    typeData:typeData.data,
                    editQuesData:editQuesData.data,
                    isLoaded:true,
                    option1: editQuesData.data.choice[0].name,
                    option2: editQuesData.data.choice[1].name,
                    option3: editQuesData.data.choice[2].name,
                    option4: editQuesData.data.choice[3].name,
                })
                editQuesData.data.answer.map((result,i) => {
                    if(i === 0){
                        this.setState({
                            check1: result
                        })
                    }
                    if(i === 1){
                        this.setState({
                            check2: result
                        })
                    }
                    if(i === 2){
                        this.setState({
                            check3: result
                        })
                    }
                    if(i === 3){
                        this.setState({
                            check4: result
                        })
                    }
                })
              }))
        }
    }

    handleTypeDropdown = (e) => {
            this.setState({
                typeDropdownValue:e.target.value,
            
    })      
       console.log(this.state.typeDropdownValue);
       }

    handleTopicDropdown = (e) => {
        this.setState({
            topicDropdownValue: e.target.value
        })
        
    }

    handleComplexityDropdown = (e) => {
        this.setState({
            complexityDropdownValue: e.target.value
        })
    }
    handleQuestionsData(e){
        this.setState({
            questionData:e.target.value
        })
            }
        
    handleOption1(e){
        this.setState({
            option1:e.target.value
        })
        
    }
        handleOption2(e){
            this.setState({
                option2:e.target.value
            })
        }
            handleOption3(e){
                this.setState({
                    option3:e.target.value
                })
            }
                handleOption4(e){
                    this.setState({
                        option4:e.target.value
                    })
                }
                handleAnswer1(e){
                    this.setState({
                        selectedRadio:e,
                        isRadioSelected:1
                    })
                    console.log(this.state.selectedRadio)
                }
            
                handleAnswer2(e){
                    this.setState({
                        selectedRadio:e,
                        isRadioSelected:2
                    })     
                }
            
                handleAnswer3(e){
                    this.setState({
                        selectedRadio:e,
                        isRadioSelected:3
                    })
                }
            
                handleAnswer4(e){
                    this.setState({
                        selectedRadio:e,
                        isRadioSelected:4
                    })
                }
                checkChange = (e) => {
                    if(e.target.checked === false){
                        this.setState({
                            [e.target.name] : '',
                            isCheckboxSelected:1,
                            //chckBoxAnswer:this.state.chckBoxAnswer.pop(e.target.value)
                            chckBoxAnswer:this.state.chckBoxAnswer.filter(function(val) {return val!==e.target.value})
                           
                        })
                        console.log("before else" + this.state.chckBoxAnswer);
            
                        // console.log(this.state.check1)
                        //  console.log(this.state.check2)
                        // console.log(this.state.check3)
                        // console.log(this.state.check4)
                    } else if(e.target.checked === true){
                        var joined = e.target.value;
                        
                        var newState = this.state.chckBoxAnswer.slice();
                        newState.push(joined);
            
                        this.setState({
                            chckBoxAnswer:this.state.chckBoxAnswer.concat([newState]),
                            [e.target.name] : e.target.value
                            // chckBoxAnswer:joined
                        })
                        
                        // console.log(this.state.check1)
                        //  console.log(this.state.check2)
                        // console.log(this.state.check3)
                        // console.log(this.state.check4)
                        // if(this.state.chckBoxAnswer !== ""){
                        //     this.setState({
                        //         isCheckboxSelected:1,
                        //     })
                        // }
                       
                    }
                    console.log("after else" +this.state.chckBoxAnswer);
                    
                }
                handleSave(){            
                    console.log(this.state.editQuesData.questiontopic);
        const idData=this.props.location.search;
            var idvalue =  idData.split("?id=");  
            var id = idvalue.slice(1, 3);
                    const f = [];
                    if(this.state.check1 !== ''){
                        f.push({"name":this.state.check1})
                    } 
                    if(this.state.check2 !== ''){
                        f.push({"name":this.state.check2})
                    }
                    if(this.state.check3 !== ''){
                        f.push({"name":this.state.check3})
                    } 
                    if(this.state.check4 !== ''){
                        f.push({"name":this.state.check4})
                    }
                    console.log(f);                    
                    const dummyRecordData=this.state.RecordData;                    
                    dummyRecordData.selectedRadio=this.state.selectedRadio;
                    dummyRecordData.option1=this.state.option1;
                    dummyRecordData.option2=this.state.option2;
                    dummyRecordData.option3=this.state.option3;
                    dummyRecordData.option4=this.state.option4;
                    if(this.state.questionData == "" || this.state.questionData == undefined ){
                        dummyRecordData.questionData=this.state.editQuesData.description
                    }
                    else{
                    dummyRecordData.questionData=this.state.questionData;
                    }
                    dummyRecordData.selectedCheckbox=this.state.selectedCheckbox;
                    dummyRecordData.questionsqueryData=this.state.questionsqueryData;
                    if(this.state.topicDropdownValue == undefined ){
                        dummyRecordData.topicDropdownValue = this.state.editQuesData.questiontopic;
                    }else{
                    dummyRecordData.topicDropdownValue=this.state.topicDropdownValue;
                    }
                    if(this.state.complexityDropdownValue == "" || this.state.complexityDropdownValue == undefined){
                        dummyRecordData.complexityDropdownValue=this.state.editQuesData.questioncomplexity;
                    }else{
                    dummyRecordData.complexityDropdownValue=this.state.complexityDropdownValue;
                    }
                    if(this.state.typeDropdownValue == "" || this.state.typeDropdownValue == undefined){
                        dummyRecordData.typeDropdownValue=this.state.editQuesData.questiontype;  
                    }else{
                    dummyRecordData.typeDropdownValue=this.state.typeDropdownValue;
                    }
                    if(this.state.selectedRadio == "" || this.state.selectedRadio ==null){
                     const userQuestion={                         
                        description:dummyRecordData.questionData,
                        questiontype:dummyRecordData.typeDropdownValue,
                        questioncomplexity:dummyRecordData.complexityDropdownValue,
                        questiontopic:dummyRecordData.topicDropdownValue,
                        image:'None',
                        choices:[
                            {"name" : this.state.option1},
                            {"name" : this.state.option2},
                            {"name" : this.state.option3},
                            {"name" : this.state.option4}           
                        
                        ],
                        answer: f
                        
                    }
                    alert(userQuestion);
                    console.log(userQuestion);
                    axios.post(`http://127.0.0.1:8000/questions/updatequestionchoiceans/${id[0]}/`,userQuestion)
                    .then(res =>{
                        const addQuestionResult=res.data;
                        console.log(addQuestionResult);
                    })
                        
                }
                    else{
                        const userQuestion={
                            description:dummyRecordData.questionData,
                            questiontype:dummyRecordData.typeDropdownValue,
                            questioncomplexity:dummyRecordData.complexityDropdownValue,
                            questiontopic:dummyRecordData.topicDropdownValue,
                            image:'None',
                            choices:[
                                {"name" : this.state.option1},
                                {"name" : this.state.option2},
                                {"name" : this.state.option3},
                                {"name" : this.state.option4}           
                            
                            ],
                            answer:[
                                {
                                    "name":	this.state.selectedRadio
                                }
                                ]
                            
                        }
                        console.log(userQuestion);
                        axios.post(`http://127.0.0.1:8000/questions/updatequestionchoiceans/${id[0]}/`,userQuestion)
                        .then(res =>{
                            const addQuestionResult=res.data;
                            console.log(addQuestionResult);
                        })                     
                    
                }
              this.setState({
                       RecordData:dummyRecordData,
                       selectedRadio:'',
                    option1:'',
                    option2:'',
                    option3:'',
                    option4:'',
                    questionData:'',
                    selectedCheckbox:'',
                    questionsqueryData:'',
                    topicDropdownValue:'',
                    complexityDropdownValue:'',
                    choice1url:'',
                    choice1ur2:'',
                    choice1ur3:'',
                    choice1ur4:'',
                 })                   
                   this.props.history.push('/menu/questions')
                }
            
            

                
    render() {
        if (localStorage.getItem('isLoggedIn') === null) {
            return <Redirect to='/login' />
          }else{
        return (
            <div >
            <Menu />
           {/* <div className="side-content"> */}
           <div className="image-container" style={{ display: this.state.isLoaded === false ? 'block' : 'none' }}>
          <p className="image-holder">
            <img src={require('.././12345.gif')} alt="" />
          </p>
        </div>
        <table id="tblPage" > 
{/*    {this.state.editQuesData.map(editque=>{

    })} */}
    <tbody>
        {console.log(this.state.editQuesData)}
        {console.log(this.state.topicData)}
        {console.log(this.state.typeData.name)}
                    <tr><td>
                        <label>Select Topic</label>
                        <select className="form-control" onChange={this.handleTopicDropdown} > 
                        <option>--select--</option> 
                        {
                            this.state.topicData.map(topic => {                        
                      
                                return  <option key={topic.id} value={topic.acronym} selected={topic.name === this.state.editQuesData.questiontopic}>{topic.name}</option>
                                   
                                // if(topic.name === this.state.editQuesData.questiontopic){
                                //     return <option key={topic.id} value={topic.acronym} selected>{topic.name}</option>
                                // } 
                                // return <option key={topic.id} value={topic.acronym}>{topic.name}</option>
                            })
                        }
                        </select>
                    </td>
                        <td>
                            <label>Select Complexity</label>
                            <select className="form-control"  onChange={this.handleComplexityDropdown}>
                            <option>--select--</option> 
                                {this.state.complexData.map(complex=>
                                  (
                                        <option key={complex.id} value={complex.acronym} selected={complex.name === this.state.editQuesData.questioncomplexity}>{complex.name}</option>
                                    )
                                )}

                            </select ></td>
                        <td>
                            <label>Select Type</label>
                            <select className="form-control" id="drpType"  onChange={this.handleTypeDropdown}>
                            <option>--select--</option> 
                                 {this.state.typeData.map(type=>(
                                <option key={type.id} value={type.acronym} selected={type.name === this.state.editQuesData.questiontype}>{type.name}</option>
                            ))}
                                

                            </select></td>
                    </tr>
                
                    </tbody>
                    </table>
                    <div id="sType" className="form-group" style={{display:this.state.editQuesData.questiontype ==="SCQ"  || this.state.editQuesData.questiontype === "MCQ" ? 'block' :'none'}}>
               
                <table id="tblQpage" text-align="center" >
                        <tbody>
                        <tr><td>
                            <textarea className="form-control" rows="3" cols="100"  placeholder="Enter Questions" value={this.state.editQuesData.description} onChange={(e)=>{this.handleQuestionsData(e)}}/></td></tr>
                   </tbody></table>
                   <div className="align">
                   <table className="optionTbl" text-align="center">
                        <tbody>
                        <tr><td className="options"><label className="optLbl">a.</label><input type="text" className="form-control" onChange={(e)=>{this.handleOption1(e)}} value={this.state.option1}/></td></tr>
                          <tr><td className="options"><label className="optLbl">b.</label><input type="text" className="form-control" onChange={(e)=>{this.handleOption2(e)}} value={this.state.option2} /></td>
                        </tr>
                        <tr><td className="options"><label className="optLbl">c.</label><input type="text" className="form-control" onChange={(e)=>{this.handleOption3(e)}} value={this.state.option3} /></td></tr>
                            <tr><td className="options"><label className="optLbl">d.</label><input type="text" className="form-control" onChange={(e)=>{this.handleOption4(e)}} value={this.state.option4} /></td></tr>
                    </tbody></table>
                    <table className="ans" style={{display:this.state.editQuesData.questiontype === "SCQ" ?'block':'none'}}>
                         <tbody>
                        <tr><td><input type="radio" className="ans1" checked={this.state.check1 } name="selectedRadio" onChange={(e)=>{this.handleAnswer1(this.state.option1)}} /></td></tr>
                       <tr><td><input type="radio"   className="ans1" checked={this.state.check2 } onChange={(e)=>{this.handleAnswer2(this.state.option2)}} name="selectedRadio" /></td></tr>
                        <tr><td><input type="radio"   className="ans1" checked={this.state.check3 }  name="selectedRadio" onChange={(e)=>{this.handleAnswer3(this.state.option3)}}/></td></tr>
                        <tr><td><input type="radio" className="ans2" checked={this.state.check4 } name="selectedRadio" onChange={(e)=>{this.handleAnswer4(this.state.option4)}} />
                         </td></tr>
                         <tr><td>
                         <div id="divbtn" style={{display:this.state.editQuesData.questiontype === "SCQ" ?'block':'none'}}>
                        <button type="button" value="save"  className="btn btn-success" onClick={()=>{this.handleSave()}}>Save</button>
                        <button type="button" value="Cancel"  className="btn btn-danger" onClick={()=>{this.handleClose()}}  >Cancel</button>
                    </div>
                    </td></tr>
                    </tbody>
                    </table> 
                                                      
                                <table className="ans" style={{display:this.state.editQuesData.questiontype === "MCQ" ?'block':'none'}}>
                    <tbody>
                    <tr>
                         <td><input type="checkbox" className="ans1" name="check1" checked={this.state.check1}  onChange={e => this.checkChange(e)} value={this.state.option1} /></td>
                        </tr>
                        <tr>
                         <td><input type="checkbox" className="ans1" name="check2" checked={this.state.check2}  onChange={e => this.checkChange(e)} value={this.state.option2} /></td>
                        </tr>
                        <tr>
                         <td><input type="checkbox" className="ans1" name="check3" checked={this.state.check3}  onChange={e => this.checkChange(e)} value={this.state.option3} /></td>
                        </tr>
                        <tr>
                         <td><input type="checkbox" className="ans1" name="check4" checked={this.state.check4}  onChange={e => this.checkChange(e)} value={this.state.option4} /></td>
                        </tr>
                      <tr><td>  
                        <div id="divbtn" style={{display:this.state.editQuesData.questiontype === "MCQ" ?'block':'none'}}>
                        <button type="button" value="save"  className="btn btn-success" onClick={()=>{this.handleSave()}}  >Save</button>
                        <button type="button" value="Cancel"  className="btn btn-danger" onClick={()=>{this.handleClose()}} >Cancel</button>
                    </div>
                    </td></tr>
                    </tbody>
                    </table> 
           `    </div>
                         </div>
                                </div>
        );
    }
    }
}

export default editQuestions;