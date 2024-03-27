import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// import Paper from '@mui/material/Paper'
// import Table from '@mui/material/Table'
// import TableBody from '@mui/material/TableBody'
// import TableCell from '@mui/material/TableCell'
// import TableContainer from '@mui/material/TableContainer'
// import TableHead from '@mui/material/TableHead'
// import TablePagination from '@mui/material/TablePagination'
// import TableRow from '@mui/material/TableRow'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { Box, Typography } from '@mui/material'
import { useAuthContext } from '../hooks/useAuthContext'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { FilterMatchMode } from 'primereact/api'
import TextField from '@mui/material/TextField'
import formatDateTimeSimple from '../../helpers/FormatDateTime'

const ListCommit = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { name } = useParams()
  const { user } = useAuthContext()
  let getAuthorName, getAuthorEmail, getCommitDate
  let githubUsername = ''
  if (user && user.profile) {
    githubUsername = user.profile.githubUsername
  }
  const url = `https://api.github.com/repos/${githubUsername}/${name}/commits`
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  })

  useEffect(() => {
    const getCommits = async () => {
      setIsLoading(true)

      try {
        const res = await fetch(url)
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        const d = await res.json()
        setData(d)
      } catch (error) {
        setError(error.message)
        setIsLoading(false)
      }
      setIsLoading(false)
    }
    getCommits()
  }, [url])

  // console.log(data)

  // const [page, setPage] = useState(0)
  // const [rowsPerPage, setRowsPerPage] = useState(10)

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage)
  // }

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value)
  //   setPage(0)
  // }
  const closeErrMsg = () => {
    setError('')
  }
  if (data) {
    // console.log(data)
    getAuthorName = (data) => {
      return data.commit.author.name
    }
    getAuthorEmail = (data) => {
      return data.commit.author.email
    }
    getCommitDate = (data) => {
      const date = formatDateTimeSimple(new Date(data.commit.committer.date))
      return date
    }
  }
  return (
    <div>
      {isLoading && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      )}
      {error && (
        <Box
          sx={{
            backgroundColor: '#f00',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px',
          }}
        >
          <Typography variant='h6' sx={{ color: '#fff' }}>
            {error}
          </Typography>
          <button onClick={closeErrMsg} className='text-white'>X</button>
        </Box>
      )}
      <Box
        component='form'
        sx={{
          '& > :not(style)': { width: '100%', mt: 1, mb: 1 },
        }}
        noValidate
        autoComplete='off'
        onInput={(e) =>
          setFilters({
            global: {
              value: e.target.value,
              matchMode: FilterMatchMode.CONTAINS,
            },
          })
        }
      >
        <TextField id='outlined-basic' label='Search' variant='outlined' />
      </Box>
      {/* <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <TableCell>S/N</TableCell>
                <TableCell>SHA</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow key={row.node_id}>
                      <TableCell key={row.id}>{index + 1}</TableCell>
                      <TableCell key={row.sha}>{row.sha}</TableCell>
                      <TableCell key={row.commit.author.name}>
                        {row.commit.author.name}
                      </TableCell>
                      <TableCell key={row.commit.author.email}>
                        {row.commit.author.email}
                      </TableCell>
                      <TableCell key={row.commit.author.date}>
                        {row.commit.author.date}
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper> */}
      {data && (
        <DataTable
          value={data}
          filters={filters}
          paginator
          scrollable
          rows={5}
          rowsPerPageOptions={[5, 10, 15]}
          totalRecords={data.length}
        >
          <Column field='sha' header='SHA' sortable />
          <Column body={getAuthorName} header='Author' sortable />
          <Column body={getAuthorEmail} header='Email' sortable />
          <Column body={getCommitDate} header='Date' sortable />
        </DataTable>
      )}
    </div>
  )
}

export default ListCommit
