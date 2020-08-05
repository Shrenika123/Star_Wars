import React,{Component} from 'react';
import logo from './star-wars-logo.png';
import './index.css';
import axios from 'axios'
import Suggestion from '../component/Suggestion/Suggesion';





class HomePage extends Component {

  state={
    results:[],
    cursor: 0
  }



  changeHandler=(e)=>{

   axios.get('https://swapi.dev/api/people/?search='+e.target.value).then((res)=>this.setState({results:res.data.results}))
     //console.log(this.state.results)

  }
  handleKeyDown(e) {
    const { cursor,results } = this.state
    // arrow up/down button should select next/previous list element
    if (e.keyCode === 38 && cursor > 0) {
      this.setState( prevState => ({
        cursor: prevState.cursor - 1
      }))
    } else if (e.keyCode === 40 && cursor < results.length - 1) {
      this.setState( prevState => ({
        cursor: prevState.cursor + 1
      }))
    }
  }
  changeHandler=(e)=>{

    axios.get('https://swapi.dev/api/people/?search='+e.target.value).then((res)=>this.setState({results:res.data.results}))
      //console.log(this.state.results)
 
   }
   handleKeyDown(e) {
     const { cursor,results } = this.state
     // arrow up/down button should select next/previous list element
 
     if (e.keyCode === 13) { // Enter
       // Stop it here
       
       // Do something else...
   }
     if (e.keyCode === 38 && cursor > 0) {
       this.setState( prevState => ({
         cursor: prevState.cursor - 1
       }))
     } else if (e.keyCode === 40 && cursor < results.length - 1) {
       this.setState( prevState => ({
         cursor: prevState.cursor + 1
       }))
     }
   }

  render(){
    let suggestion=  (this.state.results.map((data)=> <Suggestion key={data.name} data1={data}/>))
    console.log(suggestion)
  return (
    <div>
    <div>
      <div className="logo">
        <img src={logo} alt="Star Wars Logo" />
      </div>
      <input className="search-input"  onChange={e=>this.changeHandler(e)} onKeyDown={(e)=>this.handleKeyDown(e)} placeholder="Search by name" />
    </div>
    <div>
      <li>
      {suggestion}
      </li>
    </div>
    </div>
 
  );
  }
}

export default HomePage;


