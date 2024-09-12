import { useState } from "react";
import { useContext } from "react";
import { ModalDisplayContext } from "./ModalDisplayContext"
import "./NavBar.css"

function searchlist(e) {
    e.preventDefault();}

export default function NavBar() {
    const [searchButtonClass, setSearchButtonClass] = useState("");
    const modalClass = useContext(ModalDisplayContext);


    function searchbtnclicked() {
        setSearchButtonClass("searchsubmitbuttonclicked");
    }

    function addbuttonclicked() {
        modalClass.setModalDisplayClass("");
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
                            <input type="text" name="search" id="searchbar" className="searchbar" placeholder="Search Your Books"/>
                            <button type="submit" className={"searchsubmitbutton "+searchButtonClass} onClick={()=>{searchbtnclicked()}}><img src="./searchicon.svg" alt="search" className="searchbuttonimg" /></button>
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

