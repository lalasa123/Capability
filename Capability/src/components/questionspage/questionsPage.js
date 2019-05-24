import React, { Component } from 'react';
import './questionPage.css';
import Menu from '../menu/menu';
import axios from 'axios';
import {Redirect} from 'react-router-dom';


class QuestionsPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedCheckbox:'',
            isCheckboxSelected:'',
            selectedRadio:'',
            questionsqueryData:'',
            file: null,
            topicData:[],
            complexData:[],
            typeData: [],
            chckBoxAnswer:[],            
            topicDropdownValue: '--Select--',
            complexityDropdownValue: '--Select--',
            typeDropdownValue:'--Select--',
            option1:'',
            option2:'',
            option3:'',
            option4:'',
            isRadioSelected:'',
            questionData:'',
            choice1url:'',
            choice1ur2:'',
            choice1ur3:'',
            choice1ur4:'',
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
            a: [],
            responseUrl: '',
            check1: '',
            check2: '',
            check3: '',
            check4: '',
            getInitialState: function() {
                return {
                    check_me1: true,
                    check_me2: true,
                    check_me3: true,
                    check_me4: true
                };
            },
            saveanswers: []
        }
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
    handleQuestionsqueryData(e){
        this.setState({
            questionsqueryData:e.target.value
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

    handleChange =(e) =>{
        this.setState({
            file: URL.createObjectURL(e.target.files[0])
          })
    }
    
    // handleCAnswer(e){
    //     console.log(e.checked)
    //         this.setState({
    //              //selectedCheckbox:e,                 
    //              chckBoxAnswer:this.state.chckBoxAnswer.concat(e),
    //             isCheckboxSelected:'1'
                 
    //         })
    //         console.log(this.state.chckBoxAnswer);
    // }

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
        // console.log(this.state.saveanswers)
        const dummyRecordData=this.state.RecordData;
        dummyRecordData.selectedRadio=this.state.selectedRadio;
        dummyRecordData.option1=this.state.option1;
        dummyRecordData.option2=this.state.option2;
        dummyRecordData.option3=this.state.option3;
        dummyRecordData.option4=this.state.option4;
        dummyRecordData.questionData=this.state.questionData;
        dummyRecordData.selectedCheckbox=this.state.selectedCheckbox;
        dummyRecordData.questionsqueryData=this.state.questionsqueryData;
        dummyRecordData.topicDropdownValue=this.state.topicDropdownValue;
        dummyRecordData.complexityDropdownValue=this.state.complexityDropdownValue;
        dummyRecordData.typeDropdownValue=this.state.typeDropdownValue;
        
        if(this.state.selectedRadio == "" || this.state.selectedRadio ==null){
         const userQuestion={
            description:this.state.questionData,
            questiontype:this.state.typeDropdownValue,
            questioncomplexity:this.state.complexityDropdownValue,
            questiontopic:this.state.topicDropdownValue,
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
        axios.post('http://127.0.0.1:8000/questions/addquestionchoiceans/',userQuestion)
        .then(res =>{
            const addQuestionResult=res.data;
            console.log(addQuestionResult);
        })
            
    }
        else{
            const userQuestion={
                description:this.state.questionData,
                questiontype:this.state.typeDropdownValue,
                questioncomplexity:this.state.complexityDropdownValue,
                questiontopic:this.state.topicDropdownValue,
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
            axios.post('http://127.0.0.1:8000/questions/addquestionchoiceans/',userQuestion)
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
        //isRadioSelected :5 
       })
       //alert("Data Saved Successfully")
       //alert(this.state.isRadioSelected);
       //alert(this.state. isCheckboxSelected);
       //alert("data saved successfully" +JSON.stringify(this.state.RecordData));
       this.props.history.push('/menu/questions')
    }
    handleClose(){
     alert("canceled  successfully");
     this.props.history.push('/menu/questions')
    }
    componentWillMount() {
        if (localStorage.getItem('isLoggedIn') != null) {
               axios.all([
            axios.get('http://127.0.0.1:8000/questions/top/'),
            axios.get('http://127.0.0.1:8000/questions/comp/'),
            axios.get('http://127.0.0.1:8000/questions/typ/')
          ])
          .then(axios.spread((topicData, complexData,typeData) => {
            // do something with both responses
            
            this.setState({
                topicData: topicData.data,
                complexData: complexData.data,
                typeData:typeData.data,
                          isLoaded:true
                        })
          }))
          console.log(this.state.topicData);
          console.log(this.state.complexData);
          console.log(this.state.typeData);
        }
        }

        componentDidMount () {
        // alert(this.props.location.id);
        }        

render() {
    if (localStorage.getItem('isLoggedIn') === null) {
        return <Redirect to='/login' />
      }
      else{
        return (
            <div>
                <Menu />
                
<table id="tblPage" > 
<tbody>
                    <tr><td>
                        <label>Select Topic</label>
                        <select className="form-control" onChange={this.handleTopicDropdown}> 
                        <option>--select--</option>
                        {
                            this.state.topicData.map(topic => (
                                <option key={topic.id} value={topic.name}>{topic.name}</option>
                            ))
                        }
                        </select>
                    </td>
                        <td>
                            <label>Select Complexity</label>
                            <select className="form-control" disabled={this.state.topicDropdownValue === "--Select--"} onChange={this.handleComplexityDropdown}>
                                <option>--Select--</option>
                                {this.state.complexData.map(complex=>
                                  (
                                        <option key={complex.id} value={complex.acronym}>{complex.name}</option>
                                    )
                                )}

                            </select ></td>
                        <td>
                            <label>Select Type</label>
                            <select className="form-control" id="drpType" disabled={this.state.complexityDropdownValue === "--Select--"} onChange={this.handleTypeDropdown}>
                                <option>--Select--</option>
                            {this.state.typeData.map(type=>(
                                <option key={type.id} value={type.acronym}>{type.name}</option>
                            ))}
                                

                            </select></td>
                    </tr>
                    
                    </tbody>
                </table>
                <div><button type="button" value="Cancel"  className="btn btn-danger" id="qCancel" style={{display:this.state.typeDropdownValue ==="Single Choice Question"  || this.state.typeDropdownValue === "Multiple Choice Question" ||this.state.typeDropdownValue === "Querey" ?'none':'block'}}  onClick={()=>{this.handleClose()}}  >Cancel</button></div>
             
                <div id="sType" className="form-group" style={{display:this.state.typeDropdownValue ==="Single Choice Question"  || this.state.typeDropdownValue === "Multiple Choice Question" ? 'block' :'none'}}>
                   <table id="tblQpage" text-align="center" >
                        <tbody>
                        <tr><td>
                            <textarea className="form-control" rows="3" cols="100"  placeholder="Enter Questions" value={this.state.questionData} onChange={(e)=>{this.handleQuestionsData(e)}}/></td></tr>
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
                        
                         <table className="ans" style={{display:this.state.typeDropdownValue === "Single Choice Question" ?'block':'none'}}>
                         <tbody>
                        <tr><td><input type="radio" className="ans1" selected={this.state.isRadioSelected === 1} name="selectedRadio" onChange={(e)=>{this.handleAnswer1(this.state.option1)}} /></td></tr>
                       <tr><td><input type="radio"   className="ans1" selected={this.state.isRadioSelected === 2} onChange={(e)=>{this.handleAnswer2(this.state.option2)}} name="selectedRadio" /></td></tr>
                        <tr><td><input type="radio"   className="ans1" selected={this.state.isRadioSelected === 3}  name="selectedRadio" onChange={(e)=>{this.handleAnswer3(this.state.option3)}}/></td></tr>
                        <tr><td><input type="radio" className="ans2" selected={this.state.isRadioSelected === 4} name="selectedRadio" onChange={(e)=>{this.handleAnswer4(this.state.option4)}} />
                         </td></tr>
                         <tr><td>
                         <div id="divbtn" style={{display:this.state.typeDropdownValue === "Single Choice Question" ?'block':'none'}}>
                        <button type="button" value="save"  className="btn btn-success" onClick={()=>{this.handleSave()}}  disabled={!this.state.questionData || !this.state.option1 || !this.state.option2 || !this.state.option3 || !this.state.option4 || !this.state.isRadioSelected}>Save</button>
                        <button type="button" value="Cancel"  className="btn btn-danger" onClick={()=>{this.handleClose()}}  >Cancel</button>
                    </div>
                    </td></tr>
                    </tbody>
                    </table> 
                    <table className="ans" style={{display:this.state.typeDropdownValue === "Multiple Choice Question" ?'block':'none'}}>
                    
                    <tbody>
                        {/* <tr><td ><input type="checkbox" className="ans1" name="isCheckboxSelected" ref="check_me"  onChange={(e)=>{this.handleCAnswer(this.state.option1)}} /></td></tr>
                        <tr><td><input type="checkbox"   className="ans1" name="isCheckboxSelected" ref="check_me"  onChange={(e)=>{this.handleCAnswer(this.state.option2)}}  /></td></tr>
                        <tr><td><input type="checkbox"   className="ans1" name="isCheckboxSelected" ref="check_me"  onChange={(e)=>{this.handleCAnswer(this.state.option3)}}/></td></tr>
                        <tr><td><input type="checkbox" className="ans2" name="isCheckboxSelected" ref="check_me"  onChange={(e)=>{this.handleCAnswer(this.state.option4)}} />
                         </td></tr> */}
                        <tr>
                         <td><input type="checkbox" className="ans1" name="check1" checked={this.state.check_me1}  onChange={e => this.checkChange(e)} value={this.state.option1} /></td>
                        </tr>
                        <tr>
                         <td><input type="checkbox" className="ans1" name="check2" checked={this.state.check_me2}  onChange={e => this.checkChange(e)} value={this.state.option2} /></td>
                        </tr>
                        <tr>
                         <td><input type="checkbox" className="ans1" name="check3" checked={this.state.check_me3}  onChange={e => this.checkChange(e)} value={this.state.option3} /></td>
                        </tr>
                        <tr>
                         <td><input type="checkbox" className="ans1" name="check4" checked={this.state.check_me4}  onChange={e => this.checkChange(e)} value={this.state.option4} /></td>
                        </tr>
                      <tr><td>  
                        <div id="divbtn" style={{display:this.state.typeDropdownValue === "Multiple Choice Question" ?'block':'none'}}>
                        <button type="button" value="save"  className="btn btn-success" onClick={()=>{this.handleSave()}}  disabled={!this.state.questionData || !this.state.option1 || !this.state.option2 || !this.state.option3 || !this.state.option4 || !this.state.isCheckboxSelected }>Save</button>
                        <button type="button" value="Cancel"  className="btn btn-danger" onClick={()=>{this.handleClose()}} disabled={!this.state.questionData || !this.state.option1 || !this.state.option2 || !this.state.option3 || !this.state.option4  || !this.state.isCheckboxSelected}>Cancel</button>
                    </div>
                    </td></tr>
                    </tbody>
                    </table> 
                               </div>
                   
                    
                </div>
                <div id="qType" style={{display:this.state.typeDropdownValue === "Querey"  ? 'block' :'none'}}>
                    
                        <table id="tblQpage" text-align="center">
                        <tbody>
                            <tr>
                                <td>
                                <textarea className="form-control" ro-ws="5" cols="100" id="txArea"  placeholder="Enter Questions" onChange={(e)=>{this.handleQuestionsqueryData(e)}}/>
                                </td></tr>
                                </tbody></table>
                   
                    <div className="imgUp">
                  
             <span><b>Upload Image:</b></span>
            <label htmlFor="file" className="qtbl">Upload</label>
                <input type="file" name="file" id="file" className="inputfile" onChange={this.handleChange} />
                <img src={this.state.file} className="uploadImg" alt="" />
                </div>
                <div id="divbtn">
                        <button type="button" value="save" className="btn btn-success" onClick={()=>{this.handleSave()}} disabled={!this.state.questionsqueryData }>Save</button>
                        <button type="button" value="Cancel" className="btn btn-danger" onClick={()=>{this.handleClose()}} disabled={!this.state.questionsqueryData}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}
}
export default QuestionsPage; 
