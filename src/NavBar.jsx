import { useState } from "react";
import { useContext } from "react";
import { ModalDisplayContext } from "./ModalDisplayContext"
import { SearchContext } from "./searchcontext";
import "./NavBar.css"

export default function NavBar() {
    const [searchButtonClass, setSearchButtonClass] = useState("");
    const modalClass = useContext(ModalDisplayContext);
    const searchcon = useContext(SearchContext);
    const [searchTerm, setSearchTerm] = useState("");

    function searchbtnclicked() {
        setSearchButtonClass("searchsubmitbuttonclicked");
    }

    function addbuttonclicked() {
        modalClass.setModalDisplayClass("");
    }

    function searchlist(e) {
        e.preventDefault();
        searchcon.setSearch(searchTerm);
    }

    function updateSearchTerm(e){
        const {name, value} = e.target;
        setSearchTerm(value);
    }

    return (
        <nav className="navbar">
            <ul className="navbarlist">
                <li>
                    <img src="/book.svg" alt="My Book List Logo" className="logonav" />
                </li>
                <li className="navbarsearchbar">
                    <form className="navsearchform" onSubmit={searchlist}>
                        <div className="searchdiv">
                            <input type="text" name="search" id="searchbar" className="searchbar" placeholder="Search Your Books" onChange={updateSearchTerm}/>
                            <button type="submit" className={"searchsubmitbutton "+searchButtonClass} onClick={searchbtnclicked}><img src="./searchicon.svg" alt="search" className="searchbuttonimg" /></button>
                            <div className="aftersearchdiv"></div>
                        </div>
                    </form>
                </li>
                <li>
                    <button className="addbookbutton" onClick={addbuttonclicked}>Add a Book</button>
                </li>
            </ul>

        </nav>
    )
}

