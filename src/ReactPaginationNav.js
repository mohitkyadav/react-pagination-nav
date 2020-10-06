import React, { memo } from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'

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
 * PrevNextButton : a button component for the prev and next buttons
 * PageButton     : a button component for the page buttons
 * theme : set colors palette
 */
const ReactPaginationNav = ({
  theme = 'dark',
  className, goToPreviousPage, pageCount, currentPage,
  goToPage, goToNextPage, visiblePages = 5,
  isPreviousBtnHidden, isNextBtnHidden,
  goToFirstPage, goToLastPage,
  isFirstBtnHidden, isLastBtnHidden,
  PageButton,
  PrevNextButton, PageButton
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
              ( 
                <React.Fragment>
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
                  <PageButton page={i + 1} active={currentPage === i + 1} onClick={() => goToPage(i + 1)} />
                </React.Fragment>
              )
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

ReactPaginationNav.propTypes = {
  PageButton: PropTypes.element,
  PrevNextButton: PropTypes.element,
  goToPreviousPage: PropTypes.func.isRequired,
  goToNextPage: PropTypes.func.isRequired,
  goToPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  className: PropTypes.string,
  visiblePages: PropTypes.number,
  isPreviousBtnHidden: PropTypes.bool,
  isNextBtnHidden: PropTypes.bool,
  theme: PropTypes.string
}

export default ReactPaginationNav
