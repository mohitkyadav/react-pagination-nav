import React, { memo } from 'react'

import cn from 'classnames'

import './index.scss'

/** props
 *
 * goToPreviousPage : called when pressing the left arrow button
 * goToNextPage     : called when pressing the right arrow button
 * goToPage         : called when pressing any of the page numbers
 *
 * visiblePages : odd number of pages you want to be visible, default 5
 * pageCount    : total number of pages
 * currentPage  : current page number
 *
 * PrevNextButton : a button component for the prev and next buttons
 * PageButton     : a button component for the page buttons
 */
const ReactPaginationNav = ({
  className, goToPreviousPage, pageCount, currentPage,
  goToPage, goToNextPage, visiblePages = 5,
  isPreviousBtnHidden, isNextBtnHidden,
  PrevNextButton, PageButton
}) => {
  // in case visiblePages is an even number
  const oddVisiblePages = (parseInt(visiblePages, 10) % 2) === 0
    ? parseInt(visiblePages, 10) + 1
    : parseInt(visiblePages, 10)
  const halfVisiblePages = oddVisiblePages / 2

  return (
    <div className={cn('react-pagination-nav', className)}>
      {!isPreviousBtnHidden && <PrevNextButton direction='prev' onClick={goToPreviousPage} />}
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
              <PageButton page={i + 1} active={currentPage === i + 1} onClick={() => goToPage(i + 1)} />
            )
          })
        }
      </div>
      {!isNextBtnHidden && <PrevNextButton direction='next' onClick={goToNextPage} />}
    </div>
  )
}

const DefaultPrevNextButton = memo(({ direction, onClick }) => {
  return <button
    className={`react-pagination-nav__${direction}-page react-pagination-nav__button`}
    onClick={onClick}
    title={`Go to ${direction} page`}
    aria-label={`Go to ${direction} page`}
  >
    {direction === 'prev' ? '<' : '>'}
  </button>
})

const DefaultPageButton = memo(({ page, active, onClick }) => {
  return <button
    key={page}
    className={cn(
      "react-pagination-nav__page-number react-pagination-nav__button",
      ((active) && 'react-pagination-nav__button__active')
    )}
    onClick={onClick}
  >
    {page}
  </button>
})

ReactPaginationNav.defaultProps = {
  PrevNextButton: DefaultPrevNextButton,
  PageButton: DefaultPageButton
}

export default ReactPaginationNav
