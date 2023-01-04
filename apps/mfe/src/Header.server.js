import React from "react";

export default function Header({ }) {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto flex flex-wrap items-center px-2 py-3">
                <div className="w-full lg:w-1/4 xl:w-1/5 pl-4">
                    {/* Logo */}
                    <a
                        className="inline-block text-lg font-semibold text-gray-800 no-underline"
                        href="#"
                    >
                        Tailwind Template
                    </a>
                </div>
                <div className="w-full lg:w-3/4 xl:w-4/5 flex items-center justify-end pr-4">
                    {/* Navigation */}
                    <ul className="flex items-center justify-between font-sans text-base text-gray-700 pt-4 lg:pt-0">
                        <li>
                            <a
                                className="inline-block py-2 px-4 text-gray-800 hover:text-gray-600 no-underline"
                                href="#"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                className="inline-block py-2 px-4 text-gray-800 hover:text-gray-600 no-underline"
                                href="#"
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                className="inline-block py-2 px-4 text-gray-800 hover:text-gray-600 no-underline"
                                href="#"
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}
