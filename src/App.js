
import { useEffect, useState } from 'react';
import './App.css';


function App() {
  const[movie,setMovie]=useState([]);
  const[getvalue,setGatvalue]=useState("");
  const[search,setSearch]=useState("");
  const[valperson,setValperson]=useState([]);
  const [inputError, setInputError] = useState(null);
  const [actor, setActor] = useState(false);
  const [show, setShow] = useState(false);
  
  
  useEffect(()=>{
    
    const query = search
    if (query === "") {
      setMovie([])
      setInputError("Please Enter Some Text")
    }
    else if (getvalue === "") {
      setInputError("Please select some tags")
    }else{
      setInputError("")
    }
    if(getvalue==="Shows"){
      setActor(false);
      setShow(true);
      
     fetch(`https://api.tvmaze.com/search/shows?q=${search}`).then((res)=>res.json()).then((datavalue)=>{console.log(datavalue);setMovie(datavalue)});
     
    
    }else if(getvalue==="Actor"){
      setShow(false);
      setActor(true);
     
      fetch(`https://api.tvmaze.com/search/people?q=${search}`).then((res)=>res.json()).then((data)=>{setValperson(data)});
     
 
    }
    
  },[search])
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tv Maze</h1>
        <div onChange={(e)=>{setGatvalue(e.target.value)}}>
        <input type="radio" value="Actor" name="Movies"  /> Actor
        <input type="radio" value="Shows" name="Movies" /> Shows
        
      </div>
        <input value={search} onChange={(e)=>setSearch(e.target.value)} type={"text"} placeholder={"eg.Friends.."}/>

        <span className='errorSpan' title='Error'>{(inputError === null) ? "" : inputError}</span>
        
      </header>
      
      <div className='dispaly'>
        
        {actor? valperson.map((item)=><div className='card' key={item.person.id}>
            <div className='movieImg'>
              {item.person.image?(
                <img className='Img' src={item.person.image.medium} alt={item.person.name!=null? item.person.name:"Not Found"}/>
              ):(<img className='Img' src="https://www.prokerala.com/movies/assets/img/no-poster-available.jpg" alt={item.person.name}/>)}
            </div>
            <div className='moviename'>
              <h3 className='name'>{item.person.name}</h3>
              <h4 className='detail'>language:{item.person.language}</h4>
              
            </div>
            
          </div>
          
        ):""}
        {show ? movie.map((item)=><div className='card' key={item.show.id}>
            <div className='movieImg'>
              {item.show.image?(
                <img className='Img' src={item.show.image.medium} alt={item.show.name!=null? item.show.name:"Not Found"}/>
              ):(<img className='Img' src="https://www.prokerala.com/movies/assets/img/no-poster-available.jpg" alt={item.show.name}/>)}
            </div>
            <div className='moviename'>
              <h3 className='name'>{item.show.name}</h3>
              <h4 className='detail'>language:{item.show.language}</h4>
              
            </div>
            
          </div>
          
        ):""}

      </div>
      
    </div>
  );
}

export default App;
