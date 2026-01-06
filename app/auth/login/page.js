import LoginForm from '../../../components/auth/LoginForm';
import Header from '../../../layouts/partials/Header';
import Footer from '../../../layouts/partials/Footer';
import SeoMeta from '../../../layouts/SeoMeta';

export default function LoginPage() {
  return (
    <>
      <SeoMeta title="Login - Celebrity Persona" />
      <Header />
      <LoginForm />
      <Footer />
    </>
  );
}