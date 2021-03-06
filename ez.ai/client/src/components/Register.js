import React, { useCallback, useState, useEffect } from "react";
import "./Register.css";
import { useDispatch, useSelector } from "react-redux";
import { SIGN_UP_REQUEST, SIGN_UP_RESET } from "../reducer/user";
import { withRouter } from "react-router-dom";

export const useInput = (initValue) => {
  const [value, setter] = useState(initValue);
  const handler = useCallback((e) => {
    setter(e.target.value);
  }, []);
  const reset = useCallback(() => setter(initValue), [initValue]);
  return [value, handler, reset];
};

const Register = ({ history }) => {
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [userName, onChangeUserName] = useInput("");
  const [nickName, onChangeNickName] = useInput("");
  const [birthday, onChangeBirthday] = useInput("");
  const [profileImage, onChangeprofileImage] = useInput("");
  const dispatch = useDispatch();
  const { isSignedUp, user, signUpErrorReason } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isSignedUp) {
      alert("가입완료. 로그인 페이지로 이동합니다.");
      history.push("/login");
      dispatch({
        type: SIGN_UP_RESET,
      });
    }
  }, [isSignedUp]);
  useEffect(() => {
    if (signUpErrorReason) {
      alert("이미 사용중인 이메일입니다.");
    }
    dispatch({
      type: SIGN_UP_RESET,
    });
  }, [signUpErrorReason, isSignedUp]);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordError(e.target.value !== password);
      setPasswordCheck(e.target.value);
    },
    [password]
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (password !== passwordCheck) {
        return setPasswordError(true);
      }
      return dispatch({
        type: SIGN_UP_REQUEST,
        data: {
          email,
          password,
          userName,
          nickName,
          birthday,
          profileImage,
        },
      });
    },
    [email, password, userName, nickName, birthday, profileImage]
  );

  return (
    <>
      <div className="register">
        <form className="register-form" onSubmit={onSubmit}>
          <div className="register-form__column">
            <p className="register-title">
              <span>Ez.ai</span> 회원가입
            </p>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="이메일"
              onChange={onChangeEmail}
            />
            <br />
            <input
              type="password"
              name="password"
              value={password}
              placeholder="비밀번호"
              onChange={onChangePassword}
            />
            <br />
            <input
              type="password"
              name="passwordCheck"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
              required
              placeholder="비밀번호 확인"
            />
            {passwordError && (
              <div style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</div>
            )}
          </div>

          <div className="register-form__column">
            <p>개인정보</p>
            <input
              type="text"
              name="userName"
              value={userName}
              placeholder="이름"
              onChange={onChangeUserName}
            />
            <br />
            <input
              type="text"
              name="nickName"
              value={nickName}
              placeholder="닉네임"
              onChange={onChangeNickName}
            />
            <br />
            <input
              type="text"
              name="birthday"
              value={birthday}
              placeholder="생년월일"
              onChange={onChangeBirthday}
            />
            <br />
            <br />
            <button className="register-btn" type="submit">
              회원가입하기
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default withRouter(Register);
