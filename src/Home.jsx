import { useState,useEffect} from 'react'


function Home(){
  const [articles, setArticles] = useState([]);
const [loading, setloading] = useState(true);
const [error,setError]=useState(null);
useEffect(()=>{
    async function fetchArticles()  {
      try{
        const response = await fetch(
          `https://meduas-news-gist-api.onrender.com/api/articles`,
        );
        if (!response.ok) {
          throw new Error("Not found");
        }
         const showsResult = await response.json();
         
        setArticles(showsResult.articles) 
        console.log(showsResult)
        setloading(false)
      } catch(error){
       setError( "Something went wrong")
       
      }
      finally{
         setloading(false )
       }
      

      }
    fetchArticles()
},[]
)
if(loading) return <p>  Loading...</p>
if(error) return <p> {error} </p>
return (
<div> <h1> NC NEWS API</h1> 
{articles.map((article)=>(
  <div className ="articleCard" key = {article.article_id}><h2> {article.title} </h2> <p> {article.author}</p>
  <p> {article.topic}</p></div>))}</div>)
}
export default Home;