import styled from "styled-components";
export default function Home() {

  return (
    <StyledHome >
      <h1>Theo dõi lượng điện tiêu thụ trong các phòng học sử dụng công tơ điện tử</h1>
      <h3>Người thực hiện:</h3>
      <p>Hà Xuân Việt</p>
      <h3>Người hướng dẫn: </h3>
      <p> Thầy Nguyễn Hoài Sơn</p>
      <p>  Anh Ngô Minh Hoàng</p>
    </StyledHome>
  );
}
const StyledHome = styled.div`
    text-align:center;
`


