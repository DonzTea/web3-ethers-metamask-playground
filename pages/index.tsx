import type { NextPage } from 'next';
import DataCard from '../components/pages/index/DataCard';
import TransferCard from '../components/pages/index/TransferCard';

const Home: NextPage = () => {
  return (
    <div className="flex flex-wrap justify-between items-start gap-5">
      <div className="flex-grow">
        <DataCard />
      </div>
      <div className="flex-grow sm:flex-grow-0">
        <TransferCard />
      </div>
    </div>
  );
};

export default Home;
