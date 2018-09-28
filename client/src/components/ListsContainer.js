import React, { Component } from 'react';
import axios from 'axios';
import List from '../List';
import NewListForm from '../NewListForm';


class ListsContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      lists: []
    }
    this.addNewList = this.addNewList.bind(this)
    this.removeList = this.removeList.bind(this)
  }

    addNewList(title, excerpt) {
    axios.post( 'http://localhost:3001/api/v1/lists', { list: {title, excerpt} })
      .then(response => {
                          console.log(response)
                          const lists = [ ...this.state.lists, response.data ]
                          this.setState({lists})
                        })
  .catch(error => {
      console.log(error)
    })
  }

  removeList(id) {
                    axios.delete( 'http://localhost:3001/api/v1/lists/' + id )
                    .then(response => {
                                        const lists = this.state.lists.filter(list => list.id !== id)
                                        this.setState({lists})
                                      })
                    .catch(error => console.log(error))
                  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/lists.json')
      .then(response => {
                          console.log(response)
                          this.setState({ lists: response.data })
                        })
      .catch(error => console.log(error))
  }
  render() {
    return (
      <div className="lists-container">
      <NewListForm onNewList={this.addNewList} />
      { this.state.lists.map( list => { return (<List list={list} key={list.id} onRemoveList={this.removeList} />) }) }

  </div>
  )
  }
}
export default ListsContainer;
