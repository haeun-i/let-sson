import React, { useState, useContext } from "react";
import styled from "styled-components";
import { CounterContext } from "../../../page/teasign";

const Box = styled.div`
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 3vw;
  margin-top: 30px;
`;

const Text = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
  color: #463ea0;
  font-size: 1em;
`;

const Select = styled.select`
  border: 2px solid #463ea0;
  width: 95%;
  padding-bottom: 3%;
  margin-bottom: 10px;
  color: #463ea0;
`;

const Teasignregion = () => {
  const [city, setCity] = useState("");
  const { dispatch } = useContext(CounterContext);

  const handleChange = (e) => {
    dispatch({ type: "setRegion", region: e.currentTarget.value });
  };

  const Change = (e) => {
    if (e.target.value === "seoul") {
      setCity("seoul");
    } else if (e.target.value === "busan") {
      setCity("busan");
    } else if (e.target.value === "daegu") {
      setCity("daegu");
    } else if (e.target.value === "gwangju") {
      setCity("gwangju");
    } else if (e.target.value === "incheon") {
      setCity("incheon");
    } else if (e.target.value === "daejeon") {
      setCity("daejeon");
    } else if (e.target.value === "ulsan") {
      setCity("ulsan");
    } else if (e.target.value === "gyeonggi") {
      setCity("gyeonggi");
    } else if (e.target.value === "gangwon") {
      setCity("gangwon");
    } else if (e.target.value === "chungnam") {
      setCity("chungnam");
    } else if (e.target.value === "chungbuk") {
      setCity("chungbuk");
    } else if (e.target.value === "jeonnam") {
      setCity("jeonnam");
    } else if (e.target.value === "jeonbuk") {
      setCity("jeonbuk");
    } else if (e.target.value === "gyeongnam") {
      setCity("gyeongnam");
    } else if (e.target.value === "gyeongbuk") {
      setCity("gyeongbuk");
    } else if (e.target.value === "jeju") {
      setCity("jeju");
    }
  };

  return (
    <Box>
      <Text>* 과외 가능한 지역을 선택해주세요</Text>
      <Select onChange={Change}>
        <option>광역시/도</option>
        <option value="seoul">서울</option>
        <option value="busan">부산</option>
        <option value="daegu">대구</option>
        <option value="gwangju">광주</option>
        <option value="incheon">인천</option>
        <option value="daejeon">대전</option>
        <option value="ulsan">울산</option>
        <option value="gyeonggi">경기</option>
        <option value="gangwon">강원</option>
        <option value="chungnam">충남</option>
        <option value="chungbuk">충북</option>
        <option value="jeonnam">전남</option>
        <option value="jeonbuk">전북</option>
        <option value="gyeongnam">경남</option>
        <option value="gyeongbuk">경북</option>
        <option value="jeju">제주</option>
      </Select>

      {city === "" && (
        <div>
          <Select>
            <option>시/군/구</option>
          </Select>
        </div>
      )}

      {city === "seoul" && (
        <div>
          <Select name="city" onChange={handleChange}>
            <option>시/군/구</option>
            <option value="서울시 강남구">강남구</option>
            <option value="서울시 강동구">강동구</option>
            <option value="서울시 강북구">강북구</option>
            <option value="서울시 강서구">강서구</option>
            <option value="서울시 관악구">관악구</option>
            <option value="서울시 광진구">광진구</option>
            <option value="서울시 구로구">구로구</option>
            <option value="서울시 금천구">금천구</option>
            <option value="서울시 노원구">노원구</option>
            <option value="서울시 도봉구">도봉구</option>
            <option value="서울시 동대문구">동대문구</option>
            <option value="서울시 동작구">동작구</option>
            <option value="서울시 마포구">마포구</option>
            <option value="서울시 서대문구">서대문구</option>
            <option value="서울시 서초구">서초구</option>
            <option value="서울시 성동구">성동구</option>
            <option value="서울시 성북구">성북구</option>
            <option value="서울시 송파구">송파구</option>
            <option value="서울시 양천구">양천구</option>
            <option value="서울시 영등포구">영등포구</option>
            <option value="서울시 용산구">용산구</option>
            <option value="서울시 은평구">은평구</option>
            <option value="서울시 종로구">종로구</option>
            <option value="서울시 중구">중구</option>
            <option value="서울시 중랑구">중랑구</option>
          </Select>
        </div>
      )}

      {city === "busan" && (
        <div>
          <Select name="city" onChange={handleChange}>
            <option>시/군/구</option>
            <option value="부산 강서구">강서구</option>
            <option value="부산 금정구">금정구</option>
            <option value="부산 남구">남구</option>
            <option value="부산 동구">동구</option>
            <option value="부산 동래구">동래구</option>
            <option value="부산 부산진구">부산진구</option>
            <option value="부산 북구">북구</option>
            <option value="부산 사상구">사상구</option>
            <option value="부산 사하구">사하구</option>
            <option value="부산 서구">서구</option>
            <option value="부산 수영구">수영구</option>
            <option value="부산 연제구">연제구</option>
            <option value="부산 영도구">영도구</option>
            <option value="부산 중구">중구</option>
            <option value="부산 해운대구">해운대구</option>
            <option value="부산 기장군">기장군</option>
          </Select>
        </div>
      )}

      {city === "daegu" && (
        <div>
          <Select name="city" onChange={handleChange}>
            <option>시/군/구</option>
            <option value="대구 남구">남구</option>
            <option value="대구 달서구">달서구</option>
            <option value="대구 동구">동구</option>
            <option value="대구 북구">북구</option>
            <option value="대구 서구">서구</option>
            <option value="대구 수성구">수성구</option>
            <option value="대구 중구">중구</option>
            <option value="대구 달성군">달성군</option>
          </Select>
        </div>
      )}

      {city === "gwangju" && (
        <div>
          <Select name="city" onChange={handleChange}>
            <option>시/군/구</option>
            <option value="광주 광산구">광산구</option>
            <option value="광주 남구">남구</option>
            <option value="광주 동구">동구</option>
            <option value="광주 북구">북구</option>
            <option value="광주 서구">서구</option>
          </Select>
        </div>
      )}

      {city === "incheon" && (
        <div>
          <Select name="city" onChange={handleChange}>
            <option>시/군/구</option>
            <option value="인천 계양구">계양구</option>
            <option value="인천 남구">남구</option>
            <option value="인천 남동구">남동구</option>
            <option value="인천 동구">동구</option>
            <option value="인천 부평구">부평구</option>
            <option value="인천 서구">서구</option>
            <option value="인천 연수구">연수구</option>
            <option value="인천 중구">중구</option>
            <option value="인천 강화군">강화군</option>
            <option value="인천 옹진군">옹진군</option>
          </Select>
        </div>
      )}

      {city === "daejeon" && (
        <div>
          <Select name="city" onChange={handleChange}>
            <option>시/군/구</option>
            <option value="대전 대덕구">대덕구</option>
            <option value="대전 동구">동구</option>
            <option value="대전 서구">서구</option>
            <option value="대전 유성구">유성구</option>
            <option value="대전 중구">중구</option>
          </Select>
        </div>
      )}

      {city === "ulsan" && (
        <div>
          <Select name="city" onChange={handleChange}>
            <option>시/군/구</option>
            <option value="울산 남구">남구</option>
            <option value="울산 동구">동구</option>
            <option value="울산 북구">북구</option>
            <option value="울산 중구">중구</option>
            <option value="울산 울주군">울주군</option>
          </Select>
        </div>
      )}

      {city === "gyeonggi" && (
        <div>
          <Select name="city" onChange={handleChange}>
            <option>시/군/구</option>
            <option value="고양시 덕양구">고양시 덕양구</option>
            <option value="고양시 일산구">고양시 일산구</option>
            <option value="경기도 과천시">과천시</option>
            <option value="경기도 광명시">광명시</option>
            <option value="경기도 광주시">광주시</option>
            <option value="경기도 구리시">구리시</option>
            <option value="경기도 군포시">군포시</option>
            <option value="경기도 김포시">김포시</option>
            <option value="경기도 남양주시">남양주시</option>
            <option value="경기도 동두천시">동두천시</option>
            <option value="경기도 부천시 소사구">부천시 소사구</option>
            <option value="경기도 부천시 오정구">부천시 오정구</option>
            <option value="경기도 부천시 원미구">부천시 원미구</option>
            <option value="경기도 성남시 분당구">성남시 분당구</option>
            <option value="경기도 성남시 수정구">성남시 수정구</option>
            <option value="경기도 성남시 중원구">성남시 중원구</option>
            <option value="경기도 수원시 권선구">수원시 권선구</option>
            <option value="경기도 수원시 장안구">수원시 장안구</option>
            <option value="경기도 수원시 팔달구">수원시 팔달구</option>
            <option value="경기도 시흥시">시흥시</option>
            <option value="경기도 안산시 단원구">안산시 단원구</option>
            <option value="경기도 안산시 상록구">안산시 상록구</option>
            <option value="경기도 안성시">안성시</option>
            <option value="경기도 안양시 동안구">안양시 동안구</option>
            <option value="경기도 안양시 만안구">안양시 만안구</option>
            <option value="경기도 오산시">오산시</option>
            <option value="경기도 용인시">용인시</option>
            <option value="경기도 의왕시">의왕시</option>
            <option value="경기도 의정부시">의정부시</option>
            <option value="경기도 이천시">이천시</option>
            <option value="경기도 파주시">파주시</option>
            <option value="경기도 평택시">평택시</option>
            <option value="경기도 하남시">하남시</option>
            <option value="경기도 화성시">화성시</option>
            <option value="경기도 가평군">가평군</option>
            <option value="경기도 양주군">양주군</option>
            <option value="경기도 양평군">양평군</option>
            <option value="경기도 여주군">여주군</option>
            <option value="경기도 연천군">연천군</option>
            <option value="경기도 포천군">포천군</option>
          </Select>
        </div>
      )}

      {city === "gangwon" && (
        <div>
          <Select name="city" onChange={handleChange}>
            <option>시/군/구</option>
            <option value="강원도 강릉시">강릉시</option>
            <option value="강원도 동해시">동해시</option>
            <option value="강원도 삼척시">삼척시</option>
            <option value="강원도 속초시">속초시</option>
            <option value="강원도 원주시">원주시</option>
            <option value="강원도 춘천시">춘천시</option>
            <option value="강원도 태백시">태백시</option>
            <option value="강원도 고성군">고성군</option>
            <option value="강원도 양구군">양구군</option>
            <option value="강원도 양양군">양양군</option>
            <option value="강원도 영월군">영월군</option>
            <option value="강원도 인제군">인제군</option>
            <option value="강원도 정선군">정선군</option>
            <option value="강원도 철원군">철원군</option>
            <option value="강원도 평창군">평창군</option>
            <option value="강원도 홍천군">홍천군</option>
            <option value="강원도 화천군">화천군</option>
            <option value="강원도 횡성군">횡성군</option>
          </Select>
        </div>
      )}

      {city === "chungnam" && (
        <div>
          <Select name="city" onChange={handleChange}>
            <option>시/군/구</option>
            <option value="충청남도 공주시">공주시</option>
            <option value="충청남도 논산시">논산시</option>
            <option value="충청남도 보령시">보령시</option>
            <option value="충청남도 서산시">서산시</option>
            <option value="충청남도 아산시">아산시</option>
            <option value="충청남도 천안시">천안시</option>
            <option value="충청남도 금산군">금산군</option>
            <option value="충청남도 당진군">당진군</option>
            <option value="충청남도 부여군">부여군</option>
            <option value="충청남도 서천군">서천군</option>
            <option value="충청남도 연기군">연기군</option>
            <option value="충청남도 예산군">예산군</option>
            <option value="충청남도 청양군">청양군</option>
            <option value="충청남도 태안군">태안군</option>
            <option value="충청남도 홍성군">홍성군</option>
          </Select>
        </div>
      )}

      {city === "chungbuk" && (
        <div>
          <Select name="city" onChange={handleChange}>
            <option>시/군/구</option>
            <option value="충청북도 제천시">제천시</option>,
            <option value="충청북도 청주시 상당구">청주시 상당구</option>
            <option value="충청북도 청주시 흥덕구">청주시 흥덕구</option>
            <option value="충청북도 충주시">충주시</option>
            <option value="충청북도 괴산군">괴산군</option>
            <option value="충청북도 단양군">단양군</option>
            <option value="충청북도 보은군">보은군</option>
            <option value="충청북도 영동군">영동군</option>
            <option value="충청북도 옥천군">옥천군</option>
            <option value="충청북도 음성군">음성군</option>
            <option value="충청북도 진천군">진천군</option>
            <option value="충청북도 청원군">청원군</option>
          </Select>
        </div>
      )}

      {city === "jeonnam" && (
        <div>
          <Select name="city" onChange={handleChange}>
            <option>시/군/구</option>
            <option value="전라남도 광양시">광양시</option>
            <option value="전라남도 나주시">나주시</option>
            <option value="전라남도 목포시">목포시</option>
            <option value="전라남도 순천시">순천시</option>
            <option value="전라남도 여수시">여수시</option>
            <option value="전라남도 강진군">강진군</option>
            <option value="전라남도 고흥군">고흥군</option>
            <option value="전라남도 곡성군">곡성군</option>
            <option value="전라남도 구례군">구례군</option>
            <option value="전라남도 담양군">담양군</option>
            <option value="전라남도 무안군">무안군</option>
            <option value="전라남도 보성군">보성군</option>
            <option value="전라남도 신안군">신안군</option>
            <option value="전라남도 영광군">영광군</option>
            <option value="전라남도 영암군">영암군</option>
            <option value="전라남도 완도군">완도군</option>
            <option value="전라남도 장성군">장성군</option>
            <option value="전라남도 장흥군">장흥군</option>
            <option value="전라남도 진도군">진도군</option>
            <option value="전라남도 함평군">함평군</option>
            <option value="전라남도 해남군">해남군</option>
            <option value="전라남도 화순군">화순군</option>
          </Select>
        </div>
      )}

      {city === "jeonbuk" && (
        <div>
          <Select name="city" onChange={handleChange}>
            <option>시/군/구</option>
            <option value="전라북도 군산시">군산시</option>
            <option value="전라북도 김제시">김제시</option>
            <option value="전라북도 남원시">남원시</option>
            <option value="전라북도 익산시">익산시</option>
            <option value="전라북도 전주시 덕진구">전주시 덕진구</option>
            <option value="전라북도 전주시 완산구">전주시 완산구</option>
            <option value="전라북도 정읍시">정읍시</option>
            <option value="전라북도 고창군">고창군</option>
            <option value="전라북도 무주군">무주군</option>
            <option value="전라북도 부안군">부안군</option>
            <option value="전라북도 순창군">순창군</option>
            <option value="전라북도 완주군">완주군</option>
            <option value="전라북도 임실군">임실군</option>
            <option value="전라북도 장수군">장수군</option>
            <option value="전라북도 진안군">진안군</option>
          </Select>
        </div>
      )}

      {city === "gyeongnam" && (
        <div>
          <Select name="city" onChange={handleChange}>
            <option>시/군/구</option>
            <option value="경상남도 거제시">거제시</option>
            <option value="경상남도 김해시">김해시</option>
            <option value="경상남도 마산시">마산시</option>
            <option value="경상남도 밀양시">밀양시</option>
            <option value="경상남도 사천시">사천시</option>
            <option value="경상남도 양산시">양산시</option>
            <option value="경상남도 진주시">진주시</option>
            <option value="경상남도 진해시">진해시</option>
            <option value="경상남도 창원시">창원시</option>
            <option value="경상남도 통영시">통영시</option>
            <option value="경상남도 거창군">거창군</option>
            <option value="경상남도 고성군">고성군</option>
            <option value="경상남도 남해군">남해군</option>
            <option value="경상남도 산청군">산청군</option>
            <option value="경상남도 의령군">의령군</option>
            <option value="경상남도 창녕군">창녕군</option>
            <option value="경상남도 하동군">하동군</option>
            <option value="경상남도 함안군">함안군</option>
            <option value="경상남도 함양군">함양군</option>
            <option value="경상남도 합천군">합천군</option>
          </Select>
        </div>
      )}

      {city === "gyeongbuk" && (
        <div>
          <Select name="city" onChange={handleChange}>
            <option>시/군/구</option>
            <option value="경상북도 경산시">경산시</option>
            <option value="경상북도 경주시">경주시</option>
            <option value="경상북도 구미시">구미시</option>
            <option value="경상북도 김천시">김천시</option>
            <option value="경상북도 문경시">문경시</option>
            <option value="경상북도 상주시">상주시</option>
            <option value="경상북도 안동시">안동시</option>
            <option value="경상북도 영주시">영주시</option>
            <option value="경상북도 영천시">영천시</option>
            <option value="포항시 남구">포항시 남구</option>
            <option value="포항시 북구">포항시 북구</option>
            <option value="경상북도 고령군">고령군</option>
            <option value="경상북도 군위군">군위군</option>
            <option value="경상북도 봉화군">봉화군</option>
            <option value="경상북도 성주군">성주군</option>
            <option value="경상북도 영덕군">영덕군</option>
            <option value="경상북도 영양군">영양군</option>
            <option value="경상북도 예천군">예천군</option>
            <option value="경상북도 울릉군">울릉군</option>
            <option value="경상북도 울진군">울진군</option>
            <option value="경상북도 의성군">의성군</option>
            <option value="경상북도 청도군">청도군</option>
            <option value="경상북도 청송군">청송군</option>
            <option value="경상북도 칠곡군">칠곡군</option>
          </Select>
        </div>
      )}

      {city === "jeju" && (
        <div>
          <Select name="city" onChange={handleChange}>
            <option>시/군/구</option>
            <option value="제주 서귀포시">서귀포시</option>
            <option value="제주 제주시">제주시</option>
            <option value="제주 남제주군">남제주군</option>
            <option value="제주 북제주군">북제주군</option>
          </Select>
        </div>
      )}
    </Box>
  );
};

export default Teasignregion;
