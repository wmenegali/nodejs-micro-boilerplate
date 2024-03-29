import buildClient from '../api/build-client';

const IndexPage = ({ currentUser }) => {
  return currentUser ? <h1>You are signed in</h1> : <h1>You are not signed in</h1>;
}

IndexPage.getInitialProps = async context => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');
  return data;
};

export default IndexPage;