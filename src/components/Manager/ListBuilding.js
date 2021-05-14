import React, { useEffect, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import { Button, IconButton, Tooltip } from "@material-ui/core";
import styled from "styled-components";
import { Link, useRouteMatch } from "react-router-dom";
import buildingApi from "../../api/buildingApi";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Table } from "antd";
import './buildingStyled/listBuilding.css'


function ListBuilding(props) {
  // const [loading,setLoading] = useState(false)
  const [data, setData] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [value, setValue] = useState("")
  const [widthSearch, setWidthSearch] = useState(120);

  let { url } = useRouteMatch();
  const fetchData = async () => {
    try {
      const response = await buildingApi.getAll();
      setData(response.data);
      setDataTable(response.data)
      console.log("Fetch building successfully: ", response);
    } catch (error) {
      console.log("Failed to fetch building list: ", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await buildingApi.getAll();
        setData(response.data);
        setDataTable(response.data)
        console.log("Fetch building successfully: ", response);
      } catch (error) {
        console.log("Failed to fetch building list: ", error);
      }
    };
    fetchData();
  }, []);
  const handleDelete = async (id) => {
    try {
      const response = await buildingApi.delete(id);
      fetchData();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      title: "#",
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: "Building Name",
      dataIndex: "buildingName",
      align: "center",
      sorter: (a, b) => a.buildingName.localeCompare(b.buildingName),
    },
    {
      title: "Number Floor",
      dataIndex: "numberFloor",
      align: "center",
      sorter: (a, b) => a.numberFloor - b.numberFloor,
    },
    {
      title: "Building Info",
      dataIndex: "buildingInfo",
      align: "center",
      sorter: (a, b) => a.buildingInfo.localeCompare(b.buildingInfo),
    },
    {
      title: "Action",
      dataIndex: "age",
      align: "center",
      render: (text, record) => (
        <>
          <Tooltip title="View">
            <StyledLinkView to={`${url}/${record._id}/room`}>
              {" "}
              <IconButton size="small" color="inherit">
                <VisibilityIcon />
              </IconButton>{" "}
            </StyledLinkView>
          </Tooltip>
          <Tooltip title="Edit">
            <StyledLink to={`${url}/${record._id}`}>
              <IconButton size="small" color="primary">
                <EditIcon />
              </IconButton>
            </StyledLink>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              color="secondary"
              onClick={() => handleDelete(record._id)}
            >
              <DeleteIcon />{" "}
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  const onSearch = (e) => {
    if (e !== null && typeof e.buildingName === "string") {
      const inputSearch = e;
      setValue(inputSearch)
      const dataFilter = data.filter((data) => {
        return (
          data.buildingName.toLowerCase().indexOf(inputSearch.buildingName.toLowerCase()) !== -1
        );
      });
      setDataTable(dataFilter)
    }
    else {
      setDataTable(data)
    }
  };
  const onFocusSearchInput = () => {
    setWidthSearch(300)
  }
  const onBlurSearchInput = () => {
    setWidthSearch(120)
  }
  return (
    <>
      <StyledTextHeader>Manager Building</StyledTextHeader>
      <StyledHeader>

        <Autocomplete
          style={{ width: widthSearch }}
          id="free-solo-demo"
          value={value}
          freeSolo
          onBlur={onBlurSearchInput}
          onFocus={onFocusSearchInput}
          onChange={(event, newValue) => {
            onSearch(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            onSearch(newInputValue);
          }}
          options={data}
          getOptionLabel={(option) => option?.buildingName}
          renderOption={(option, { selected }) => (
            <React.Fragment>
              {option?.buildingName}
            </React.Fragment>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search..."
              variant="outlined"
              id="input-with-icon-grid"
              margin="normal"
              size="small"
              onChange={onSearch}
              InputProps={{
                ...params.InputProps,
                endAdornment: <SearchIcon />
              }}
            />
          )}
        />
        <StyledButtonCreate variant="contained" color="primary">
          {" "}
          <StyledLink to={`${url}/create`}>Create</StyledLink>{" "}
        </StyledButtonCreate>
      </StyledHeader>

      <StyledTable component={Paper}>
        <Table key="table" columns={columns} dataSource={dataTable} onChange={onChange}  pagination={{pageSize:5}} >
          
        </Table>
      </StyledTable>
    </>
  );
}

ListBuilding.propTypes = {};
const StyledTable = styled(TableContainer)`
  margin-top: 20px;
`;
const TableTextHead = styled(TableCell)`
  font-weight: bold;
  font-size: 34px;
`;
const StyledHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;
const StyledButtonCreate = styled(Button)`
  height: 40px;
  background-color: green !important;
`;
const StyledTextHeader = styled.h1`
text-align: center;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #FFF;
`;
const StyledLinkView = styled(Link)`
  color: black;
  text-decoration: none;
`;
export default ListBuilding;
