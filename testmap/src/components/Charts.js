import React, { useState, useRef, useEffect } from 'react';
import Menu from './Menu';
import ReactApexChart from "react-apexcharts"; 
import ConvertBtn from './ConvertBtn'; 

function Charts() {
    const [year,setYear] = useState("2020년")
    const [data,setData] = useState([""])
    const damageArray = []

    console.log("charts 컴포넌트 year, data : ",year,data)

    for(let i = 0; i < data.length; i++) {
        damageArray.push(data[i][year])
    }

    const provinceArray = data.map((x) => {
        return x.구분_년도
    })

    const provinceDamageArray = provinceArray.reduce((obj, key, index) => ({ ...obj, [key]: damageArray[index] }), {});

    const sortable = Object.entries(provinceDamageArray)
    .sort(([, a], [, b]) => b - a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

    // console.log(sortable);

    // console.log("키 : ",Object.keys(sortable))
    // console.log("값 : ",Object.values(sortable))

    const sortProvince = Object.keys(sortable)
    const sortDamage = Object.values(sortable)

    sortProvince.shift()
    sortDamage.shift()

    // console.log(sortProvince)
    // console.log(sortDamage)

    // console.log(sortDamage.map((e) => e == undefined ? 0 : e))

    // console.log(sortDamage.map((e) => e == undefined ? 0 : e).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))

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

            fill: {
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

            plotOptions: {
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

            tooltip: {
                y: {
                  formatter: function (value) {
                    return "피해량 : " + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  },
                },
              },
        },
        
        
    };

    var color = "blue"

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