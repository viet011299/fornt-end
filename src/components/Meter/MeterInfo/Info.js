import React from 'react'
import PropTypes from 'prop-types'
import { Statistic, Card, Row, Col } from 'antd';
import { Button } from '@material-ui/core';
import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';
import { isEqualsDate, formatDateForDay } from 'helper/helper'

const getTextTime = (range) => {
  if (isEqualsDate(range.startDate, range.endDate)) return formatDateForDay(range.startDate)
  return `${formatDateForDay(range.startDate)} - ${formatDateForDay(range.endDate)}`
}
function Info({ data, options, selectionRange, lastItem }) {
  console.log(lastItem);
  const seriesU = [
    {
      name: "V",
      data: data.u
    }
  ]
  const seriesI = [
    {
      name: "A",
      data: data.i
    }
  ]

  const seriesW = [
    {
      name: "W",
      data: data.w
    }
  ]
  const serieskWh = [
    {
      name: "kHw",
      data: data.kWh
    }
  ]
  const totalE = () => {
    let result = 0
    if(data.kWh.length>0){
      const start = data.kWh[0].y
      const end = data.kWh[data.kWh.length - 1].y
      result = end - start
    }
   
    return result
  }

  return (
    <div>
      <Row gutter={18} justify="center" style={{ margin: "10px 0" }}>
        <Col span={8}>
          <Card>
            <Statistic
              title={`Total Energy ${getTextTime(selectionRange)}`}
              value={totalE()}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              suffix="kWh"
            />
          </Card> </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Energy"
              value={lastItem && lastItem.kWh}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              suffix="kWh"
            />

          </Card>
        </Col>

      </Row>
      { lastItem && isEqualsDate(selectionRange.endDate, new Date())  && isEqualsDate(lastItem.time, new Date()) &&
        <Row gutter={18} justify="center" style={{ margin: "10px 0" }}>
          <Col span={8}>
            <Card>
              <Statistic
                title="P"
                value={data.w.length > 0 ? data.w[data.w.length - 1].y : ""}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                suffix="W"
              />
            </Card> </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="I"
                value={data.i.length > 0 ? data.i[data.i.length - 1].y : ""}
                precision={2}
                valueStyle={{  color: data.i[data.i.length - 1].y>75 ? "#D81418"  : "#3f8600"}}
                suffix="A"
              />
            </Card> </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="U"
                value={data.u.length > 0 ? data.u[data.u.length - 1].y : ""}
                precision={2}
                valueStyle={{ color: data.u[data.u.length - 1].y>242 ||data.u[data.u.length - 1].y<176 ? "#D81418"  : "#3f8600" }}
                suffix="V"
              />
            </Card> </Col>
        </Row>
      }

      <StyledSubHeader>Volt</StyledSubHeader>
      <ReactApexChart
        type="line"
        options={options}
        series={seriesU}
        height={500}
      />
      <StyledSubHeader>Ampe</StyledSubHeader>
      <ReactApexChart
        type="line"
        options={options}
        series={seriesI}
        height={500}
      />
      <StyledSubHeader>P</StyledSubHeader>
      <ReactApexChart
        type="line"
        options={options}
        series={seriesW}
        height={500}
      />
      <StyledSubHeader>Energy</StyledSubHeader>
      <ReactApexChart
        type="line"
        options={options}
        series={serieskWh}
        height={500}
      />
    </div>
  )
}

Info.propTypes = {

}
const StyledSubHeader = styled.h3`
  text-align: center;
  color:#0085FF;
`
export default Info

