import React from 'react';

export default function passengersIcon(props) {
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
              <path d="M476.747,20.661c-6.711-10.22-17-17.215-28.972-19.695c-11.967-2.479-24.192-0.152-34.411,6.56
              c-10.22,6.711-17.215,17-19.695,28.972l-1.064,5.137c-7.764-22.803-29.375-39.258-54.771-39.258
              c-31.902,0-57.855,25.954-57.855,57.855v8.701c0,16.646,7.076,31.663,18.366,42.227c-4.154,1.615-8.174,3.666-11.988,6.171
              c-14.214,9.334-23.942,23.644-27.406,40.354l-8.159,40.65l-18.75,18.857h-78.055c-17.842,0-32.357,14.516-32.357,32.357
              c0,4.375,0.877,8.547,2.458,12.357h-8.106c-18.792,0-35.227,12.701-39.965,30.888l-11.803,45.298
              c-1.393,5.345,1.811,10.806,7.155,12.198c0.846,0.221,1.693,0.326,2.528,0.326c4.441-0.001,8.498-2.982,9.67-7.481l11.803-45.298
              c2.444-9.38,10.921-15.931,20.612-15.931h146.491c2.67,0,5.229-1.067,7.106-2.965l50.624-51.142
              c3.886-3.925,3.854-10.257-0.071-14.142c-3.926-3.887-10.257-3.854-14.142,0.071l-47.689,48.177H153.987
              c-6.813,0-12.357-5.544-12.357-12.357c0-6.813,5.544-12.357,12.357-12.357h82.214c2.662,0,5.214-1.062,7.091-2.949l57.241-57.57
              c3.895-3.916,3.876-10.248-0.04-14.143c-3.917-3.893-10.248-3.877-14.142,0.041l-10.003,10.061l2.198-10.949
              c2.366-11.419,9.039-21.233,18.788-27.635c9.748-6.401,21.406-8.624,32.82-6.256c11.419,2.366,21.233,9.038,27.634,18.785
              c6.401,9.748,8.623,21.404,6.257,32.823c-0.016,0.075-0.021,0.149-0.035,0.224L338.94,300.595
              c-2.872,13.855-15.227,23.912-29.376,23.912H167.402c-23.447,0-43.087,18.059-45.509,40.99c-0.194,0.455-0.368,0.922-0.496,1.415
              l-30.63,117.561c-1.154,4.431-5.159,7.525-9.738,7.525H57.804c-3.141,0-6.043-1.425-7.963-3.91
              c-1.921-2.484-2.567-5.652-1.776-8.69l16.701-64.101c1.393-5.345-1.812-10.806-7.155-12.198
              c-5.346-1.396-10.806,1.811-12.198,7.155l-16.701,64.101c-2.365,9.078-0.432,18.542,5.305,25.964
              c5.736,7.423,14.407,11.68,23.788,11.68h23.224c13.681,0,25.644-9.246,29.092-22.483l23.196-89.03
              c0.459,0.51,0.926,1.015,1.41,1.509c8.764,8.933,20.932,14.056,33.383,14.056h48.678l-34.199,82.104
              c-1.285,3.086-0.943,6.61,0.911,9.393c1.854,2.781,4.977,4.452,8.32,4.452h154.263c3.344,0,6.466-1.671,8.32-4.452
              c1.854-2.782,2.196-6.307,0.911-9.393l-34.199-82.104h50.129c21.59,0,40.438-15.344,44.818-36.483l21.891-105.633
              c1.121-5.408-2.354-10.7-7.763-11.821c-5.404-1.115-10.7,2.354-11.821,7.763l-21.891,105.634
              c-2.466,11.902-13.079,20.541-25.235,20.541H168.109c-7.115,0-14.079-2.938-19.106-8.063c-4.881-4.975-7.497-11.443-7.368-18.215
              c0.267-13.932,11.826-25.267,25.768-25.267h142.163c23.583,0,44.173-16.761,48.959-39.853l54.729-264.099
              c1.396-6.741,5.335-12.534,11.089-16.313c5.755-3.777,12.637-5.088,19.376-3.692c6.741,1.396,12.534,5.335,16.313,11.089
              c3.778,5.754,5.09,12.636,3.692,19.376l-29.713,143.38c-1.121,5.408,2.354,10.7,7.763,11.821
              c5.406,1.121,10.701-2.354,11.821-7.763l29.713-143.38C485.788,43.101,483.459,30.881,476.747,20.661z M299.448,416.05
              l31.636,75.949H206.817l31.636-75.949H299.448z M337.833,106.787c-20.874,0-37.855-16.982-37.855-37.855v-8.701
              c0-20.874,16.982-37.856,37.855-37.856c20.874,0,37.855,16.982,37.855,37.856v8.701
              C375.689,89.805,358.707,106.787,337.833,106.787z M373.449,134.074c-3.309-4.739-7.174-8.958-11.515-12.565
              c6.146-2.829,11.717-6.696,16.479-11.388L373.449,134.074z" fill={props.color || '#ffffff'}/>
            </g>
          </g>
        </svg>
    </div>
  );
}