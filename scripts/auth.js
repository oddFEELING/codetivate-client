import axios from 'axios';
import Router from 'next/router';

//--------------------------------------->
//-->  ## LOGIN SCRIPT
//--------------------------------------->
export async function loginScript(fieldData) {
  const CurrentUser = await axios
    .post('https://codetivate-backend.herokuapp.com/_api/user/login', {
      ...fieldData,
    })
    .then((res) => {
      if (res.data.token !== null) {
        localStorage.setItem('UserToken', res.data.token);
        alert('login success');
        Router.replace('/home');
      }

      if (res.data.status === 'bad') {
        alert('failed to login, check credentials');
      }
      return res.data;
    });
  return CurrentUser;
}

//--------------------------------------->
//-->  ## SIGNUP SCRIPT
//--------------------------------------->

export async function signupScript(fieldData) {
  const NewUser = await axios
    .post('https://codetivate-backend.herokuapp.com/_api/user/signup', {
      ...fieldData,
    })
    .then((res) => {
      if (res.data.token !== null) {
        localStorage.setItem('UserToken', res.data.token);
        alert('User Created!');
        Router.replace('/home');
      }

      if (res.data.status === 'bad') {
        alert('Failed to create profile');
      }
      return res.data;
    });
  return NewUser;
}
