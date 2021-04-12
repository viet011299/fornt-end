import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, TableHead } from '@material-ui/core';
import styled from 'styled-components'
import TablePaginationActions from './TablePaginationActions'
import { Link, useRouteMatch, } from 'react-router-dom';
import buildingApi from '../../api/buildingApi';

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});
function ListBuilding(props) {
  const classes = useStyles2();
  const [page, setPage] = useState(0);
  const [data, setData] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(5);
  let { path, url } = useRouteMatch();
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const fetchData = async () => {
    try {
      const response = await buildingApi.getAll()
      setData(response.data);
      console.log('Fetch building successfully: ', response);
    } catch (error) {
      console.log('Failed to fetch building list: ', error);
    }
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {

    fetchData();
  }, []);
  const handleDelete = async (id) => {
    try {
      const response = await buildingApi.delete(id)
      fetchData();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <StyledHeader>
        <StyledTextHeader>Manager Building</StyledTextHeader>
        <StyledButtonCreate variant="contained" color="primary"> <StyledLink to={`${url}/create`}>Create</StyledLink> </StyledButtonCreate>
      </StyledHeader>

      <StyledTable component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableTextHead align="center" >#</TableTextHead>
              <TableTextHead align="center" >Id Building</TableTextHead>
              <TableTextHead align="center" >Action</TableTextHead>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((row, index) => (
              <TableRow key={index}>
                <TableCell align="center">
                  {page * rowsPerPage + index + 1}
                </TableCell>
                <TableCell align="center">
                  {row.buildingID}
                </TableCell>

                <TableCell align="center">
                  <Button variant="contained" color="inherit" >
                    <StyledLinkView to={`${url}/${row._id}/room`}>View</StyledLinkView>
                  </Button>
                  <Button variant="contained" color="primary" style={{ marginLeft: "10px" }}>
                    <StyledLink to={`${url}/${row._id}`}>Edit</StyledLink>
                  </Button>
                  <Button variant="contained" color="secondary" style={{ marginLeft: "10px" }} onClick={() => handleDelete(row._id)}>
                    Delete
                  </Button>
                </TableCell>

              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, { label: 'All', value: -1 }]}
                colSpan={3}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </StyledTable>
    </>
  )
}

ListBuilding.propTypes = {

}
const StyledTable = styled(TableContainer)`
  margin-top:20px;
`
const TableTextHead = styled(TableCell)`
  font-weight: bold;
  font-size:34px;
`
const StyledHeader = styled.div`
  display:flex;
  align-items: flex-end;
`
const StyledButtonCreate = styled(Button)`
  height:40px;
  background-color: green !important;

`
const StyledTextHeader = styled.h1`
  flex:1;
`
const StyledLink = styled(Link)`
  text-decoration: none;
`
const StyledLinkView = styled(Link)`
  color:black;
  text-decoration: none;
`
export default ListBuilding

