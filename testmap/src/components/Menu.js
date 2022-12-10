import React, { useState, useEffect } from 'react';

function Menu(props) {
    const [year,setYear] = useState("2020년")
    const [naturalDisaster, setNaturalDisaster] = useState("태풍")
    const [data,setData] = useState([""])
    const naturalDisasterList = ["태풍","지진","폭우","폭설"]
    const yearList = ['2020년', '2019년', '2018년', '2017년', '2016년', '2015년', '2014년', '2013년',  '2012년']

    useEffect(() => {
        let nd = ""; // naturaldisaster 자연재해 변수
    
        if(naturalDisaster == "태풍") {
            nd ="typhoon"
        } else if(naturalDisaster == "지진") {
            nd = "earthquake"
        } else if(naturalDisaster == "폭우") {
            nd = "heavyrain"
        } else if(naturalDisaster == "폭설") {
            nd = "heavysnow"
        }
        
        fetch("http://localhost:3001/" + nd, { 
            method: "get", //통신방법
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(),
        })
            .then((res) => res.json())
            .then((json) => {
                console.log(json)
                setData(json)
        });
    }, [naturalDisaster])

    useEffect(() => {
        props.callback(data, year)
        console.log("data : ", data)
    }, [data])

    useEffect(() => {
        props.callback(data, year)
        console.log("year : ", year)
    }, [year])

    function onChangeND(event) { // 콤보박스에서 자연재해 선택 이벤트
        setNaturalDisaster(event.target.value) 
    }

    function onChangeYear(event) { // 콤보박스 년도 선택 이벤트
        setYear(event.target.value) 
    }

    return (
        <div>
            <div>
            <select onChange={onChangeND}>
                {naturalDisasterList.map(item =>  (
                    <option key={item} value={item}>{item}</option>
                ))}
            </select>
            <select onChange={onChangeYear}>
                {yearList.map(item =>  (
                    <option key={item} value={item}>{item}</option>
                ))}
            </select>
            <h2>{year} {naturalDisaster} 자연재해 피해</h2>
            </div>
        </div>
    )
}

export default Menu;