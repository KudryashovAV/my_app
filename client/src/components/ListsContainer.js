import React, { Component } from 'react';
import axios from 'axios';
import List from './List';
import NewListForm from './NewListForm';
import EditListForm from './EditListForm';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const FEED_QUERY = gql`
  {
    allLists {
      id
      excerpt
      title
      description
    }
  }
`;

class ListsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { lists: [], editingListId: null }
    this.addNewList = this.addNewList.bind(this)
    this.removeList = this.removeList.bind(this)
    this.editingList = this.editingList.bind(this)
    this.editList = this.editList.bind(this)
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/lists')
    .then(response => {
      console.log(response)
      this.setState({ lists: response.data })
    })
    .catch(error => console.log(error))
  }

  addNewList(title, excerpt) {
    axios.post( 'http://localhost:3001/api/v1/lists', { list: {title, excerpt} })
    .then(response => {
      const lists = [ ...this.state.lists, response.data ]
      this.setState({lists})
    })
    .catch(error => console.log(error))
  }

  removeList(id) {
    axios.delete( 'http://localhost:3001/api/v1/lists/' + id )
    .then(response => {
      const lists = this.state.lists.filter( list => list.id !== id )
      this.setState({lists})
    })
    .catch(error => console.log(error))
  }

  editingList(id) {
    this.setState({ editingListId: id })
  }

  editList(id, title, excerpt) {
    axios.put( 'http://localhost:3001/api/v1/lists/' + id, { list: { title, excerpt } })
    .then(response => {
      const lists = this.state.lists;
      lists[id-1] = {id, title, excerpt}
      this.setState(() => ({ lists, editingListId: null }))
    })
    .catch(error => console.log(error));
  }

  render() {
    return (
      <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>;
          if (error) return <div>Error</div>;

          const listsToRender = data.allLists;

          return (
            <div className="lists-container">
              {listsToRender.map(list => {
                if (this.state.editingListId === list.id) {
                  return (<EditListForm list={list} key={list.id} editList={this.editList}/>)
                } else {
                  return (<List list={list} key={list.id} onRemoveList={this.removeList} editingList={this.editingList} />)
                }
              })}
                <NewListForm onNewList={this.addNewList} />
            </div>
          )
        }}
      </Query>
    )  }
}

export default ListsContainer;
