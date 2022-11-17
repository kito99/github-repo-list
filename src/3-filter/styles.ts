import {css} from "lit";

export const card = css`
     .card {
          display: block;
          border-radius: 4px;
          background: #fff;
          box-shadow: 0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05);
          transition: .3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12);
          padding: 14px 36px 18px 36px;
          cursor: pointer;
          margin: 5px;
     }
`;
