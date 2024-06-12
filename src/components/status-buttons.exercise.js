/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import {
  FaCheckCircle,
  FaPlusCircle,
  FaMinusCircle,
  FaBook,
  FaTimesCircle,
} from 'react-icons/fa'
import Tooltip from '@reach/tooltip'

import {useAsync} from 'utils/hooks'
import * as colors from 'styles/colors'
import {CircleButton, Spinner} from './lib'
import {useQuery, useMutation, queryCache} from 'react-query'
import {client} from 'utils/api-client'

function TooltipButton({label, highlight, onClick, icon, ...rest}) {
  const {isLoading, isError, error, run} = useAsync()

  function handleClick() {
    run(onClick())
  }

  return (
    <Tooltip label={isError ? error.message : label}>
      <CircleButton
        css={{
          backgroundColor: 'white',
          ':hover,:focus': {
            color: isLoading
              ? colors.gray80
              : isError
              ? colors.danger
              : highlight,
          },
        }}
        disabled={isLoading}
        onClick={handleClick}
        aria-label={isError ? error.message : label}
        {...rest}
      >
        {isLoading ? <Spinner /> : isError ? <FaTimesCircle /> : icon}
      </CircleButton>
    </Tooltip>
  )
}

function StatusButtons({user, book}) {

  const {data:listItems} = useQuery({
    queryKey: 'list-items',
    queryFn: () =>
      client(`list-items`, {token: user.token}).then(data => data.listItems),
  })

  const listItem = listItems?.find(li => li.bookId === book.id) ?? null


  // - GET: `list-items` - get the user's list items
  // ----- POST: `list-items` with data - create user list items
  // - PUT: `list-items/${listItemId}` with data - update a list item
  // - DELETE: `list-items/${listItemId}` - delete a list item
  // - GET: `books/${bookId}` - get data on a specific book

  const [create] = useMutation(
    ({bookId}) => client('list-items', {data: {bookId}, token: user.token} ),
    {onSettled: () => queryCache.invalidateQueries('list-items')}
  )
  const [update] = useMutation(
    ({id, finishDate}) => client(`list-items/${id}`, { method: 'PUT', data: {id, finishDate}, token: user.token} ),
    {onSettled: () => queryCache.invalidateQueries('list-items')}
  )

  const [remove] = useMutation(
    ({id}) => client(`list-items/${id}`, { method: 'DELETE', token: user.token} ),
    {onSettled: () => queryCache.invalidateQueries('list-items')}
  )

  return (
    <React.Fragment>
      {listItem ? (
        Boolean(listItem.finishDate) ? (
          <TooltipButton
            label="Unmark as read"
            highlight={colors.yellow}
            onClick={() => update({id: listItem.id, finishDate: null})}
            icon={<FaBook />}
          />
        ) : (
          <TooltipButton
            label="Mark as read"
            highlight={colors.green}
            onClick={() => update({id: listItem.id, finishDate: Date.now()})}
            icon={<FaCheckCircle />}
          />
        )
      ) : null}
      {listItem ? (
        <TooltipButton
          label="Remove from list"
          highlight={colors.danger}
          onClick={() => remove({id: listItem.id})}
          icon={<FaMinusCircle />}
        />
      ) : (
        <TooltipButton
          label="Add to list"
          highlight={colors.indigo}
          onClick={() => create({bookId: book.id})}
          icon={<FaPlusCircle />}
        />
      )}
    </React.Fragment>
  )
}

export {StatusButtons}
