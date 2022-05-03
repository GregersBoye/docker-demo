import './App.css';
import {useState} from "react";

function App() {
  const [animate, setAnimate]= useState(false);
  const [quote, setQuote]= useState({quote: 'Never insult seven men, when all you got is a six-shooter', author: 'Col. Sherman Potter'})
  async function getData(){
    setAnimate(true);
    setTimeout(() => {setQuote(data); setAnimate(false); }, 1000)
    const quote = await fetch('http://localhost:3001');
    const data = await quote.json();
    console.log('getting data');
    console.log(data);

  }


  return (
    <div className="App">
      <div className={`container ${animate ? 'container_anim' : ''}`} onClick={getData} onAnimationEnd={() => {console.log('done')}}>
<h1>{quote.quote}</h1>
      <span style={{color:'#'}}>- {quote.author}</span>
    </div></div>
  );
}

export default App;
