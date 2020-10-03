import React from 'react'

import cn from 'classnames'

import './index.scss'

/** props
 *
 * goToPreviousPage : called when pressing the left arrow button
 * goToNextPage     : called when pressing the right arrow button
 * goToPage         : called when pressing any of the page numbers
 * goToFirstPage    : called when pressing the "Go to first page"
 * goToLastPage     : called when pressing the "Go to last page"
 *
 * visiblePages : odd number of pages you want to be visible, default 5
 * pageCount    : total number of pages
 * currentPage  : current page number
 * isFirstBtnHidden  : If false, display "Go to first page"
 * isLastBtnHidden  : If false, display "Go to last page"
 * 
 * theme : set colors palette
 */
const ReactPaginationNav = ({
  theme = 'dark',
  className, goToPreviousPage, pageCount, currentPage,
  goToPage, goToNextPage, visiblePages = 5,
  isPreviousBtnHidden, isNextBtnHidden,
  goToFirstPage, goToLastPage,
  isFirstBtnHidden, isLastBtnHidden
}) => {
  // in case visiblePages is an even number
  const oddVisiblePages = (parseInt(visiblePages, 10) % 2) === 0
    ? parseInt(visiblePages, 10) + 1
    : parseInt(visiblePages, 10)
  const halfVisiblePages = oddVisiblePages / 2

  return (
    <div className={cn('react-pagination-nav', `react-pagination-nav--${theme}`, className)}>
      {!isFirstBtnHidden && (
        <button
          className="react-pagination-nav__first-page react-pagination-nav__button"
          onClick={() => goToFirstPage && goToFirstPage()}
          title="Go to first page"
          aria-label="Go to first page"
        >
          {'First'}
        </button>
      )}
      {!isPreviousBtnHidden && (
        <button
          className="react-pagination-nav__prev-page react-pagination-nav__button"
          onClick={() => goToPreviousPage()}
          title="Go to previous page"
          aria-label="Go to previous page"
        >
          {'<'}
        </button>
      )}
      <div className="react-pagination-nav__page-list">
        {
          Array(pageCount).fill().map((_, i) => {
            return (
              (
                Math.abs(currentPage - 1 - i) < halfVisiblePages ||
                (currentPage < halfVisiblePages && (i < oddVisiblePages)) ||
                (
                  pageCount - currentPage < halfVisiblePages &&
                  (Math.abs(currentPage - 1 - i) < (oddVisiblePages - (pageCount - currentPage)))
                )
              ) &&
              <button
                key={i}
                className={
                  "react-pagination-nav__page-number react-pagination-nav__button "
                  + (currentPage === i + 1 ? 'react-pagination-nav__button__active' : '')
                }
                onClick={() => goToPage(i + 1)}
              >
                {i + 1}
              </button>
            )
          })
        }
      </div>
      {!isNextBtnHidden && (
        <button
          className="react-pagination-nav__next-page react-pagination-nav__button"
          onClick={() => goToNextPage()}
          title="Go to next page"
          aria-label="Go to next page"
        >
          {'>'}
        </button>
      )}

      {!isLastBtnHidden && (
        <button
          className="react-pagination-nav__last-page react-pagination-nav__button"
          onClick={() => goToLastPage && goToLastPage()}
          title="Go to last page"
          aria-label="Go to last page"
        >
          {'Last'}
        </button>
      )}
    </div>
  )
}

export default ReactPaginationNav
