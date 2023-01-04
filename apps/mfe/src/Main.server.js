import React from "react";

export default function Main({ }) {
    return (
        <main className="container mx-auto py-8 px-2 lg:px-20 lg:w-4/5 xl:w-3/4">
            {/* Page Content */}
            <div className="w-full flex flex-wrap">
                {/* Main Area */}
                <div className="w-full lg:w-3/4 xl:w-4/5 px-4">
                    <h1 className="text-2xl font-semibold text-gray-800 pb-4">
                        Welcome to Tailwind Template!
                    </h1>
                    <p className="leading-loose text-gray-700">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at
                        ipsum eu nunc commodo posuere et sit amet ligula. Fusce at massa ac
                        nisi aliquet scelerisque quis ut libero. Quisque mollis dolor non
                        tellus placerat vitae sodales lectus porta. Donec et dui dolor.
                    </p>
                    <p className="leading-loose text-gray-700">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at
                        ipsum eu nunc commodo posuere et sit amet ligula. Fusce at massa ac
                        nisi aliquet scelerisque quis ut libero. Quisque mollis dolor non
                        tellus placerat vitae sodales lectus porta. Donec et dui dolor.
                    </p>
                </div>
                {/* Sidebar */}
                <div className="w-full lg:w-1/4 xl:w-1/5 px-4">
                    <h2 className="text-lg font-semibold text-gray-800 pb-4">Sidebar</h2>
                    <p className="leading-loose text-gray-700">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at
                        ipsum eu nunc commodo posuere et sit amet ligula. Fusce at massa ac
                        nisi aliquet scelerisque quis ut libero. Quisque mollis dolor non
                        tellus placerat vitae sodales lectus porta. Donec et dui dolor.
                    </p>
                    <p className="leading-loose text-gray-700">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at
                        ipsum eu nunc commodo posuere et sit amet ligula. Fusce at massa ac
                        nisi aliquet scelerisque quis ut libero. Quisque mollis dolor non
                        tellus placerat vitae sodales lectus porta. Donec et dui dolor.
                    </p>
                </div>
            </div>
        </main>
    );
}
