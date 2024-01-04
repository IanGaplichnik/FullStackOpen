describe('Blog app', function () {
  const user = {
    name: 'Immanuel Kant',
    username: 'important_user',
    password: 'str0ngest_passw0rd!',
  }
  const user2 = {
    name: 'Karl Marx',
    username: 'user_for_everyone',
    password: 'password_for_everyone',
  }

  const blogs = [
    {
      author: 'Andrew Huberman',
      title: 'Using light for health',
      url: 'https://www.hubermanlab.com/newsletter/using-light-for-health',
    },
    {
      author: 'Robert Sapolsky',
      title: 'Doubled-Edged Swords in the Biology of Conflict',
      url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6306482/',
    },
  ]

  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('Valid credentials successfully log in', function () {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()

      cy.contains(`${user.name} logged in`)
    })

    it('Invalid credentials trigger an error', function () {
      cy.get('#username').type('Random_username')
      cy.get('#password').type('Random_password')
      cy.get('#login-button').click()

      cy.get('.failure')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(161, 22, 10)')
        .and('have.css', 'border-style', 'solid')

      cy.contains('Immanuel Kant logged in').should('not.exist')
    })

    describe('when 2 users log in and create blog each', function () {
      beforeEach(function () {
        cy.login({ username: user.username, password: user.password })
        cy.addBlog(blogs[0])
        cy.login({ username: user2.username, password: user2.password })
        cy.addBlog(blogs[1])
      })

      it('user can only delete own blog', function () {
        cy.contains(`${blogs[1].title} ${blogs[1].author}`)
          .parent()
          .as('loggedInUserBlog')
        cy.contains(`${blogs[0].title} ${blogs[0].author}`)
          .parent()
          .as('anotherUserBlog')

        cy.get('@loggedInUserBlog').find('#toggleVisibility').click()
        cy.get('@anotherUserBlog').find('#toggleVisibility').click()

        cy.get('@loggedInUserBlog').find('button').should('contain', 'delete')
        cy.get('@anotherUserBlog')
          .find('button')
          .should('not.contain', 'delete')
      })
    })

    describe('when 1 user logged in', function () {
      beforeEach(function () {
        cy.login({
          username: user.username,
          password: user.password,
        })
      })

      it('user can create blog', function () {
        const blog = blogs[0]

        cy.contains('new blog').click()
        cy.get('#author').type(blog.author)
        cy.get('#title').type(blog.title)
        cy.get('#url').type(blog.url)

        cy.contains('create').click()
        cy.get('.success')
          .should('contain', `${blog.title} by ${blog.author} has been saved!`)
          .and('have.css', 'color', 'rgb(46, 92, 14)')
          .and('have.css', 'border-style', 'solid')
        cy.contains(`${blog.title} ${blog.author}`)
      })

      describe('when multiple blogs exist', function () {
        beforeEach(function () {
          for (const blog in blogs) {
            console.log(blogs[blog])
            cy.addBlog(blogs[blog])
          }
        })

        it('blog can be liked', function () {
          cy.contains(`${blogs[1].title} ${blogs[1].author}`)
            .parent()
            .as('blogToLike')
          cy.contains(`${blogs[0].title} ${blogs[0].author}`)
            .parent()
            .as('blogNotToLike')

          cy.get('@blogToLike').find('#toggleVisibility').click()
          cy.get('@blogToLike').should('contain', 'likes 0')
          cy.get('@blogToLike').find('#like').click()
          cy.get('@blogToLike').should('contain', 'likes 1')

          cy.get('@blogNotToLike').find('#toggleVisibility').click()
          cy.get('@blogNotToLike').should('contain', 'likes 0')
        })

        it('blog can be deleted', function () {
          cy.contains(`${blogs[1].title} ${blogs[1].author}`).as('blogToDelete')
          cy.contains(`${blogs[0].title} ${blogs[0].author}`).as('blogToKeep')

          cy.get('@blogToDelete').parent().find('#toggleVisibility').click()
          cy.get('@blogToDelete').parent().find('#delete').click()
          cy.get('@blogToDelete').should('not.exist')

          cy.get('@blogToKeep')
        })

        it.only('blogs are displayed in descending likes order', function () {
          cy.contains(`${blogs[1].title} ${blogs[1].author}`)
            .parent()
            .as('blogToHave3Likes')
          cy.contains(`${blogs[0].title} ${blogs[0].author}`)
            .parent()
            .as('blogToHave1Like')

          cy.get('@blogToHave3Likes').find('#toggleVisibility').click()
          cy.get('@blogToHave3Likes').should('contain', 'likes 0')
          cy.get('@blogToHave3Likes').find('#like').click()
          cy.wait(500)
          cy.get('@blogToHave3Likes').find('#like').click()
          cy.wait(500)
          cy.get('@blogToHave3Likes').find('#like').click()
          cy.wait(500)
          cy.get('@blogToHave3Likes').should('contain', 'likes 3')

          cy.get('@blogToHave1Like').find('#toggleVisibility').click()
          cy.get('@blogToHave1Like').find('#like').click()
          cy.get('@blogToHave1Like').should('contain', 'likes 1')

          cy.get('.Blog')
            .eq(0)
            .should('contain', `${blogs[1].title} ${blogs[1].author}`)
          cy.get('.Blog')
            .eq(1)
            .should('contain', `${blogs[0].title} ${blogs[0].author}`)
        })
      })
    })
  })
})
