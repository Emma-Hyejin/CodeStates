import React, { useState } from 'react';
import axios from 'axios';

export default function Login(setIsLogin, setUserInfo) {
  const [loginInfo, setLoginInfo] = useState({
    userId: '',
    password: '',
  });
  const [checkedKeepLogin, setCheckedKeepLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };
  const loginRequestHandler = () => {
    const {userId, password} = loginInfo;
    if( !userId || !password){
      setErrorMessage('아이디와 비밀번호를 입력하세요.');
      return ;
    }else{
      setErrorMessage('');
    }

    return axios
      //loginInfo와 checkedKeepLogin을 다른 곳으로 보내는?
      .post('http://localhost:4000/login', {loginInfo, checkedKeepLogin})
      .then((res) => {
        // 로그인에 성공했다면 응답으로 받은 데이터가 Mypage에 렌더링되도록 State를 변경하세요.
        console.log(res.data);
        setUserInfo(res.data);
        setIsLogin(true)
        setErrorMessage('');

      })
      .catch((err) => {
        //로그인에 실패했다면 그에 대한 에러 핸들링을 구현하세요. 
        setErrorMessage('로그인에 실패했습니다.');
      });

  };

  return (
    <div className='container'>
      <div className='left-box'>
        <span>
          Education
          <p>for the</p>
          Real World
        </span>
      </div>
      <div className='right-box'>
        <h1>AUTH STATES</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className='input-field'>
            <span>ID</span>
            <input type='text' data-testid='id-input' onChange={handleInputValue('userId')} />
            <span>Password</span>
            <input
              type='password'
              data-testid='password-input'
              onChange={handleInputValue('password')}
            />
            <label className='checkbox-container'>
              <input type='checkbox' onChange={() => setCheckedKeepLogin(!checkedKeepLogin)} />
              {' 로그인 상태 유지하기'}
            </label>
          </div>
          <button type='submit' onClick={loginRequestHandler}>
            LOGIN
          </button>
          {errorMessage ? (
            <div id='alert-message' data-testid='alert-message'>
              {errorMessage}
            </div>
          ) : (
            ''
          )}
        </form>
      </div>
    </div>
  );
}
