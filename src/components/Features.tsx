import React from 'react';

export default function Features() {
  return (
    <div className="py-10">
      <section className="overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-wrap -m-8">
            <div className="w-full md:w-1/3 p-8">
              <p className="text-2xl sm:text-2xl xl:text-3xl text-gray-900">
                <span>More than </span>
                <span className="font-heading font-bold text-transparent bg-clip-text bg-orange-400">16,200</span>
                <span> students enrolled</span>
              </p>
            </div>
            <div className="w-full md:w-1/3 p-8">
              <p className="text-2xl sm:text-2xl xl:text-3xl text-gray-900">
                <span>Increased </span>
                <span className="font-heading font-bold text-transparent bg-clip-text bg-purple-600">117%</span>
                <span> completion rate in the first quarter</span>
              </p>
            </div>
            <div className="w-full md:w-1/3 p-8">
              <p className="text-2xl sm:text-2xl xl:text-3xl text-gray-900">
                <span>Over </span>
                <span className="font-heading font-bold text-transparent bg-clip-text bg-blue-400">82%</span>
                <span> increase in student engagement</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
