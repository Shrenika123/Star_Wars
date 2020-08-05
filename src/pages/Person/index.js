import React,{Component} from 'react';
import './index.css';
import axios from'axios'
import { trackPromise } from 'react-promise-tracker';
import NotFound from '../NotFound/'
import Container from '@material-ui/core/Container'
import LoaderSpinner from '../../Helper/LoaderSpinner'

class Person extends Component
{

 

  state = {
    error: false,
    dispVal: [],
    url: "",
    homeworld: ''
  }

  componentDidMount() {

    trackPromise(axios.get('https://swapi.dev/api/people/' + this.props.match.params.id + '/', {
      'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    }).then(async (res) => await this.setState({ dispVal: res.data }), (error) => {
      this.setState({
        error: true
      })
    }))

    const call1 = () => {
      trackPromise(axios.get('https://cdn.rawgit.com/akabab/starwars-api/0.2.1/api/id/' + this.props.match.params.id + '.json')
        .then(async (res) => await this.setState({ url: res.data.image, homeworld: res.data.homeworld })))

    }

    call1()
  }



  render() {
    const { name, gender, birth_year, hair_color, skin_color, eye_color, mass, height } = this.state.dispVal
    const url = this.state.url
    
    if (this.state.error) {
      return (<div><NotFound /></div>)
    }

   
    return (
      <Container className="container">
        <p style={{ fontSize: "50px", fontFamily: 'Fredericka the Great' }} className="span">{name}</p>
        <div>
          <img src={url} className="img" alt="star-wars" />
          <p>
            <span style={{ color: "white" }} className="span">Gender: {gender}</span>
            <br />
            <span style={{ color: "white" }} className="span">Birth Year: {birth_year}</span>
            <br />
            <span style={{ color: "white" }} className="span">HomeWorld: {this.state.homeworld} </span>
            <br />
            <span style={{ color: "white" }} className="span">Mass: {mass} kg</span>
            <br />
            <span style={{ color: "white" }} className="span">Height: {height} cm</span>
            <br />
            <span style={{ color: "white" }} className="span">Hair Color: {hair_color}</span>
            <br />
            <span style={{ color: "white" }} className="span">Skin Color: {skin_color}</span>
            <br />
            <span style={{ color: "white" }} className="span">Eye Color: {eye_color}</span>
            <br />
          </p>
        </div>
        <LoaderSpinner />
      </Container>
    )
  }

}


export default Person;
