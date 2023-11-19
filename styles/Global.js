import { createGlobalStyle } from "styled-components";

export const Global = createGlobalStyle`
  .ant-row {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  
  .ant-col:first-child {
    padding-left: 0 !important;
  }

  .ant-col:last-child {
      padding-right: 0 !important;
  }
    
  .slick-slide {
    display: inline-block;
  }
  .ant-card-cover {
    transform: none !important;
  }
`;
