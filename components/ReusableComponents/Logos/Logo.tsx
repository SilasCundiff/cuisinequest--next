import styled from 'styled-components';

const SVG = styled.svg`
  .a,
  .b {
    fill: none;
    stroke: #10b981;
    stroke-miterlimit: 10;
    stroke-width: 63.33px;
  }
  .a {
    stroke-linecap: square;
  }
  .b {
    stroke-linecap: round;
  }
  .c {
    fill: #10b981;
  }

  max-height: 100%;
`;

const Logo = ({ className = '' }) => {
  return (
    <SVG
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 1601.2 798.3'
    >
      <path
        className='a'
        d='M4368.6,820.4A281.5,281.5,0,0,1,4265.8,628c-14.7-155.5,99.4-293.4,254.8-308.1A282.2,282.2,0,0,1,4682.5,353'
        transform='translate(-4232.9 -287)'
      />
      <circle className='b' cx='340.9' cy='570.1' r='196.6' />
      <path
        className='c'
        d='M4559.1,789.4c-2.7,3.9-.2,10.2,5.5,14.1l63,42.3c4.6,10.1.3,16.5-10.8,16.1l-63-42.3c-5.7-3.9-12.5-3.8-15.2.1s-.1,10.3,5.6,14.2l63,42.3c6.4,11.8,1.4,19.2-12,17.8l-62.9-42.4c-5.8-3.8-12.6-3.7-15.2.2s-.2,10.3,5.6,14.1l62.9,42.4c4.6,10.1.3,16.4-10.8,16L4511.9,882c-5.8-3.8-12.6-3.8-15.2.2s-.2,10.3,5.6,14.1l77.8,52.4c3.8,2.4,8.1,3.4,11.4,2.4l54-15.5,171,114.9c11.5,7.7,25.1,7.5,30.4-.3s.3-20.6-11.2-28.3L4664.7,907l-6-55.8c-.3-3.5-2.9-7.2-6.6-9.7l-77.9-52.3C4568.5,785.3,4561.7,785.4,4559.1,789.4Z'
        transform='translate(-4232.9 -287)'
      />
      <path
        className='c'
        d='M4818.2,729.1q-33.4,0-51.8-22.1t-18.3-66.1V527.7h57.2v116c0,10.4,3,18.7,8.9,24.9s13.9,9.3,23.9,9.3,18.4-3.2,24.7-9.6,9.4-15.1,9.4-26V527.7h57.3v195h-45.2V640.5h3.6c0,19.7-2.5,36.1-7.5,49.3s-12.4,23-22.4,29.5-22.4,9.8-37.4,9.8Z'
        transform='translate(-4232.9 -287)'
      />
      <path
        className='c'
        d='M4965.1,570V527.7h83.3V570Zm48.4-61.5q-16,0-23.7-8.4c-5.1-5.6-7.6-12.6-7.6-21.2s2.5-15.9,7.6-21.5,13-8.3,23.7-8.3,18.6,2.7,23.7,8.3,7.6,12.8,7.6,21.5-2.5,15.6-7.6,21.2S5024.2,508.5,5013.5,508.5Zm-22.4,214.2v-195h57.3v195Z'
        transform='translate(-4232.9 -287)'
      />
      <path
        className='c'
        d='M5175.1,729.1q-41.7,0-65.2-17.3c-15.6-11.5-23.9-27.5-24.9-48.2h50.6c.9,6.2,4.6,11.7,11.2,16.6s16.3,7.3,29.3,7.3c10,0,18.2-1.8,24.8-5.2s9.7-8.4,9.7-14.8-2.5-10.2-7.6-13.7-14-5.7-26.5-6.9l-15.3-1.8q-35.2-3.5-52.9-19.4c-11.7-10.5-17.6-24.2-17.6-41.1,0-13.7,3.5-25.2,10.3-34.5s16.5-16.2,28.7-21,26.1-7.1,41.8-7.1q37.7,0,60.8,16.5c15.5,11.1,23.5,27,24.2,47.9h-50.8c-.8-6.2-4-11.5-9.8-16s-14.2-6.8-25.1-6.8c-8.8,0-15.8,1.7-21,5s-7.8,7.8-7.8,13.5a13.9,13.9,0,0,0,6.7,12.5c4.5,2.8,11.9,4.9,22.1,6l15.3,1.5c23.9,2.6,42.6,9.2,55.9,19.9s19.9,25,19.9,43c0,13.1-3.6,24.4-10.7,34s-17.2,17.1-30.2,22.3S5192.6,729.1,5175.1,729.1Z'
        transform='translate(-4232.9 -287)'
      />
      <path
        className='c'
        d='M5281.8,570V527.7h83.3V570Zm48.4-61.5q-16.1,0-23.7-8.4c-5.1-5.6-7.6-12.6-7.6-21.2s2.5-15.9,7.6-21.5,13-8.3,23.7-8.3,18.6,2.7,23.7,8.3,7.6,12.8,7.6,21.5-2.5,15.6-7.6,21.2S5340.9,508.5,5330.2,508.5Zm-22.4,214.2v-195h57.3v195Z'
        transform='translate(-4232.9 -287)'
      />
      <path
        className='c'
        d='M5417.4,722.7v-195h45.5v83.6h-3.2c0-19.9,2.6-36.5,7.7-49.8s12.8-23.2,23.3-29.9,23.1-10,38.1-10h2.4c22.8,0,40.2,7.5,52.2,22.3s17.9,37.3,17.9,67.4V722.7h-57.2V608.1c0-10.4-3.1-18.9-9.1-25.4s-14.3-9.8-24.7-9.8-19.3,3.3-25.8,9.9-9.8,15.5-9.8,26.4V722.7Z'
        transform='translate(-4232.9 -287)'
      />
      <path
        className='c'
        d='M5739.1,729.8c-16.7,0-31.3-2.8-44-8.5a90.3,90.3,0,0,1-31.8-23.2,100.7,100.7,0,0,1-19.4-32.5,106.3,106.3,0,0,1-6.6-36.8v-7.2a108.1,108.1,0,0,1,6.6-37.5,100.2,100.2,0,0,1,19.2-32.2,90.3,90.3,0,0,1,31.3-22.6c12.5-5.6,26.6-8.4,42.5-8.4q31.4,0,52.9,14.1a94.1,94.1,0,0,1,32.9,36.6,108,108,0,0,1,11.4,49.3v19.2H5661.5V607.8h138l-18.8,15.3c0-11.9-1.6-21.9-4.8-30.1a39.4,39.4,0,0,0-14.6-18.9c-6.5-4.4-14.7-6.6-24.4-6.6s-18.4,2.2-25.2,6.6-12.1,10.9-15.7,19.6-5.3,19.3-5.3,31.8,1.6,21.8,4.9,30.5a42.2,42.2,0,0,0,15.7,20.1c7.1,4.7,16.4,7.1,27.8,7.1s18.9-2,25.6-6.1,11.1-9,13.5-14.9h52.3a81.5,81.5,0,0,1-16.7,34.9,86.9,86.9,0,0,1-31.3,24C5769.9,726.9,5755.4,729.8,5739.1,729.8Z'
        transform='translate(-4232.9 -287)'
      />
      <path
        className='c'
        d='M4970.7,1061.2q-41.2,0-63.9-27.2c-15-18.2-22.6-45.4-22.6-81.7V812.8h70.7V955.9c0,12.8,3.7,23.1,11,30.7S4983,998,4995.3,998s22.7-4,30.5-11.9,11.6-18.5,11.6-32V812.8h70.7v240.5h-55.8V951.9h4.4c0,24.3-3,44.6-9.2,60.8s-15.3,28.4-27.6,36.4-27.7,12.1-46.1,12.1Z'
        transform='translate(-4232.9 -287)'
      />
      <path
        className='c'
        d='M5283.2,1062.1c-20.5,0-38.5-3.5-54.2-10.6a113.8,113.8,0,0,1-39.3-28.5,127.1,127.1,0,0,1-23.9-40.1,131.9,131.9,0,0,1-8.1-45.5v-8.8a134.3,134.3,0,0,1,8.1-46.3,123.3,123.3,0,0,1,23.7-39.7,113.1,113.1,0,0,1,38.6-27.9c15.4-6.8,32.9-10.3,52.5-10.3,25.7,0,47.5,5.8,65.2,17.4a114.7,114.7,0,0,1,40.6,45.2,133.9,133.9,0,0,1,14,60.8v23.7H5187.5v-40h170.3l-23.2,18.9c0-14.6-2-27-5.9-37.1s-10-17.8-18-23.3-18.1-8.1-30.1-8.1-22.7,2.7-31.2,8.1-14.9,13.5-19.3,24.2-6.6,23.8-6.6,39.3,2.1,26.8,6.2,37.5,10.5,19,19.3,24.8,20.2,8.8,34.2,8.8,23.4-2.5,31.6-7.5,13.8-11.1,16.7-18.4H5396a101.7,101.7,0,0,1-20.6,43,105.3,105.3,0,0,1-38.6,29.6Q5313.6,1062.1,5283.2,1062.1Z'
        transform='translate(-4232.9 -287)'
      />
      <path
        className='c'
        d='M5538.3,1061.2q-51.4,0-80.4-21.3t-30.7-59.5h62.3c1.2,7.7,5.8,14.5,13.9,20.4s20.1,9,36.2,9c12.3,0,22.4-2.1,30.5-6.3s12-10.3,12-18.2-3.1-12.7-9.4-16.9-17.2-7.1-32.7-8.6l-18.9-2.2c-28.9-2.9-50.7-10.9-65.1-23.9s-21.8-29.9-21.8-50.7c0-17,4.3-31.2,12.8-42.6s20.2-20,35.3-25.9,32.3-8.8,51.6-8.8q46.5,0,75,20.4c19,13.7,29,33.3,29.9,59.1H5576c-.9-7.6-4.9-14.2-12.1-19.8s-17.5-8.3-30.9-8.3c-10.8,0-19.5,2-25.9,6.1s-9.7,9.7-9.7,16.7,2.8,11.9,8.4,15.4,14.6,6,27.2,7.4l18.9,1.8q44.3,4.8,68.9,24.6c16.4,13.1,24.6,30.9,24.6,53.1,0,16.1-4.4,30.1-13.2,41.9s-21.2,21-37.3,27.4S5559.9,1061.2,5538.3,1061.2Z'
        transform='translate(-4232.9 -287)'
      />
      <path
        className='c'
        d='M5661.6,864.6V812.8h172.5v51.8Zm138.7,192.2q-36.4,0-58.8-9.2a61.4,61.4,0,0,1-32.9-30.5q-10.7-21.3-10.6-57.7l.5-211.6h65.4V962q0,17.1,9,26.1c6,6,14.5,9,25.7,9h35.5v59.7Z'
        transform='translate(-4232.9 -287)'
      />
    </SVG>
  );
};

export default Logo;
