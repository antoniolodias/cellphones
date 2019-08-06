import React from 'react';
import axios from 'axios';
import config from '../config.json';

import './App.scss';

import Header from './Header/Header';
import ResultList from './ResultList/ResultList';
import PhoneDetails from './PhoneDetails/PhoneDetails';

class App extends React.Component {
  // starting state to track Loading/error/currentlist of phones/user search input/selected phone id
  state = {
    isLoading: false,
    isError: false,
    list: [],
    searchValue: "",
    selectedPhone: null
  };

  componentDidMount = () => {
    // fetch phone data when app starts
    this.fetchData();
  };


  // fetch data through async function, usually I would do it through Redux but given the size of the app it isn'T worth the effort
  fetchData = async () => {
    this.setState({isError: false})

    // use try/catch to catch errors on the network request
    try{
      // set isLoading while request is working
      this.setState({isLoading: true})
      const result = await axios(config.URL);
      this.setState({list: result.data, isLoading: false})
    }catch(e) {
      // use state to react to errors on request
      this.setState({isError: true})
    }
    // reset isLoading
    this.setState({isLoading: false})
  };

  handleInputChange = value => {
    // put user search value in state so second components can react to it
    this.setState({searchValue: value})
  };

  // function to get a collection of all different brands from response so we can print necessary buttons to help with search
  listAllBrands = () => {
    const { list } = this.state;
    return [ ...new Set(list.map(each => each.brand))]
  }

  // put seleted phone id on state
  handleOpenDetails = resultId => {
    this.setState({selectedPhone: resultId})
  }

  // find phone inside list through id on state
  selectedPhoneInfo = () => {
    const { selectedPhone, list } = this.state;
    const phoneInfo = list.find(phone => phone.id === selectedPhone);
    return phoneInfo;
  }

  render() {
    const { isLoading, isError, searchValue, list, selectedPhone } = this.state;

    return (
      <div className="App">
        <div className="boards">
          <div className="left-board">
            <Header searchValue={searchValue}
                    handleInputChange={this.handleInputChange}
                    uniqueBrands={this.listAllBrands()}/>
            {/* isLoading answer */}
            {isLoading
              ? <span className="loading">Loading...</span>
              : <ResultList list={list}
                            searchValue={searchValue}
                            handleOpenDetails={this.handleOpenDetails}
                            selectedPhone={selectedPhone}/>
            }
            {/* isError answer */}
            {isError && <span className="error">Something went wrong...</span>}
          </div>
          <div className="right-board">
            {/* print phone details or placeholder if nothing is seleted */}
            {!selectedPhone
              ? <div className="icon-phone"><img src={require('../assets/phone.png')} alt="phone"/></div>
              : <PhoneDetails phone={this.selectedPhoneInfo()} />
            }
          </div>
        </div>
      </div>
    )
  }
}

export default App;
