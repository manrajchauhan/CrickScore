import HomeHeader from "@/components/HomeHeader";
import Live from "@/components/Live";

export default function Home() {
  return (
    <>
    <HomeHeader/>
    <div className="px-16">
        <h1 className="text-3xl mt-10 font-bold">Live Matches</h1>
    <Live/>
    </div>
    </>
  );
}
