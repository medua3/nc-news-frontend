import{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import dateHandler from "../utils/dateHandler.js"
import CommentSection from "./commentSection.jsx";
function ArticlePage(){
    const[article, setArticle]=useState({})
    const[loading,setLoading]=useState(true)
    const[error,setError]=useState(null)
    const[voteChange, setVoteChange]=useState(0)
    const [isVoting,setVoting]=useState(false)
    const[voteError,setVoteError]=useState(null)
    const {article_id}=useParams()
useEffect(()=>{
    async function fetchArticle() {
        try{
            const  response= await fetch(`https://meduas-news-gist-api.onrender.com/api/articles/${article_id}`);
            if(!response.ok){
                throw new Error("Not found")
            }
            const showArticle= await response.json()
            setArticle(showArticle.article)
            console.log (showArticle.article)
        }
        catch(error){
            setError("Something went wrong")
        }
        finally{
            setLoading(false)
        }
    }
    fetchArticle()},[article_id]) 
if(loading) return <p>  Loading...</p>
if(error) return <p> {error} </p>
async function handleVotes(amount){setVoteChange((prev)=>prev+amount)
    setVoting(true)
    setVoteError(false)
    try{const response= await fetch(`https://meduas-news-gist-api.onrender.com/api/articles/${article_id}`,
{
    method: "PATCH",
 headers:{"Content-Type": "application/json",
 },
 body: JSON.stringify({ inc_votes: amount }),   
}
)
if(!response.ok){
   throw new Error("Vote failed") }}
catch(error){
    setVoteChange(((prev)=>prev-amount))
    setVoteError("Something went wrong with voting...Try again please!!")
}
finally{
    setVoting(false)
}
}

return <div className="ArticlePage"> <div> <h1> {article.title}  </h1></div>  
<img className="articlePageImage" src={article.article_img_url} alt="" />  
<p className= "articlePageBody"> {article.body}</p>
 <p className="articlePageAuthor"> author: {article.author}</p>
  <p className= "articlePageTopic"> topic: {article.topic}</p>
  <p  className = "articlePageVotes">votes: {article.votes+ voteChange}  <button className="voteButton"disabled={isVoting} onClick={() => handleVotes(1)}>⬆️</button>
<button disabled={isVoting} onClick={() => handleVotes(-1)}>⬇️</button></p>
{voteError && <p>{voteError}</p>}
  <p  className = "articlePageCc">comments: {article.comment_count}</p>
   <p className ="articlePageCreatedAt"> {dateHandler(article.created_at)}</p>
   <CommentSection article_id={article_id} /></div>

}
export default ArticlePage
