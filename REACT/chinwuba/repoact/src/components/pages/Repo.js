import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import ViewCommit from '../subPages/ViewCommit'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { useAuthContext } from '../hooks/useAuthContext'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { FilterMatchMode } from 'primereact/api'
import TextField from '@mui/material/TextField'

const Repo = () => {
  const [errMsg, setErrMsg] = useState('')
  const [rows, setRows] = useState([])
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  })
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuthContext()
  let githubUsername = null
  if (!user.profile.githubUsername) {
    window.location.href = '/profile'
  } else {
    githubUsername = user.profile.githubUsername
    // console.log(user.profile.githubUsername)
  }

  const url = `https://api.github.com/users/${githubUsername}/repos`
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setRows(data)
        // console.log(data)
      } catch (error) {
        setErrMsg(error.message)
        setIsLoading(false)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [url])

  const closeErrMsg = () => {
    setErrMsg('')
  }
  const viewCommits = (rows) => {
    return <ViewCommit name={rows.name} />
  }

  return (
    <>
      {isLoading && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      )}
      <Box>
        <Typography variant='h4' color='initial'>
          Repo List
        </Typography>
        {errMsg && (
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
              {errMsg}
            </Typography>
            <button onClick={closeErrMsg}>X</button>
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
        {rows && (
          <DataTable
            value={rows}
            filters={filters}
            paginator
            scrollable
            rows={5}
            rowsPerPageOptions={[5, 10, 15]}
            totalRecords={rows.length}
          >
            <Column field='id' header='Id' sortable />
            <Column field='name' header='Name' sortable />
            <Column field='full_name' header='Full Name' sortable />
            <Column field='description' header='Description' sortable />
            <Column
              body={viewCommits}
              header='View commits'
            />
          </DataTable>
        )}
      </Box>
    </>
  )
}

export default Repo
