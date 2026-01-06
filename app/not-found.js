import NotFound from "@layouts/404";
import Footer from "@layouts/partials/Footer";
import Header from "@layouts/partials/Header";
import { getRegularPage } from "@lib/contentParser";

const notFound = async () => {
  const notFoundData = await getRegularPage("404");
  return (
    <>
      <Header />
      <NotFound data={notFoundData} />
      <Footer />
    </>
  );
};

export default notFound;
