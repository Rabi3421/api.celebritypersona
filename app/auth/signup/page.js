import SignupForm from '../../../components/auth/SignupForm';
import Header from '../../../layouts/partials/Header';
import Footer from '../../../layouts/partials/Footer';
import SeoMeta from '../../../layouts/SeoMeta';

export default function SignupPage() {
  return (
    <>
      <SeoMeta title="Sign Up - Celebrity Persona" />
      <Header />
      <SignupForm />
      <Footer />
    </>
  );
}