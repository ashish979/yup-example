import * as yup from 'yup';

export default yup.object().shape({
  name: yup.string().required("name is required!").min(2, "Must be at least 2 chars."),
  username: yup.string().required("username is required").test("username_exists", 'The username is already taken', async (value) => {
    const response = await fetch(`https://mb71r4j683.execute-api.ap-northeast-1.amazonaws.com/test/usernames?lookup=${value}`, { headers: { 'x-token': 'xxx' }});
    const parsedResponse = await response.json();
    return parsedResponse.usernames.length === 0
  }),
  email: yup.string().email("Email doesn't look right.").required("Please provide your email"),
  password: yup.string().required("Password is required.").matches(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/, "Password must be strong! It must contain at least one upper case letter, one lower case letter and one number, e.g `Open1234`"),
  passwordConfirm: yup.string().required("Please confirm your password").oneOf([yup.ref('password'), null], 'Passwords do not match')
});
