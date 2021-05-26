import React from 'react'
import PropTypes from 'prop-types'
import { Statistic, Card, Row, Col } from 'antd';
import { Button } from '@material-ui/core';
import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';

function Info({ data, options }) {
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
  const totalP = () => {
    let result = 0
    data.w.forEach(w => {
      result += w.y
    })
    return result
  }

  return (
    <div>
      <Row gutter={18}>
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
              title="Total P in day"
              value={totalP()}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              suffix="W"
            />
          </Card> </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Energy"
              value={data.kWh.length > 0 ? data.kWh[data.kWh.length - 1].y : ""}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              suffix="kWh"
            />
          </Card>
        </Col>
      </Row>
      {/* 
      <Row gutter={18} justify="center  ">
        <Col span={8} >
          <Card style={{ background: "#282c34" }}>
            <GaugeChart
              nrOfLevels={15}
              percent={0.56}
              formatTextValue={value => value+' V'}

            />
          </Card>
        </Col>

        <Col span={8}>
          <Card style={{ background: "#282c34" }}>
            <GaugeChart
              nrOfLevels={15}
              percent={0.56}
              needleColor="#345243"
              formatTextValue={value => value+' A'}
            />
          </Card> </Col>

      </Row>
      <ReactApexChart options={optionsG} series={seriesG} type="radialBar" /> */}
    
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

