import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchPost, deletePost  } from '../actions'
import spinner from '../../images/spinner.svg'

class PostShow extends Component {

  componentDidMount() {

    const { id } = this.props.match.params

    this.props.fetchPost(id)
  }

  onDeleteClick() {

    const { id } = this.props.match.params

    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { post } = this.props

    if (!post) {
      return (
        <div>
          <img src={spinner} alt="spinner"/>
        </div>
      )
    }

    return (
      <div>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
        <Link  to='/posts' className="btn btn-primary">Go back</Link>
        <Link
          to='/posts'
          className="btn btn-danger"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete props
        </Link>
      </div>
    )
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id]}
}

export default connect(mapStateToProps, { fetchPost, deletePost  })(PostShow)
