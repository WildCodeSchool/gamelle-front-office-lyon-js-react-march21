// import SwipDrawer from '../components/SwipDrawer';
import ResultsProducts from '../components/ResultsProducts';
// import DrawerProductInfo from '../components/DrawerProductInfo';
import SwipToTheLeft from '../components/SwipToTheLeft';
import SwipToTheRight from '../components/SwipToTheRight';

export default function SearchPage() {
  return (
    <>
      <SwipToTheLeft />
      <ResultsProducts />
      <SwipToTheRight />
    </>
  );
}
