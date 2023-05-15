import { useEffect, useRef, useState } from "react";
import * as searchActions from "../../store/search";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import "./SearchBar.css";

const SearchBar = () => {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [showDrop, setShowDrop] = useState(true);
    
    const ref = useRef();
    const dispatch = useDispatch();
    const history = useHistory();
    let data = [];

    // const getSearch = async () => {
    //     await dispatch(searchActions.fetchSearch(search))
    //     .then(data => setResults(data));
    // }
    
    const handleChange = async (e) => {
        await setSearch(e.target.value);
    }

    useEffect(() => {
        
        // console.log("finished search term:", search);

        const ue = setTimeout(() => {
            
            dispatch(searchActions.fetchSearch(search))
            .then(data => setResults(data));
        }, 500);
        return () => clearTimeout(ue);
    }, [search])

    const handleSubmit = (e) => {
        e.preventDefault();
        
        
        
        // const wait = async () => {
            // await
            dispatch(searchActions.fetchSearch(search))
            .then(data => dispatch(searchActions.receiveSearch(data)))
            // dispatch(searchActions.receiveSearch(results));
        // }
        // setResults(data);
        setShowDrop(false);
        history.push("/search")
    }

    useEffect(() => {
        // debugger;
        // console.log("show drop: ", showDrop, "ref.current: ", ref.current);
        const closeDrop = e => {
            // console.log("e.target:", e.target);
            if (showDrop && ref.current && !ref.current.contains(e.target)) {
                setShowDrop(false);
            }
        }

        // console.log("listening for mousedown...")
        document.addEventListener("mousedown", closeDrop);

        return () => {
            // console.log("unmounting");
            document.removeEventListener("mousedown", closeDrop);
        }
    }, [showDrop]);

    return (
        <form className="search-form" onSubmit={handleSubmit} ref={ref} >
            <input
                className="search-bar"
                placeholder="Search by Title, Author, or Keyword"
                value={search}
                // onChange={(e) => setSearch(e.target.value)}
                onChange={handleChange}
                onClick={() => setShowDrop(true)}
            />
            {search.length !== 0 && showDrop && (
                <div className="search-drop">
                    {/* {console.log("why the fuck is the dropdown empty", results)} */}
                    {
                    Object.values(results).map(item =>
                        <NavLink key={item.id} to={`/${item.id}`}>
                            <p onClick={() => setShowDrop(false)}>
                            {item?.name}
                            </p>
                        </NavLink>
                    )
                    }
                </div>
            )}
            
            <button type="submit" >
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </form>
    )
}

export default SearchBar;