import React, { useState, useEffect } from 'react';

function Menu(props) {
    const [year,setYear] = useState("2020년")
    const [naturalDisaster, setNaturalDisaster] = useState("태풍")
    const [data,setData] = useState([""])
    const naturalDisasterList = ["태풍","지진","폭우","폭설"]
    const [yearList, setYearList] = useState([""])
    // const yearList = ['2020년', '2019년', '2018년', '2017년', '2016년', '2015년', '2014년', '2013년',  '2012년']

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
        
        fetch("http://localhost:3001/" + nd, {  // 자연재해 종류에 따라 url 바꾸기
            method: "get", //통신방법
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(),
        })
            .then((res) => res.json())
            .then((json) => {
                console.log(json[0]) // json[0] = 테이블 컬럼 즉 년도를 가져온당
                const goodYear = json[0].map(x => (x.COLUMN_NAME)) // 객체에서 배열로 변경(컬럼명만 저장)
                goodYear.shift() // 컬럼 구분 년도 삭제
                goodYear.shift() // 컬럼 비고 삭제 
                goodYear.pop() // 컬럼 합계 삭제
                console.log("goodYear : ",goodYear)
                setYear(goodYear[0]) // 기본값을 goodyear 첫번째 요소로 지정
                setYearList(goodYear) // 년도리스트에 넣기
                setData(json[1]) // 자연재해 피해량 넣기
                console.log("data : ", json[1])
        });
    }, [naturalDisaster])

    useEffect(() => {
        props.callback(data, year) // Map 컴포넌트에 자연재해 데이터 전달
        console.log("data : ", data)
    }, [data])

    useEffect(() => {
        props.callback(data, year) // Map 컴포넌트에 년도 전달
        console.log("year : ", year)
    }, [year])

    function onChangeND(event) { // 콤보박스에서 자연재해 선택 이벤트
        setNaturalDisaster(event.target.value) // 선택한 자연재해 종류를 naturaldisaster 변수에 설정해준다.
    }

    function onChangeYear(event) { // 콤보박스 년도 선택 이벤트
        setYear(event.target.value) // 선택한 년도를 year 변수에 설정해준다.
    }

    console.log(yearList)

    return (
        <div>
            <div>
            {/* 자연재해 종류 셀렉트 */}
            <select onChange={onChangeND}> 
                {naturalDisasterList.map(item =>  (
                    <option key={item} value={item}>{item}</option>
                ))}
            </select>

            {/* 년도 셀렉트 */}
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