import Movies from "@/components/Movies";
import LoadMore from "../components/LoadMore";

function Home() {
  return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
      <Movies />
      <LoadMore />
    </main>
  );
}

export default Home;
