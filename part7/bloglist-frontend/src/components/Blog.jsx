import axios from 'axios'
import PropTypes from 'prop-types'
import { useState } from 'react'
import blogService, { deleteFromServer } from '../services/blogs'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const Blog = ({ blog, likeClickHandler, username }) => {
  const [infoVisible, setInfoVisible] = useState(false)
  const queryClient = useQueryClient()
  const deleteBlogMutation = useMutation({
    mutationFn: deleteFromServer,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
  })

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const switchVisible = () => {
    setInfoVisible(!infoVisible)
  }

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${blog.title} by ${blog.author}?`
      )
    )
      deleteBlogMutation.mutate(blog.id)
  }

  const showWhenVisible = { display: infoVisible ? '' : 'none' }

  return (
    <div style={blogStyle} className='Blog' id='blog'>
      <p>
        {blog.title} {blog.author}
      </p>
      <button onClick={switchVisible} id='toggleVisibility'>
        {infoVisible ? 'hide' : 'show'}
      </button>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes}{' '}
          <button onClick={likeClickHandler} id='like'>
            like
          </button>
        </p>
        <p>{blog.user.username}</p>
        {blog.user.username === username && (
          <button onClick={handleDelete} id='delete'>
            delete
          </button>
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeClickHandler: PropTypes.func.isRequired,
}

export default Blog
