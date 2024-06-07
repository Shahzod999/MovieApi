import Movies from "@/components/Movies";
import LoadMore from "../components/LoadMore";

function Home() {
  return (
    <main className="py-16 px-8 flex flex-col gap-10">
      <Movies />
      <LoadMore />
    </main>
  );
}

export default Home;
