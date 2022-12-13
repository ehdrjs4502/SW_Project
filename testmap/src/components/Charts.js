import React, { useState, useRef, useEffect } from 'react';
import Menu from './Menu';
import ReactApexChart from "react-apexcharts"; 
import ConvertBtn from './ConvertBtn'; 

function Charts() {
    const [year,setYear] = useState("2020년")
    const [data,setData] = useState([""])
    const damageArray = [] // 자연재해 피해량 담을 배열

    console.log("charts 컴포넌트 year, data : ",year,data)

    for(let i = 0; i < data.length; i++) {
        damageArray.push(data[i][year]) // 자연재해 피해량 넣기
    }

    const provinceArray = data.map((x) => { // 시도 구역 넣기
        return x.구분_년도
    })

    // key: 시도, value: 피해량
    const provinceDamageArray = provinceArray.reduce((obj, key, index) => ({ ...obj, [key]: damageArray[index] }), {});

    // 피해량이 큰순으로 내림차순 정렬
    const sortable = Object.entries(provinceDamageArray)
    .sort(([, a], [, b]) => b - a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

   
    const sortProvince = Object.keys(sortable) // 정렬된 시도구역 넣기
    const sortDamage = Object.values(sortable) // 정렬된 피해량 넣기

    // 제일 큰 합계,null 필요 없으니까 지우기
    sortProvince.shift()
    sortDamage.shift()
    sortProvince.shift()
    sortDamage.shift()

    console.log("sortDamage : ", sortDamage)
    console.log("sortProvince : ", sortProvince)

    const chartData = {
        series: [{ // 자연재해 피해량 넣기
            name: "",
            data: sortDamage.map((e) => e == undefined ? 0 : e),    
          }],

        
        options: {
            chart: {
                type: 'bar',
                height: 500
            },

            fill: { // 막대기 색상
                type: 'gradient',
                colors: ['#3366FF'],
                gradient: {
                shade: '#D6E4FF',
                type: "horizontal",
                shadeIntensity: 0.4,
                gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 80, 100],
                colorStops: []
                }
            },

            plotOptions: { // 막대기 스타일
                bar: {
                    borderRadius: 5,
                    horizontal: true
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: { // 카테고리 : 시도 구역 넣기
                categories: sortProvince,
                labels: {
                    formatter: function (value) {
                      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                }
            },

            tooltip: { // 막대기에 마우스 올렸을 때 상세 피해량 보여주기
                y: {
                  formatter: function (value) {
                    return "피해량 : " + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  },
                },
              },
        },
    };

    return(
        <div>
            <div>
                <ConvertBtn />
            </div>
            <Menu callback={(data, year) => {
                setData(data); 
                setYear(year)}}>
            </Menu>
            
            <div>
                <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="bar" 
                    width="1400px"
                    height="450px"
                />
            </div>
        </div>
        
        
    )
}


export default Charts; 