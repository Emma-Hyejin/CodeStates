const { USER_DATA } = require('../../db/data');

module.exports = (req, res) => {

  const { userId, password } = req.body.loginInfo;
  const { checkedKeepLogin } = req.body;
  const userInfo = {
    ...USER_DATA.filter((user) => user.userId === userId && user.password === password)[0],
    //userData 중에 맞는 회원이 있으면 보내주는 거 
    
  };
//console.log(userInfo)

  const cookiesOption = {
    domain:'localhost', 
    path:'/',
    secure:true,
    httpOnly:true,
    //항상 true 둬야 보안으로 document.cookies 해도 안 나옴 
    sameSite:'strict',
  }

  if(userInfo.id === undefined){
    res.status(401).send('Not Authroized');
  }
  else if (checkedKeepLogin){
    cookiesOption.maxAge = 1000 * 60 * 30
    res.cookie('cookieId', userInfo.id, cookiesOptions)
    //1초 30분 동안 유지되는 쿠키를 만들 겠다. 
    res.send('hello');
    res.redirect('/userInfo')
    //userInfo로 넠어가서 처리하겠다. 
  }
  else{
    res.cookie('cookieId', userInfo.id, cookiesOption)
    //userInfo 정보 넘기고 옵션도 함께 넘겨야 함 
    res.send('hello');
    
  }

  // if(checkedKeepLogin === false){
  //   res.cookie('cookieId', userInfo.id, cookiesOption)
  // }else if (checkedKeepLogin === true){


  //   cookiesOption.expires = new Date(Date.now() + (1000 * 60 * 30))


  // }
  /*
   * TODO: 로그인 로직을 구현하세요.
   *
   * userInfo에는 요청의 바디를 이용해 db에서 조회한 유저정보가 담겨있습니다. 콘솔에서 userInfo를 출력해보세요.
   * 유저의 정보가 출력된다면 해당 유저가 존재하는 것임으로 로그인 성공에 대한 응답을 전송해야 합니다.
   * 만약 undefined가 출력된다면 해당하는 유저가 존재하지 않는 것임으로 로그인 실패에 대한 응답을 전송해야 합니다.
   *
   * 로그인 성공 시에는 클라이언트에 쿠키를 전송해야합니다. 쿠키의 cookieId에는 userInfo.id가 담겨야 합니다.
   * 테스트케이스에서 요구하는 쿠키 옵션을 모두 설정하세요.
   * 영속성있는 쿠키를 보내려면 max-age 또는 expires 옵션을 설정하세요.
   *
   * 클라이언트에게 바로 응답을 보내지않고 서버의 /useinfo로 리다이렉트해야 합니다.
   * express의 res.redirect 메서드를 참고하여 서버의 /userinfo로 리다이렉트 될 수 있도록 구현하세요.
   */
};
