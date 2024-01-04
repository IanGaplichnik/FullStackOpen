import { useRef } from 'react'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import BlogListSorted from './BlogListSorted'

const BlogBlock = ({ blogs, setBlogs, user }) => {
  const togglableRef = useRef()

  return (
    <div>
      <Togglable buttonLabel='new blog' ref={togglableRef}>
        <BlogForm
          blogs={blogs}
          setBlogs={setBlogs}
          togglableRef={togglableRef}
        />
      </Togglable>
      <BlogListSorted blogs={blogs} setBlogs={setBlogs} user={user} />
    </div>
  )
}

export default BlogBlock
