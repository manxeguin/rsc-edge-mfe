import React from "react";
import Header from "./Header.server";
import Main from "./Main.server";
import Footer from "./Footer.server";

export default function App({ selectedId, isEditing, searchText}) {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}