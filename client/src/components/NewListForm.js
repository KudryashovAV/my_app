import React, { Component } from 'react';
import {Mutation} from "react-apollo";
import gql from 'graphql-tag';

const POST_MUTATION = gql`
  mutation PostMutation($title: String!, $excerpt: String!) {
    createList(title: $title, excerpt: $excerpt) {
      excerpt
      title
    }
  }
`;

class NewListForm extends Component {
  state = { title: '', excerpt: '' };

  render() {
    const { title, excerpt } = this.state;
    return (
      <div>
        <div className="flex flex-column mt3">
          <input value={title} onChange={e => this.setState({ title: e.target.value })} type="text" placeholder="Title..." required />
          <input value={excerpt} onChange={e => this.setState({ excerpt: e.target.value })} type="text" placeholder="Excerpt..." required />
        </div>
          <Mutation mutation={POST_MUTATION} variables={{ title, excerpt }}>
            {postMutation => <button onClick={postMutation}>Add new list</button>}
          </Mutation>
      </div>
    )
  }
}

export default NewListForm;