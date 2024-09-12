import "./Modal.css"
import { useContext } from "react"
import { useState } from "react"
import { ModalDisplayContext } from "./ModalDisplayContext"
import fetchingData from "./ApiFetch"
import ModalBookList from "./ModalBookList"


export default function Modal() {
    const modalClass = useContext(ModalDisplayContext);

    function exitModal(){
        modalClass.setModalDisplayClass("modalscreen-invis");
    }

    const [details, setdetails] = useState({
        title : "",
        author : "",
        series : "",
        bookType : ""
    })

    const [apiResults, setApiResults] = useState(<div className="defaultmsg">Search For the books you want.....</div>)

    function updateparams(e){
        const {name, value} = e.target;
        setdetails((prev)=>{
            return {...prev, [name] : value}
        })
    }

    function modalbooklistmaker(bookarray) {
        return bookarray.map((book, index) => (
            <li key={index}><ModalBookList result = {book} id = {index}/></li>
          ));
    }
    
    async function searchapi(e){
        e.preventDefault();
        const bookParametersObject = {
            author : details.author == "" ? null : details.author,
            title : details.title == "" ? null : details.title,
            series : details.series == "" ? null : details.series,
            book_type : details.bookType == "" ? null : details.bookType,
            results_per_page: '100',
            page: '1'
        };
        console.log(bookParametersObject);
        let result = await fetchingData(bookParametersObject);
        if(result.isFetchingsuccessfull){
            console.log(result.bookArray)
            setApiResults(modalbooklistmaker(result.bookArray));
        }
        else{
            setApiResults("Error in Server Connection");
        }
    }

    return (
        <div className={"modalscreen " + modalClass.ModalDisplayClass}>
            <div className="modal">
                <div className="modalsearch">
                    <div className="exitmodal" onClick={exitModal}><img src="cross.svg" alt="X" className="exitmodalcross"/></div>
                    <form onSubmit={searchapi} className="modalform">
                        <div className="firsttwoinputs">
                            <input type="text" name="title" className="apititlesearchbar" placeholder="Title of the book" onChange={updateparams} />
                            <input type="text" name="author" className="apiauthorsearchbar" placeholder="Author" onChange={updateparams}/>
                        </div>
                        <div className="remaininginputs">
                            <input type="text" className="apiseriessearchbar" name="series" placeholder="Series Search" onChange={updateparams}/>
                            <select name="booktype" id="booktype" className="booktype" onChange={updateparams}>
                                <option defaultValue value="" >Select book type</option>
                                <option value="Fiction">Fiction</option>
                                <option value="Nonfiction">Non-fiction</option>
                            </select>
                            <button type="reset" className="apiformbutton resettype"><img src="./cross.svg" alt="search" className="apiformbuttonimg" /></button>
                            <button type="submit" className="apiformbutton submittype" onClick={searchapi}><img src="./searchicon.svg" alt="search" className="apiformbuttonimg" /></button>

                        </div>
                    </form>
                </div>
                <div className="modalresult">
                    {apiResults}
                </div>
            </div>
        </div>
    )
}