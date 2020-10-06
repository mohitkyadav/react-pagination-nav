import React from 'react'
import { create, act } from 'react-test-renderer'
import ReactPaginationNav from './ReactPaginationNav'

const App = ({ page = 1 }) => {
  const [currentPage, setCurrentPage] = React.useState(page)
  return (
    <ReactPaginationNav
      pageCount={6}
      visiblePages={3}
      currentPage={currentPage}
      goToNextPage={() => setCurrentPage(currentPage + 1)}
      goToPreviousPage={() => setCurrentPage(currentPage - 1)}
      goToPage={(newPage) => setCurrentPage(newPage)}
    />
  )
}

const snapMatch = (component) => {
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
}

test('Nav renders and switches between pages', () => {
  let component
  act(() => {
    component = create(<App />)
  })
  const nextBtn = component.root.findByProps({ className: 'react-pagination-nav__next-page react-pagination-nav__button' })
  const prevBtn = component.root.findByProps({ className: 'react-pagination-nav__prev-page react-pagination-nav__button' })
  const otherBtn = component.root.findByProps({ children: 3 })
  snapMatch(component)

  act(() => {
    nextBtn.props.onClick()
  })
  snapMatch(component)

  act(() => {
    prevBtn.props.onClick()
  })
  snapMatch(component)

  act(() => {
    otherBtn.props.onClick()
  })
  snapMatch(component)
})
