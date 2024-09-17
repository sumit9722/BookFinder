import { useState } from "react";
import { useContext } from "react";
import { ModalDisplayContext } from "./ModalDisplayContext"
import { SearchContext } from "./SearchContext";
import { SidebarTranslateContext } from "./SidebarTranslateContext";
import "./NavBar.css"

export default function NavBar() {
    const [searchButtonClass, setSearchButtonClass] = useState("");
    const modalClass = useContext(ModalDisplayContext);
    const searchcon = useContext(SearchContext);
    const sidebar = useContext(SidebarTranslateContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [satutration, setSaturation] = useState ("")

    function sidebarchange(){
        if(sidebar.sidebarTranslateClass == "")
        {
            sidebar.setSidebarTranslateClass("sidebarvisible")
            setSaturation("navdesaturate");
        }
        else
        {
            sidebar.setSidebarTranslateClass("")
            setSaturation("")
        }
    }

    function searchbtnclicked() {
        setSearchButtonClass("searchsubmitbuttonclicked");
    }

    function addbuttonclicked() {
        modalClass.setModalDisplayClass("");
    }

    function searchlist(e) {
        e.preventDefault();
        if(window.innerWidth <  600)
        {
            document.querySelector(".navbarsearchbar").style.display="none";
        }
        searchcon.setSearch(searchTerm);
    }

    function searcherClicked()
    {
        document.querySelector(".navbarsearchbar").style.display="block";
        document.querySelector(".searchbar").focus();
    }

    function updateSearchTerm(e){
        const {name, value} = e.target;
        setSearchTerm(value);
    }

    return (
        <nav className="navbar" >
            <ul className="navbarlist">
                <li onClick={sidebarchange}>
                    <img src="/book.svg" alt="My Book List Logo" className={"logonav " + satutration} />
                </li>
                <li className="navbarsearchbar">
                    <div className="searchbefore"></div>
                    <form className="navsearchform" onSubmit={searchlist}>
                        <div className="searchdiv">
                            <input type="text" name="search" id="searchbar" className="searchbar" placeholder="Search Your Books" onChange={updateSearchTerm}/>
                            <button type="submit" className={"searchsubmitbutton "+searchButtonClass} onClick={searchbtnclicked}><img src="./searchicon.svg" alt="search" className="searchbuttonimg" /></button>
                            <div className="aftersearchdiv"></div>
                        </div>
                    </form>
                </li>
                <li className="btns">
                    <button type="submit" className="searchsubmitbutton searcher" onClick={searcherClicked}><img src="./searchicon.svg" alt="search" className="searchbuttonimg" /></button>
                    <button className="addbookbutton" onClick={addbuttonclicked}><div className="btntext">Add a Book</div><img src="./plus.svg" alt="plus" className="searchbuttonimg plusbtn"/></button>
                </li>
            </ul>

        </nav>
    )
}

