import axios from 'axios';

//--------------------------------------->
//-->  ## LOGIN SCRIPT
//--------------------------------------->
export async function loginScript(fieldData) {
  const CurrentUser = await axios
    .post('https://codetivate-backend.herokuapp.com/_api/user/login', {
      ...fieldData,
    })
    .then((res) => {
      console.log(res.data);

      if (res.data.token !== null) {
        localStorage.setItem('UserToken', res.data.token);
      }

      if (res.data.status === 'bad') {
        alert('failed to login, check credentials');
      }
      return CurrentUser;
    });
}

//--------------------------------------->
//-->  ## SIGNUP SCRIPT
//--------------------------------------->

export async function signupScript(fieldData) {
  const newUser = await axios
    .post('https://codetivate-backend.herokuapp.com/_api/user/signup', {
      ...fieldData,
    })
    .then((res) => {
      console.log(res.data);

      if (res.data.token !== null) {
        localStorage.setItem('UserToken', res.data.token);
      }

      if (res.data.status === 'bad') {
        alert('Failed to create profile');
      }
      return newUser;
    });
}
