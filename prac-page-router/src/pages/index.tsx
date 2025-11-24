import SearchableLayout from '../components/searchable-layout';

export default function Home() {
  return <div>index page</div>;
}

Home.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
