import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  test("renders title and author, but doesn't render likes and url by default", async () => {
    const blog = {
      title: 'Best blog',
      author: 'Best author',
      url: 'Best url',
      likes: 14,
      user: {
        username: 'user',
      },
    }

    const { container } = render(<Blog blog={blog} />)

    const urlText = screen.queryByText(blog.url)
    const likesText = screen.queryByText(`likes ${blog.likes}`)

    expect(container).toHaveTextContent(blog.title)
    expect(container).toHaveTextContent(blog.author)
    expect(urlText).not.toBeVisible()
    expect(likesText).not.toBeVisible()
  })

  test('url and likes are visible after user click', async () => {
    const blog = {
      title: 'Best blog',
      author: 'Best author',
      url: 'Best url',
      likes: 14,
      user: {
        username: 'user',
      },
    }

    const { container } = render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const urlText = screen.queryByText(blog.url)
    const likesText = screen.queryByText(`likes ${blog.likes}`)

    expect(container).toHaveTextContent(blog.title)
    expect(container).toHaveTextContent(blog.author)
    expect(urlText).toBeVisible()
    expect(likesText).toBeVisible()
  })

  test('clicking like button twice likes blog twice', async () => {
    const blog = {
      title: 'Best blog',
      author: 'Best author',
      url: 'Best url',
      likes: 14,
      user: {
        username: 'user',
      },
    }

    const like = jest.fn()

    const { container } = render(<Blog blog={blog} likeClickHandler={like} />)

    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(like.mock.calls).toHaveLength(2)
  })
})
