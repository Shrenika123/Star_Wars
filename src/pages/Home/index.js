import React,{Component} from 'react';
import logo from './star-wars-logo.png';
import './index.css';
import axios from 'axios'
import Suggestion from '../component/Suggestion/Suggesion';
import { List} from 'semantic-ui-react'
import { trackPromise } from 'react-promise-tracker';
import LoaderSpinner from '../../Helper/LoaderSpinner'


// import { NavLink } from 'react-router-dom';


// eslint-disable-next-line no-debugger


class HomePage extends Component {

  state={
    val:'',
    results:[],
    cursor: 0
  }



  changeHandler=async(e)=>{
    await this.setState({val:e.target.value})

    trackPromise( axios.get('https://swapi.dev/api/people/?search='+this.state.val).then((res)=>this.setState({results:res.data.results})))

     //console.log(this.state.results)

  }

  getId(url){
    const match=url.match(/(\d+)/);
    return match[0];
  }

  handleKeyDown(e) {
    const { cursor,results } = this.state
    console.log(results[cursor])
    const url = results[cursor] && results[cursor].url;
    const id = url ? this.getId(url) : 0;
    if(e.keyCode===13) {
      this.props.history.push('/person/'+id);
    }
    
    // arrow up/down button should select next/previous list element

    if (e.keyCode === 38 && cursor > 0) {
      this.setState( prevState => ({
        cursor: prevState.cursor - 1
      }))
    } 
    else if (e.keyCode === 40 && cursor < results.length - 1) {
      this.setState( prevState => ({
        cursor: prevState.cursor + 1
      }))
    }
  }

  clickHandler=(id,key)=>{
    this.setState({val:key})
    this.props.history.push('/person/'+id)
  }
  render(){
    let listItems = this.state.results.map((data,i) => { 
      const {name, gender, birth_year, url} = data
      const id = this.getId(url);
      return (
        <List.Item key={id}
          onClick={()=>this.clickHandler(id,name)}
          className={this.state.cursor === i ? 'search-input1 active' : 'search-input1'}
        >
          <Suggestion 
            key={data.name} 
            name={name}
            gender={gender}
            birth_year={birth_year}
            data={data} 
          />
        </List.Item>
      );
    })
    return (
      <div>
        <div className="logo">
          <img src={logo} alt="Star Wars Logo" />
        </div>
        <div >
          <div>
            <input className="search-input" onKeyDown={e => this.handleKeyDown(e)} onChange={e => this.changeHandler(e)} placeholder="Search by name" />
            <LoaderSpinner />
          </div>
          <List >{listItems} </List>
        </div>
      </div>
    );
  }
}

export default HomePage;


