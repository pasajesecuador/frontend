import React from 'react';

export default function cityIcon(props) {
  return(
    <div style={{
      width: props.size || '18px',
      height: props.size || '18px',
      border: props.border ? '1px solid' : 'none',
      borderRadius: props.border ? props.size : 0,
      background: props.border ? props.background : 'transparent',
      }}>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" 
        xmlnsXlink="http://www.w3.org/1999/xlink" width={props.size || '18px'} 
        height={props.size || '18px'} x="0" y="0"  viewBox="0 0 512 512"
        style={{enableBackground:'new 0 0 512 512'}} xmlSpace="preserve" >
          <g>
            <g xmlns="http://www.w3.org/2000/svg">
              <path d="M496,480h-8V328a8,8,0,0,0-4.85-7.35L376,274.72V240h64a40,40,0,0,0,0-80c-.77,0-1.54.02-2.31.07A55.957,55.957,0,0,0,376,
              120.58V24a7.992,7.992,0,0,0-10.2-7.69L202.14,63.07a56,56,0,0,0-96.73-6.14A48,48,0,1,0,96,152h40V480H80V415.12c10.23-2.23,19.55-8.73,
              26.79-18.87C115.31,384.33,120,368.61,120,352s-4.69-32.33-13.21-44.25C97.7,295.01,85.34,288,72,288s-25.7,7.01-34.79,19.75C28.69,319.67,
              24,335.39,24,352s4.69,32.33,13.21,44.25c7.24,10.14,16.56,16.64,26.79,18.87v19.94L43.58,424.84a8.005,8.005,0,0,0-7.16,14.32L64,
              452.94V480H16a8,8,0,0,0,0,16H496a8,8,0,0,0,0-16ZM376,136.81a39.406,39.406,0,0,1,8-.81,40.175,40.175,0,0,1,39.59,34.28,8,8,0,0,0,10.03,
              6.59A24,24,0,1,1,440,224H376ZM72,368a8,8,0,0,0-8,8v22.41C50.38,392.92,40,373.89,40,352c0-26.02,14.65-48,32-48s32,21.98,32,48c0,
              21.89-10.38,40.92-24,46.41V376A8,8,0,0,0,72,368ZM141.8,80.31A8,8,0,0,0,136,88v48H96a32,32,0,1,1,10.58-62.2,8,8,0,0,0,9.77-3.92,
              39.992,39.992,0,0,1,70.04-2.31ZM312,480H200v-8H312Zm-96-24V376h32v80Zm48,0V376h32v80Zm96,24H328V464a8,8,0,0,0-8-8h-8V368a8,8,0,0,
              0-8-8H208a8,8,0,0,0-8,8v88h-8a8,8,0,0,0-8,8v16H152V94.03L360,34.61Zm112-80H408V368h64Zm0-48H400a8,8,0,0,0-8,8v48a8,8,0,0,0,8,
              8h72v64H376V292.13l96,41.15Z" fill={props.color || '#ffffff'}/>
              <path d='M176,264H336a8,8,0,0,0,8-8V208a8,8,0,0,0-8-8H176a8,8,0,0,0-8,8v48A8,8,0,0,0,176,264Zm8-48H328v32H184Z' 
              fill={props.color || '#ffffff'} />
            </g>
          </g>
        </svg>
    </div>
  );
}