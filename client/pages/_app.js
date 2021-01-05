import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
      <div>
          <Header currentUser={currentUser} />
          <Component {...pageProps} />
      </div>
    );
};

AppComponent.getInitialProps = async appContext => {
  const { ctx } = appContext;
  const client = buildClient(ctx);
  const { data } = await client.get('/api/users/currentuser');
  
  if (!appContext.Component.getInitialProps) {
    return { pageProps: {}, ...data };
  }

  const pageProps = await appContext.Component.getInitialProps(ctx);
  return { pageProps, ...data };
};

export default AppComponent;