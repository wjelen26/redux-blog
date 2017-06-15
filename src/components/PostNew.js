import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'

import { createPost } from '../actions'

const buttonStyle = {
  marginLeft: '10px'
}

class PostNew extends Component {
  renderField(field) {
    const { meta: { touched, error }, label, input } = field
    const className = `form-group ${ touched && error ? 'has-error' : ''}`

    return (
      <div className={className}>
        <label>{label}</label>
        <input
          className="form-control"
          type='text'
          {...input}
        />
        <div className="help-block">
          { touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    })
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Tags"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Content"
          name="content"
          component={this.renderField}
        />
        <button type='submit' className="btn btn-primary">Submit</button>

        <Link to='/' type='submit' style={buttonStyle} className="btn btn-danger">Cancel</Link>

      </form>
    )
  }
}

const validate = (values) => {
  const errors = {}

  if (!values.title) {
    errors.title = "Enter a title"
  }
  if (!values.categories) {
    errors.categories = "Enter some categories"
  }
  if (!values.content) {
    errors.content = "Enter some content"
  }

  return errors
}

export default connect(null, { createPost })(reduxForm({
  validate,
  form: 'PostNewForm'
})(PostNew))
