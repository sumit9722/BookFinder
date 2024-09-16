import "./Sidebar.css"
import { useContext, useEffect, useState} from "react"
import { MyBookListContext } from "./MyBookListContext"
import { FilterContext } from "./FilterContext"
import { SidebarTranslateContext } from "./SidebarTranslateContext"

export default function Sidebar(){
    const books = useContext(MyBookListContext);
    const filterset = useContext(FilterContext);
    const sidebarClass = useContext(SidebarTranslateContext);

    const [details, setDetails] = useState({
        total : 0,
        currReading : 0,
        compBooks : 0,
        plantoread : 0,
        nooffav : 0,
        losubcatelog : [],
        locatelog : []
    });

    const [bgColorClass, setBgColorClass] = useState("")

    const [filterparams, setfilterparams]=useState({
        fav : false,
        categories : [],
        subcategories : []
    })

    function updateFilterparam(e){
        if(e.target.id == "favs")
        {
            if(e.target.checked)
            {
                setfilterparams((p)=>({...p, fav : true}));
            }
            else
            {
                setfilterparams((p)=>({...p, fav : false}));
            }
        }
        else if(e.target.id == "catelog")
        {
            const category = e.target.innerText;
            setfilterparams((prevState) => {
            const updatedCategories = prevState.categories.includes(category)
                ? prevState.categories.filter((ele) => ele !== category) 
                : [...prevState.categories, category];

            e.target.className = updatedCategories.includes(category) ? "catitems bgcolorclass" : "catitems";

            return {
                ...prevState,
                categories: updatedCategories
            };
            });
        }
        else if(e.target.id == "subcatelog")
        {
            const subcategory = e.target.innerText;
            setfilterparams((prevState) => {
            const updatedsubCategories = prevState.subcategories.includes(subcategory)
                ? prevState.subcategories.filter((ele) => ele !== subcategory) 
                : [...prevState.subcategories, subcategory];

            e.target.className = updatedsubCategories.includes(subcategory) ? "subcatitems bgcolorclass" : "subcatitems";

            return {
                ...prevState,
                subcategories: updatedsubCategories
            };
            });
        }
    
    }

    function updatefilter(){
        filterset.setFilter(filterparams);
    }

    useEffect(() => {
        console.log("Updated filterparams:", filterparams);
    }, [filterparams]); 
    
   
    
    useEffect(()=>{
        let updatedDetails = {
            total: books.myBookList.length,
            currReading: 0,
            compBooks: 0,
            plantoread: 0,
            nooffav: 0,
            losubcatelog: [],
            locatelog: []
        };
        let donecatelog = [];
        let donesubcatelog = [];

        books.myBookList.forEach(ele => {
            if(ele.status == "1") {
                updatedDetails.currReading++;
            } else if(ele.status == "2") {
                updatedDetails.compBooks++;
            } else {
                updatedDetails.plantoread++;
            }

            if(ele.fav) {
                updatedDetails.nooffav++;
            }

            ele.categories.forEach((cat) => {
                if(!donecatelog.includes(cat)) {
                    donecatelog.push(cat);
                    updatedDetails.locatelog.push(
                        <div className={"catitems " + bgColorClass} key={cat} onClick={updateFilterparam} id="catelog">{cat}</div>
                    );
                }
            });

            ele.subcategories.forEach((subcat) => {
                if(!donesubcatelog.includes(subcat)) {
                    donesubcatelog.push(subcat);
                    updatedDetails.losubcatelog.push(
                        <div className="subcatitems" key={subcat} onClick={updateFilterparam} id="subcatelog">{subcat}</div>
                    );
                }
            });   
        });

        setDetails(updatedDetails);
        
    },[books.myBookList])

    return(
        <div className={"sidebar " + sidebarClass.sidebarTranslateClass}>
            <div className="yourinfo">
                <div className="yif totalbooks">Total: <div className="nums">&nbsp;{details.total}</div></div>
                <div className="yif reading">Currently reading : <div className="nums">&nbsp;{details.currReading}</div></div>
                <div className="yif finihed">Finished : <div className="nums">&nbsp;{details.compBooks}</div></div>
                <div className="yif plantoread">Plan to Read : <div className="nums">&nbsp;{details.plantoread}</div></div>
                <div className="yif nofavs">No. of Favorites : <div className="nums">&nbsp;{details.nooffav}</div></div>
            </div>
            <div className="filteroption">
                <div className="favdiv">
                    <label htmlFor="favs" className="favlabel">Favorites : </label>
                    <input type="checkbox" name="favs" id="favs" className="favs" onChange={updateFilterparam}/>
                    <button className="filter" onClick={updatefilter}>Filter</button>
                </div>
                <div className="categories">
                    <div className="headlist">Categories:</div>
                    <div className="listofcategories">
                        {...details.locatelog}
                    </div>
                </div>
                <div className="subcategories">
                    <div className="headlist">Subcategories:</div>
                    <div className="listofsubcategories">
                        {details.losubcatelog}
                    </div>
                </div>
            </div>
        </div>
    )
}
