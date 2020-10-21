import React from 'react'


export default function Searchbar(props) {

    function handleSearch(event){
        // console.log('inside searchbar')
        props.onChange(event.target.value);
    }

    return (
        <>
            <div>
                <label className="searchTitle"> Search: </label>
                <input
                    value={props.searchWord}
                    onChange={handleSearch}
                ></input>
            </div>
        </>
    )
}
