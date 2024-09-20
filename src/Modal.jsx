import "./Modal.css"
import { useContext } from "react"
import { useState } from "react"
import { ModalDisplayContext } from "./ModalDisplayContext"
import fetchingData from "./ApiFetch"
import ModalBookList from "./ModalBookList"


export default function Modal() {
    const modalClass = useContext(ModalDisplayContext);

    const [loading, setloading] = useState(false);

    function exitModal(){
        modalClass.setModalDisplayClass("modalscreen-invis");
    }

    const [details, setdetails] = useState({
        title : "",
        author : "",
        series : "",
        bookType : ""
    })

    function reset(){
        setdetails({title : "",
            author : "",
            series : "",
            bookType : ""
        })
    }

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
        setloading(true);
        e.preventDefault();
        const bookParametersObject = {
            author : details.author,
            title : details.title,
            series : details.series,
            book_type : details.bookType,
            results_per_page: '100',
            page: '1'
        };
        let result = await fetchingData(bookParametersObject);
        if(result.isFetchingsuccessfull){
            setApiResults(modalbooklistmaker(result.bookArray));
            if(result.bookArray.length == 0)
            {
                setApiResults(<div className="defaultmsg">No Books Found</div>);
            }
            setloading(false);
        }
        else{
            if(result.errorCode == 422)
            {
                setApiResults(<div className="defaultmsg">Please Type More than one letter</div>);
                setloading(false);
                return;
            }
            setApiResults(<div className="defaultmsg">Error in API Connection</div>);
            setloading(false);
            console.log("ERROR_CODE :", result.errorCode)
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
                            <select name="bookType" id="booktype" className="booktype" defaultValue="" onChange={updateparams}>
                                <option value="">Select book type</option>
                                <option value="Fiction">Fiction</option>
                                <option value="Nonfiction">Non-fiction</option>
                            </select>
                            <button type="reset" onClick={reset} className="apiformbutton resettype"><img src="./cross.svg" alt="search" className="apiformbuttonimg" /></button>
                            <button type="submit" className="apiformbutton submittype" onClick={searchapi}><img src="./searchicon.svg" alt="search" className="apiformbuttonimg" /></button>

                        </div>
                    </form>
                </div>
                <div className="modalresult">
                    {loading? <div className="loader"><div className="loaderasset"></div><div className="loaderasset2"></div><div className="loaderasset3"></div></div>:apiResults}
                </div>
            </div>
        </div>
    )
}