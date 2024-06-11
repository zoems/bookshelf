/** @jsx jsx */
import {jsx} from '@emotion/core'

import './bootstrap'
import Tooltip from '@reach/tooltip'
import {FaSearch} from 'react-icons/fa'
import {Input, BookListUL, Spinner} from './components/lib'
import {BookRow} from './components/book-row'
import React from 'react'
import { client } from 'utils/api-client.exercise'
// import * as colors from './styles/colors'
import {useAsync} from 'utils/hooks'



function DiscoverBooksScreen() {
  const [query, setQuery] = React.useState('')
  const [queried, setQueried] = React.useState(false)
  const {data, error, run, isLoading, isError, isSuccess} = useAsync()


  React.useEffect(() => {
    if (!queried) {
      return
    }

    run(client(`books?query=${encodeURIComponent(query)}`))


  },[query, queried, run])



  function handleError() {
    return (
      <div >
        <p>There was an error:</p>
        <p>{error.message}</p>
      </div>
    )
  }

  function handleSearchSubmit(event) {
    event.preventDefault()
    console.log(`find my books! ${event.target.elements.search.value}`)
    setQuery(event.target.elements.search.value)
    setQueried(true)
  }

  return (
    <div
      css={{maxWidth: 800, margin: 'auto', width: '90vw', padding: '40px 0'}}
    >
      <form onSubmit={handleSearchSubmit}>
        <Input
          placeholder="Search books..."
          id="search"
          css={{width: '100%'}}
        />
        <Tooltip label="Search Books">
          <label htmlFor="search">
            <button
              type="submit"
              css={{
                border: '0',
                position: 'relative',
                marginLeft: '-35px',
                background: 'transparent',
              }}
            >
              {isLoading ? <Spinner /> : <FaSearch aria-label="search" />}
            </button>
          </label>
        </Tooltip>
      </form>

      {isError ? handleError() : null}

      {isSuccess ? (
        data?.books?.length ? (
          <BookListUL css={{marginTop: 20}}>
            {data.books.map(book => (
              <li key={book.id} aria-label={book.title}>
                <BookRow key={book.id} book={book} />
              </li>
            ))}
          </BookListUL>
        ) : (
          <p>No books found. Try another search.</p>
        )
      ) : null}

    </div>
  )
}

export {DiscoverBooksScreen}
