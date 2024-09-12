import "./ModalBooklist.css" 
import { useContext } from "react"
import { MyBookListContext } from "./MyBookListContext"

export default function ModalBookList(param){
    const myBook = useContext(MyBookListContext);
    function addtoyourbook(e){
        e.preventDefault()
        let url = document.getElementById("urlinvi").value;
        let title = document.getElementById("titleinvi").value;
        myBook.setMyBookList(b => [...b, {url: param.result.published_works[0].cover_art_url, title : param.result.title}]);
    }
    return(
        <div className="modalsection" id={"apifetch" + param.id}>
            <div className="modalbookcoverdiv">
                <img src={param.result.published_works[0].cover_art_url} alt="" className="modalbookcover"/>
            </div>
            <div className="modalbookdetails">
                <div className="modalbooklisttitle">{param.result.title}</div>
                <div className="modalbooklistseriesname">{param.result.series_name}</div>
                <div className="modalbooklistauthor">Author : {param.result.authors[0]}</div>
            </div>
            <div className="yourbookentry">
                <form action="" onSubmit={addtoyourbook}>
                    <input type="text" name='title' value ={param.result.title} className="invi" id = "titleinvi" readOnly/>
                    <input type="text" name='cover' value ={param.result.published_works[0].cover_art_url} className="invi" id = "urlinvi" readOnly/>
                    <select name="statusofbook" id="statusofbook" className="statusofbook">
                        <option disabled selected defaultValue={null}>Select a Option</option>
                        <option value="Reading">Reading</option>
                        <option value="Finished Reading">Finish Reading</option>
                        <option value="Plan to Read">Plan To Read</option>
                    </select>
                    <button type="submit" className="addonmylistbutton">Add</button>
                </form>
            </div>
        </div>
    )
}
