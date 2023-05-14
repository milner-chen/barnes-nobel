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

    useEffect(() => {
        if (search !== "") {
            dispatch(searchActions.fetchSearch(search))
            .then(data => setResults(data));
        }
    }, [search])

    useEffect(() => {
        // debugger;
        console.log("show drop: ", showDrop, "ref.current: ", ref.current);
        const closeDrop = e => {
            console.log("e.target:", e.target);
            if (showDrop && ref.current && !ref.current.contains(e.target)) {
                setShowDrop(false);
            }
        }

        console.log("listening for mousedown...")
        document.addEventListener("mousedown", closeDrop);

        return () => {
            console.log("unmounting");
            document.removeEventListener("mousedown", closeDrop);
        }

        // if (!showDrop) return;

        // const closeDrop = () => {
        //     setShowDrop(false);
        // };

        // document.addEventListener('mousedown', closeDrop);
    }, [showDrop])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("results from fetching search", results);
        dispatch(searchActions.receiveSearch(results));
        setShowDrop(false);
        history.push("/search")
    }

    return (
        <form className="search-form" onSubmit={handleSubmit} ref={ref} >
            <input
                className="search-bar"
                placeholder="Search by Title, Author, or Keyword"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClick={() => setShowDrop(true)}
            />
            {search !== "" && showDrop && (
                <div className="search-drop">
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