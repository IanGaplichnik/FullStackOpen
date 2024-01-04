import Blog from './Blog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { likeBlog } from '../services/blogs'

const BlogListSorted = ({ blogs, setBlogs, user }) => {
  const queryClient = useQueryClient()
  const likeBlogMutation = useMutation({
    mutationFn: likeBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const handleLikeBlog = async (blog) => {
    const { id, ...blogWithLike } = blog
    blogWithLike.likes += 1
    blogWithLike.user = blog.user.id

    likeBlogMutation.mutate({ objectId: id, newObject: blogWithLike })
    let objectId = 0
  }

  const sortedBlogList = () =>
    blogs
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          likeClickHandler={() => handleLikeBlog(blog)}
          username={user.username}
        />
      ))

  return sortedBlogList()
}

export default BlogListSorted
