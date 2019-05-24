class UpdateStateDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      keyGen:[]
    } 
  }

  render(){ 
    console.log(this.state)
    return (
    <form>
        {
          this.props.Elements.map((item, index)=>{  
            return (
              <input 
                key={item} 
                name='list' 
                type='checkbox' 
                onClick={(e)=>this.updateStateList(e,item)}
                label='Add' 
                className='listTour' />
            ) 
         })  
        }
      <input type="submit" value="Save" />
    </form>
    )
  }

updateStateList(e, value){
console.log(e.target.checked)
if (e.target.checked){
  //append to array
  this.setState({
    keyGen: this.state.keyGen.concat([value])
  })
} else {
  //remove from array
  this.setState({
    keyGen : this.state.keyGen.filter(function(val) {return val!==value})
  })
}
}
}
