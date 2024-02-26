import React, { useEffect, useState } from "react";
import libraryData from "../../../utils/librarySeoul/seoulCurrentLibrary.json";
import axios from "axios";
import styled from "styled-components";
import { Typography } from "@mui/material";
import "../../templates/map/map.css";

export function catchPosition(item) {
  let position = {
    x: item.xcnts,
    y: item.ydnts,
  };
  return position;
}

export default function KakaoMap({ selectedPosition, setSelectedPosition }) {
  let MAPKEY = process.env.REACT_APP_KAKAO_JS_API_KEY;

  useEffect(() => {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${MAPKEY}&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      // load 없으면 오류 발생 undefined
      window.kakao.maps.load(() => {
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

            selectedPosition?.x > 0 ? panTo() : displayMarker(locPosition);
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
          tel: item.tel_no,
          restDate: item.fdrm_close_date,
          time: item.op_time,
          latlng: new window.kakao.maps.LatLng(item.xcnts, item.ydnts),
        }));

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
            content: `<div class="mapInfo">
            <p class="title">${positions[i].title}</p>
            <p class="time">${positions[i].address}</p>
            <p class="time">운영시간 : ${positions[i].time}</p>
            <p class="time">휴무일 : ${positions[i].restDate}</p>
            <p class="time">전화번호 : ${positions[i].tel}</p>
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
        function panTo() {
          const moveLatLon = new window.kakao.maps.LatLng(
            selectedPosition.x,
            selectedPosition.y
          );
          map.panTo(moveLatLon);
        }

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
  }, [selectedPosition]);

  // useEffect(() => {
  //   const onLoadKakaoAPI = () => {
  //     window.kakao.maps.load(() => {
  //       var container = document.getElementById("map");
  //       var options = {
  //         center: new window.kakao.maps.LatLng(
  //           37.55292879706055,
  //           126.96941027090685
  //         ),
  //         level: 3,
  //       };
  //       // map 정의
  //       var map = new window.kakao.maps.Map(container, options);

  //       if (selectedPosition) {
  //         const moveLatLon = new window.kakao.maps.LatLng(
  //           selectedPosition?.y,
  //           selectedPosition?.x
  //         );
  //         map.panTo(moveLatLon);
  //         console.log(selectedPosition);
  //       }
  //     });
  //   };
  //   // 로드 될때 바로 실행
  //   kakaoMapScript.addEventListener("load", onLoadKakaoAPI);
  // }, [selectedPosition]);

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
