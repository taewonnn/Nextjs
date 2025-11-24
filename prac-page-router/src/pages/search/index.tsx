import SearchableLayout from '../../components/searchable-layout';

export default function Page() {
  return <div>Search page</div>;
}

Page.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
