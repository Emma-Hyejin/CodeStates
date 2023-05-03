const { USER_DATA } = require('../../db/data');
// JWT는 verifyToken으로 검증할 수 있습니다. 먼저 tokenFunctions에 작성된 여러 메서드들의 역할을 파악하세요.
const { verifyToken, generateToken } = require('../helper/tokenFunctions');

module.exports = async (req, res) => {
  //[2]
  //console.log(req.cookies);
  //req.cookies 객체를 통해 요청에 포함된 크키들을 확인
  // const {access_jwt , refresh_jwt} = req.cookies
  // const access_jwt = req.cookies['access_jwt'];
  // const refresh_jwt = req.cookies['refresh_jwt'];
  // const accessPayload = verifyToken('access', access_jwt);
  //const refreshPayload = verifyToken('refresh', refresh_jwt)
  //verifyToken 함수를 사용해서 access_jwt와 refresh_jwt 검증

  // if(accessPayload){//검증이 제대로 되었다면 
  //   const userInfo = {...USER_DATA.filter((user) => user.id === accessPayload.id)[0]};

  //   //console.log(userInfo.userId);
  //   //검증이 성공하면 토큰의 페이로드에서 사용자의 ID를 추출
  //   //USER_DATA 배열에서 해당 사용자를 찾아 정보를 가져옴
  //   //해당 사용자의 정보를 반환하고 만약 ID가 없을 경우 401 Unauthorizsed 반환
    
  //   if(!userInfo.id){
  //     res.status(401).send('Not Authorized');
  //   }
  //   delete userInfo.password
  //   res.json(userInfo);
  // }
  // else if (refresh_jwt){
  //   //access_jwt 검증이 실패했을 때, refresh_jwt 쿠키를 검증
  //   const refreshPayload = verifyToken('refresh', refresh_jwt) //위로 올려도 될 듯 [자리이동]
  //   if(!refreshPayload){
  //     res.status(401).send('Not Authorized');
  //   }

  //   const userInfo = {...USER_DATA.filter((user) => user.id === refreshPayload.id)[0]};

  //   if(!userInfo.id){
  //     res.status(401).send('Not Authorized');
  //   }

  //   const {accessToken} = generateToken(userInfo);
  //   //이 검증이 성공하면 generateToken 함수를 사용하여 Access Token 생성 

  //   const cookieOptions = {
  //     domain: 'localhost',
  //     path:'/',
  //     httpOnly:true,
  //     sameSite:'none',
  //     secure:true,
  //   }
  //   res.cookie('access_jwt', accessToken, cookieOptions);
  //   return res.redirect('/userInfo');
  //   //이름 access_jwt 쿠키에 저장하고 userinfo로 리다이렉
  // }
  // else{
  //   return res.status(401).send('Not Authorized');
  // }


  //[1]
  const accessToken = req.cookies['access_jwt'];
  const refreshToken = req.cookies['refresh_jwt'];

  const accessPayload = await verifyToken('access', accessToken);

  if(accessPayload){
    const userInfo = {...USER_DATA.filter((user) => user.id === accessPayload.id)[0]}
    if(!userInfo){
      return res.status(401).send('Not Authorized');
    }
    return res.json({...userInfo, password:undefined})
  }
  else if (refreshToken){
    const refreshPayload = await verifyToken('refresh', refreshToken);
    if(!refreshPayload){
      return res.status(401).send('Not Authorized');
    }
    const userInfo = USER_DATA.filter((user) => user.id === refreshPayload.id)[0]
    const {accessToken} = await generateToken(userInfo);

    res.cookie('access_jwt', accessToken, {
      domain:'localhost',
      path:'/',
      sameSite:'none',
      httponly:true,
      secure:true,

    });
    return res.json({...userInfo, password:undefined});
  }
  return res.status(401).send('Not Authorized');

  /*
   * TODO: 토큰 검증 여부에 따라 유저 정보를 전달하는 로직을 구현하세요.
   *
   * Access Token에 대한 검증이 성공하면 복호화된 payload를 이용하여 USER_DATA에서 해당하는 유저를 조회할 수 있습니다.
   * Access Token이 만료되었다면 Refresh Token을 검증해 Access Token을 재발급하여야 합니다.
   * Access Token과 Refresh Token 모두 만료되었다면 상태 코드 401을 보내야합니다.
   */
  
};
