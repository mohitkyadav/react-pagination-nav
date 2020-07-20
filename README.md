# React Pagination Navbar

![npm](https://img.shields.io/npm/v/react-pagination-nav?style=for-the-badge)
![node-current](https://img.shields.io/node/v/react-pagination-nav?style=for-the-badge)
![npm](https://img.shields.io/npm/dt/react-pagination-nav?style=for-the-badge)
![NPM](https://img.shields.io/npm/l/react-pagination-nav?style=for-the-badge)

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

## Author

[![GH](https://img.shields.io/badge/github-mohit_kumar_yadav-34bf49?logo=github&style=for-the-badge)](https://github.com/mohitkyadav)

[![Discord](https://img.shields.io/discord/522610943037931551?color=7389D8&logo=discord&style=for-the-badge)](https://discord.gg/bJGQRJx)
