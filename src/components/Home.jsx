import { useState,useEffect} from 'react'
import { Link } from "react-router-dom";
import dateHandler from "../utils/dateHandler";


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
<div className="articleGrid"> 
  <div> <h1> MEDUA'S NEWS GIST API</h1> </div>
{articles.map((article)=>(
  <div className ="articleCard" key = {article.article_id}> <Link to= {`/articles/${article.article_id}`}><h2> {article.title} </h2></Link>
   <img className="articleImage" src={article.article_img_url} alt="" />
   <p className="articleAuthor"> author: {article.author}</p>
  <p className= "articleTopic"> topic: {article.topic}</p>
  <p  className = "articleVotes">votes: {article.votes}</p>
  <p  className = "articleCc">comments: {article.comment_count}</p>
  <p className ="articleCreatedAt"> {dateHandler(article.created_at)}</p>
  
  </div>))}</div>)
}
export default Home;