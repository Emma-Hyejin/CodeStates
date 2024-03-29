const { USER_DATA } = require('../../db/data');

module.exports = (req, res) => {

  const cookieId = req.cookies.cookieId;
  const userInfo = {
    ...USER_DATA.filter((user) => user.id === req.coockies.cookieId)[0],
  };

  //회원가입하자마자 탈퇴한 경우 다시 못 들어오게 하기 위해 처리
  if(!req.cookies.cookieId || !userInfo.id){
    res.status(401).send('Not Authorized');
  } else {
    //pw 와 같은 민감한 정보를 삭제하고 보내줘야 함 
    delete userInfo.password
    res.send(userInfo);
  }
  /*
   * TODO: 쿠키 검증 여부에 따라 유저 정보를 전달하는 로직을 구현하세요.
   *
   * 로그인 시 설정한 쿠키가 존재하는 지 확인해야 합니다.
   * 아직 로그인을 하지 않았다면 쿠키가 존재하지 않을 수 있습니다.
   * 쿠키에 유저의 id가 존재하는지 확인하고 싶다면 콘솔에 req.cookies를 출력해보세요.
   */
};
