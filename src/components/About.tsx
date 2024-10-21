import React from 'react';

export default function AboutUs() {
  return (
    <section className="overflow-hidden">
      <div className="px-16 mx-auto">
        {/* Introduction Section */}
        <div className="relative mb-32">
          <h1 className="text-3xl lg:text-5xl font-bold  pt-14 pb-8">
            Welcome to CrickScore
          </h1>
          <p className=" text-lg text-gray-600 mb-8 ">
            CrickScore is your ultimate destination for all things cricket! Our platform is designed to bring you the latest scores, detailed statistics, and an engaging community of cricket enthusiasts. Whether you’re a casual fan or a die-hard supporter, CrickScore offers everything you need to stay connected with your favorite sport.
          </p>
        </div>

        {/* Key Features Section */}
        <div className="relative mb-32">
          <h2 className="text-4xl lg:text-5xl font-bold font-heading mb-14">
            Key Features
          </h2>
          <div className="border border-black bg-black rounded-3xl flex flex-wrap">
            <div className="w-full md:w-1/2 lg:w-1/4 py-8">
              <div className="md:border-r border-black px-12">
                <p className="text-orange-50 mb-2 text-center">Real-time Updates</p>
                <h3 className="text-2xl xl:text-2xl font-semibold text-white text-center">Live Scores</h3>
              </div>
            </div>

            <div className="w-full md:w-1/2 lg:w-1/4 py-8">
              <div className="lg:border-r border-black px-12">
                <p className="text-orange-50 mb-2 text-center">Comprehensive Stats</p>
                <h3 className="text-2xl lg:text-2xl font-semibold text-white text-center">Player & Team Stats</h3>
              </div>
            </div>

            <div className="w-full md:w-1/2 lg:w-1/4 py-8">
              <div className="md:border-r border-black px-12">
                <p className="text-orange-50 mb-2 text-center">Engaging Community</p>
                <h3 className="text-2xl lg:text-2xl font-semibold text-white text-center">Fan Interactions</h3>
              </div>
            </div>

            <div className="w-full md:w-1/2 lg:w-1/4 py-8">
              <div className="px-12">
                <p className="text-orange-50 mb-2 text-center">User-Friendly</p>
                <h3 className="text-2xl lg:text-2xl font-semibold text-white text-center">Intuitive UI</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Commitment Section */}
        <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-14">
          Our Commitment to You
        </h2>
        <div className="flex flex-wrap mb-32 -mx-4">
          <div className="w-full lg:w-1/2 p-4">
            <p className="text-gray-600 text-lg">
              At CrickScore, we offer real-time updates and live scores to keep you engaged with every match, ensuring you never miss a moment of the action.
            </p>
          </div>
          <div className="w-full lg:w-1/2 p-4">
            <p className="text-gray-600 text-lg">
              Our comprehensive stats feature provides in-depth insights into player and team performances, making it easy for fans to analyze the game.
            </p>
          </div>
        </div>
        <div className="mb-32">
          <h2 className="text-2xl lg:text-2xl font-bold font-heading mb-4">
            Join Us on Our Journey
          </h2>
          <p className="text-gray-600 text-lg  mx-auto">
            Join the CrickScore community today and experience cricket like never before. Whether you’re keeping track of your favorite teams or engaging with fellow fans, we’re here to enhance your cricket experience!
          </p>
        </div>
      </div>
    </section>
  );
}
