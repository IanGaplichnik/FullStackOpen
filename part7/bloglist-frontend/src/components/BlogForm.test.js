import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('BlogForm submit handler receives correct parameters', async () => {
  const blog = {
    title: 'Awesome title',
    author: 'Best author',
    url: 'www.safesturl.com',
  }
  const createBlogMock = jest.fn()

  render(<BlogForm createBlog={createBlogMock} />)

  const user = userEvent.setup()
  const titleInput = screen.getByPlaceholderText('Enter title')
  const authorInput = screen.getByPlaceholderText('Enter author')
  const urlInput = screen.getByPlaceholderText('Enter URL')
  const createButton = screen.getByText('create')

  await user.type(titleInput, blog.title)
  await user.type(authorInput, blog.author)
  await user.type(urlInput, blog.url)
  await user.click(createButton)

  expect(createBlogMock.mock.calls).toHaveLength(1)
  expect(createBlogMock.mock.calls[0][0]).toBe(blog.title)
  expect(createBlogMock.mock.calls[0][1]).toBe(blog.author)
  expect(createBlogMock.mock.calls[0][2]).toBe(blog.url)
})
