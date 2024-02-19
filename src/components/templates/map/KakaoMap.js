import React, { useEffect, useState } from "react";
import libraryData from "../../../utils/librarySeoul/seoulCurrentLibrary.json";
import axios from "axios";
import styled from "styled-components";
import { Typography } from "@mui/material";

export default function KakaoMap() {
  let MAPKEY = process.env.REACT_APP_KAKAO_JS_API_KEY;

  useEffect(() => {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${MAPKEY}&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      // load 없으면 오류 발생 undefined
      console.log("여기부터시작");
      window.kakao.maps.load(() => {
        console.log("여기부터시작2 로드");
        var container = document.getElementById("map");
        var options = {
          center: new window.kakao.maps.LatLng(
            37.55292879706055,
            126.96941027090685
          ),
          level: 3,
        };

        // map 정의
        var map = new window.kakao.maps.Map(container, options);

        // 현재 위치 찾기
        if (navigator.geolocation) {
          // GeoLocation을 이용해서 접속 위치를 얻어옵니다
          navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude, // 위도
              lon = position.coords.longitude; // 경도

            var locPosition = new window.kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다

            // 마커와 인포윈도우를 표시합니다
            displayMarker(locPosition);
          });
        } else {
          // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

          var locPosition = new window.kakao.maps.LatLng(33.450701, 126.570667),
            message = "geolocation을 사용할수 없어요..";

          displayMarker(locPosition);
        }

        var positions = libraryData.DATA.map((item) => ({
          title: item.lbrry_name,
          webAddress: item.hmpg_url,
          address: item.adres,
          time: item.op_time,
          latlng: new window.kakao.maps.LatLng(item.xcnts, item.ydnts),
        }));

        console.log(positions);

        // 마커 이미지의 이미지 주소입니다
        var imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

        for (var i = 0; i < positions.length; i++) {
          // 마커 이미지의 이미지 크기 입니다
          var imageSize = new window.kakao.maps.Size(24, 35);

          // 마커 이미지를 생성합니다
          var markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize
          );

          // 마커를 생성합니다
          var marker = new window.kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: positions[i].latlng, // 마커를 표시할 위치
            title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image: markerImage, // 마커 이미지
            clickable: true,
          });

          // 마커에 표시할 인포윈도우를 생성합니다
          var infowindow = new window.kakao.maps.InfoWindow({
            // title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            // webAddress: positions[i].webAddress,
            // address: positions[i].address,
            // time: positions[i].time,
            content: `<div className="mapInfo">
            <p className="title">${positions[i].title}</p>
            <p className="time">${positions[i].time}</p>
            </div>`,
          });

          window.kakao.maps.event.addListener(
            marker,
            "mouseover",
            makeOverListener(map, marker, infowindow)
          );
          window.kakao.maps.event.addListener(
            marker,
            "mouseout",
            makeOutListener(infowindow)
          );
          window.kakao.map.event.addListener();
        }

        // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
        function makeOverListener(map, marker, infowindow) {
          return function () {
            infowindow.open(map, marker);
          };
        }

        // 인포윈도우를 닫는 클로저를 만드는 함수입니다
        function makeOutListener(infowindow) {
          return function () {
            infowindow.close();
          };
        }

        // // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
        // var iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        //   iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

        // // 인포윈도우를 생성합니다
        // var infowindow = new window.kakao.maps.InfoWindow({
        //   content: iwContent,
        //   removable: iwRemoveable,
        // });

        // 마커에 클릭이벤트를 등록합니다
        // window.kakao.maps.event.addListener(marker, "click", function () {
        //   // 마커 위에 인포윈도우를 표시합니다
        //   infowindow.open(map, marker);
        // });

        // 지도에 마커와 인포윈도우를 표시하는 함수입니다
        function displayMarker(locPosition) {
          // 마커를 생성합니다
          var marker = new window.kakao.maps.Marker({
            map: map,
            position: locPosition,
          });

          // 지도 중심좌표를 접속위치로 변경합니다
          map.setCenter(locPosition);
        }

        // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
        var zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
      });
    };

    // 로드 될때 바로 실행
    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);
  }, []);

  return (
    <MapContainer>
      <MapView id="map"></MapView>
    </MapContainer>
  );
}

const MapContainer = styled.div``;

const MapView = styled.div`
  width: 100%;
  height: 400px;
  @media (min-width: 481px) {
    max-width: 600px;
    height: 600px;
  }
`;
