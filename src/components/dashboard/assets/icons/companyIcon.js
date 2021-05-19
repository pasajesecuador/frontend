import React from 'react';

export default function companyIcon(props) {
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
          <g transform="matrix(-1,2.4492935982947064e-16,2.4492935982947064e-16,1,511.9999999999999,0)">
            <path xmlns="http://www.w3.org/2000/svg" d="M488.096,167.2l-408.72,4.848c-27.824,0.256-50.512,22.368-51.472,50.176l-2.96,86.016  c-0.464,13.392,10.272,24.496,23.68,24.496h439.68c13.088,0,23.696-10.608,23.696-23.696V190.88  C512,177.728,501.264,167.088,488.096,167.2z" fill={props.color1 || "#aaaaaa"} data-original="#4e99d2"></path>
            <path xmlns="http://www.w3.org/2000/svg" d="M415.008,319.792c0-16.24-13.168-29.408-29.408-29.408s-29.408,13.168-29.408,29.408  c0,4.656,1.088,9.04,3.008,12.944h52.832C413.92,328.832,415.008,324.448,415.008,319.792z" fill={props.color2 || "#2f3235"} data-original="#2f3235"></path>
            <g xmlns="http://www.w3.org/2000/svg">
            	<rect x="194.384" y="281.952" width="73.888" height="50.784" fill={props.color5 || "#000000"} data-original="#44c7f4"></rect>
            	<rect x="273.28" y="281.952" width="73.888" height="50.784" fill={props.color6 || "#000000"} data-original="#44c7f4"></rect>
            	<path d="M11.232,189.408C5.024,189.408,0,194.448,0,200.64v18.8c0,4.144,3.36,7.504,7.504,7.504   s7.504-3.36,7.504-7.504v-19.968h19.008c1.952-3.632,4.32-7.008,7.04-10.048v-0.016L11.232,189.408L11.232,189.408z" fill={props.color3 || "#000000"} data-original="#44c7f4"></path>
            </g>
            <path xmlns="http://www.w3.org/2000/svg" d="M181.52,319.792c0-16.24-13.168-29.408-29.408-29.408s-29.408,13.168-29.408,29.408  c0,4.656,1.088,9.04,3.008,12.944h52.832C180.432,328.832,181.52,324.448,181.52,319.792z" fill={props.color4 || "#2f3235"} data-original="#2f3235"></path>
            <circle xmlns="http://www.w3.org/2000/svg" cx="152.096" cy="319.792" r="25.008" fill={props.color7 || "#3f4347"} data-original="#3f4347"></circle>
            <circle xmlns="http://www.w3.org/2000/svg" cx="152.096" cy="319.792" r="15.12" fill={props.color8 || "#dae5ef"} data-original="#dae5ef"></circle>
            <circle xmlns="http://www.w3.org/2000/svg" cx="385.28" cy="319.792" r="25.008" fill={props.color9 || "#3f4347"} data-original="#3f4347"></circle>
            <circle xmlns="http://www.w3.org/2000/svg" cx="385.28" cy="319.792" r="15.12" fill={props.color10 || "#dae5ef"} data-original="#dae5ef"></circle>
            <rect xmlns="http://www.w3.org/2000/svg" x="494.912" y="281.968" width="17.088" height="25.648" fill={props.color11 || "#e14b4b"} data-original="#e14b4b"></rect>
            <path xmlns="http://www.w3.org/2000/svg" d="M36.08,313.392v-21.424c0-0.992-1.056-1.792-2.368-1.792h-8.144l-0.624,18.064  c-0.08,2.416,0.304,4.72,0.912,6.944h7.856C35.024,315.168,36.08,314.368,36.08,313.392z" fill={props.color12 || "#ffffff"} data-original="#e9eff4"></path>
            <path xmlns="http://www.w3.org/2000/svg" d="M502.032,190.896v43.008H135.904c-8.16,0-16.096,1.856-23.264,5.296  c-7.152,3.456-13.568,8.48-18.672,14.848c-10.192,12.736-25.632,20.144-41.936,20.144H36.08l1.776-51.616
              c0.768-22.528,19.04-40.352,41.6-40.544l60.48-0.72l8.528-0.096l83.152-0.976l8.528-0.096l83.152-0.992l8.528-0.096l83.152-0.976
              l8.528-0.096l64.784-0.768C495.888,177.168,502.032,183.312,502.032,190.896z" fill={props.color13 || "#3f4347"} data-original="#3f4347"></path>
            <path xmlns="http://www.w3.org/2000/svg" d="M502.032,197.84v36.064H135.904c-8.16,0-16.096,1.856-23.264,5.296
              c-7.168,3.456-13.568,8.48-18.672,14.848c-10.208,12.736-25.632,20.144-41.936,20.144h-25.92l-0.544,16h26.464  
              c21.28,0,41.104-9.52,54.416-26.128c3.568-4.448,8-7.968,13.104-10.432c5.056-2.416,10.72-3.712,16.352-3.712H512v-52.08  
              L502.032,197.84L502.032,197.84z" fill={props.color14 || "#000000"} data-original="#44c7f4"></path>
            <path xmlns="http://www.w3.org/2000/svg" d="M0,201.552v17.904c0,4.144,3.36,7.504,7.504,7.504s7.504-3.36,7.504-7.504v-17.904H0z" fill={props.color15 || "#3f4347"} data-original="#3f4347"></path>
            <g xmlns="http://www.w3.org/2000/svg">
            	<polygon points="240.16,180.112 231.632,180.208 220.784,180.336 167.216,233.904 195.248,233.904    249.152,180  " fill={props.color16 || "#5a5f63"} data-original="#5a5f63"></polygon>
            	<path d="M203.2,180.48l-53.44,53.44h-13.92c-8.16,0-16,1.92-23.2,5.28c-0.32,0.16-0.8,0.32-1.12,0.64   l58.88-59.04L203.2,180.48z" fill={props.color17 || "#5a5f63"} data-original="#5a5f63"></path>
            </g>
          </g>
        </svg>
    </div>
  );
}