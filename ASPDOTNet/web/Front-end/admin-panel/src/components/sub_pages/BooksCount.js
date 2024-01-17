import { getAllBooksUrl } from './BaseUrl'
import useFetch from '../../hooks/useFetch'
import booksImg from '../../images/icons8-books-67.png'

const BooksCount = () => {
  var noBooks = null
  const { data: books, isPending, error } = useFetch(getAllBooksUrl)
  if (books) {
    noBooks = books.length
  }

  return (
    <div>
      {error && <h4 className='text-red-600'>{error}</h4>}
      {isPending ? (
        <h4>Loading ...</h4>
      ) : (
        <div className='flex'>
          <div className='flex'>
            <img src={booksImg} alt='' className='' />
          </div>
          <div className='text-center'>
            <h4 className=''>
              <i>No of Books</i>
            </h4>
            <h4 className='text-6xl'> {noBooks} </h4>
          </div>
        </div>
      )}
    </div>
  )
}

export default BooksCount
