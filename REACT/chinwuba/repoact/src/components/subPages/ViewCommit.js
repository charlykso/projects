import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Link } from 'react-router-dom'

const ViewCommit = ({ name }) => {
  return (
    <Link to={`charlykso/${name}`}>
      <VisibilityIcon />
    </Link>
  )
}

export default ViewCommit
