import React from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from "react-apexcharts";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {ArrowBack} from '@material-ui/icons'
MeterInfo.propTypes = {

};

function MeterInfo(props) {
  const meterId = props.match.params.id;
  const series = [
    {
      name: "Cases",
      data: [
        555,
        12038,
        69030,
        88369,
        167466,
        932638,
        2055423,
        3343777,
        3845718,
      ],
    },
    {
      name: "Recovered",
      data: [28, 284, 9394, 42710, 76026, 191853, 501538, 1029651, 1255481],
    },
    {
      name: "Deaths",
      data: [17, 259, 1666, 2996, 6472, 49675, 140658, 238619, 269567],
    },
  ];
  const options = {
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "1/22/20",
        "2/1/20",
        "2/15/20",
        "3/1/20",
        "3/15/20",
        "4/1/20",
        "4/15/20",
        "5/1/20",
        "5/7/20",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy",
      },
    },
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        marginTop:'20px'
      }}
    >
      <StyledLink
        to="/meters"
      >
       <ArrowBack style={{marginRight:'10px'}} /> Back
      </StyledLink>
      <h1>Meter {meterId}</h1>
      <br />
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
      />
    </div>
  );
}
const StyledLink = styled(Link)`
  color:#0085FF;
  text-decoration: none;
  text-align: start;
  display: flex;
`
export default MeterInfo;