module.exports = (req, res) => {
  const cookiesOption = {
    domain:'localhost', 
    path:'/',
    secure:true,
    httpOnly:true,
    //항상 true 둬야 보안으로 document.cookies 해도 안 나옴 
    sameSite:'strict',
  }

  res.clearCoockie('cookieId', cookiesOption).send('complete!')
  /*
   * TODO: 로그아웃 로직을 구현하세요.
   *
   * cookie-parser의 clearCookie('쿠키의 키', cookieOption) 메서드로 해당 키를 가진 쿠키를 삭제할 수 있습니다.
   * 만약 res.clearCookie('user', cookieOption) 코드가 실행된다면 `user=....` 쿠키가 삭제됩니다.
   * 로그아웃 성공에 대한 상태 코드는 205가 되어야합니다.
   */
};
