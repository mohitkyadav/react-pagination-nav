# React Pagination Navbar

![Demo](./demo.gif)

## Usage
```
const MyComponent = () => {
  const [currentPage, setCurrentPage] = React.useState(1)
  
  return (
    <div className="App">
      <ReactPaginationNav
        className="my-pagination-nav-bar-class"
        pageCount={9}
        currentPage={currentPage}
        goToNextPage={() => setCurrentPage(currentPage + 1)}
        goToPreviousPage={() => setCurrentPage(currentPage - 1)}
        goToPage={(newPage) => setCurrentPage(newPage)}
      />
    </div>
  )
}
```

