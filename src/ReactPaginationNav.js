import React from 'react'

import cn from 'classnames'

import './index.scss'

/** props
 *
 * goToPreviousPage : called when pressing the left arrow button
 * goToNextPage     : called when pressing the right arrow button
 * goToPage         : called when pressing any of the page numbers
 *
 * pageCount   : total number of pages
 * currentPage : current page number
 */
const ReactPaginationNav = (props) => {
  return (
    <div className={cn('react-pagination-nav', props.className)}>
      <button
        className="react-pagination-nav__prev-page react-pagination-nav__button"
        onClick={() => props.goToPreviousPage()}
        title="Go to previous page"
        aria-label="Go to previous page"
      >
        {'<'}
      </button>
      <div className="react-pagination-nav__page-list">
        {
          Array(props.pageCount).fill().map((_, i) => {
            return (
              (
                Math.abs(props.currentPage - 1 - i) < 3 ||
                (props.currentPage < 3 && (i < 5)) ||
                (
                  props.pageCount - props.currentPage < 3 &&
                  (Math.abs(props.currentPage - 1 - i) < (5 - (props.pageCount - props.currentPage)))
                )
              ) &&
              <button
                key={i}
                className={
                  "react-pagination-nav__page-number react-pagination-nav__button "
                  + (props.currentPage === i + 1 ? 'react-pagination-nav__button__active' : '')
                }
                onClick={() => props.goToPage(i+1)}
              >
                {i+1}
              </button>
            )
          })
        }
      </div>
      <button
        className="react-pagination-nav__next-page react-pagination-nav__button"
        onClick={() => props.goToNextPage()}
        title="Go to next page"
        aria-label="Go to next page"
      >
        {'>'}
      </button>
    </div>
  )
}

export default ReactPaginationNav
