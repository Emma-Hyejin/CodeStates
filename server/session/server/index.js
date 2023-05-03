const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const session = require('express-session');
const fs = require('fs');
const https = require('https');
const controllers = require('./controllers');
const app = express();

//mkcert에서 발급한 인증서를 사용하기 위한 코드입니다. 삭제하지 마세요!
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

// TODO: express-session 라이브러리를 이용해 쿠키 설정을 해줄 수 있습니다.
app.use(
  session({
    secret: '@codestates',
    resave: false,
    saveUninitialized: true,
    cookie: {
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      sameSite: 'strict',

      // express-session 미들웨어를 사용하면, 쿠키의 secure 옵션이 true일 경우,
      // Domain이 localhost여도 https 서버를 실행해야 제대로 작동합니다.
      // express-session을 사용하면서 http 서버에서 쿠키를 사용하려면 secure 옵션을 작성하지 않으면 됩니다.
      // (단, 실제 배포 단계에서는 https 서버 사용과 동시에 secure 옵션이 설정되어 있어야 안전합니다.)

      // secure: true,
    },
  })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// TODO: CORS 설정이 필요합니다. 클라이언트가 어떤 origin인지에 따라 달리 설정할 수 있습니다.
const corsOptions = {
  orgin: " http://localhost:3000",
  credentials: true,
  methods:['GET', 'POST', 'OPTION']
}
// 메서드는 GET, POST, OPTIONS를 허용합니다.
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
  })
);

app.post('/login', controllers.login);
app.post('/logout', controllers.logout);
app.get('/userinfo', controllers.userInfo);

// (Optional) https 서버를 실행합니다.
// 아래 코드는 인증서 파일이 존재하지 않는 경우에는 http 서버를, 존재하는 경우에는 https 서버를 실행합니다.
// https 프로토콜을 사용하는 서버를 실행해보고 싶다면, mkcert를 사용해 인증서 파일을 server 폴더 안에 만들어주세요.
let server;
if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
  const privateKey = fs.readFileSync(__dirname + '/key.pem', 'utf8');
  const certificate = fs.readFileSync(__dirname + '/cert.pem', 'utf8');
  const credentials = {
    key: privateKey,
    cert: certificate,
  };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () => console.log(`🚀 HTTPS Server is starting on ${HTTPS_PORT}`));
} else {
  server = app.listen(HTTPS_PORT, () => console.log(`🚀 HTTP Server is starting on ${HTTPS_PORT}`));
}
module.exports = server;
