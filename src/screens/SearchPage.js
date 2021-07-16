import ResultsProducts from '../components/ResultsProducts';
import SwipToTheBot from '../components/SwipToTheBot';
import SwipToTheLeft from '../components/SwipToTheLeft';

export default function SearchPage() {
  return (
    <>
      <SwipToTheLeft />
      <ResultsProducts />
      <SwipToTheBot />
    </>
  );
}
