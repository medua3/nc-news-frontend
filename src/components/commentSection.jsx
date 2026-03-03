import{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import dateHandler from "../utils/dateHandler.js"

function CommentSection(){
  const [comments, setComments] = useState([]);
const [loading, setLoading] = useState(true);
const [error,setError]=useState(null);
const {article_id}=useParams()
useEffect(()=>{
    async function fetchComment()  {
      try{
        const response = await fetch(
          `https://meduas-news-gist-api.onrender.com/api/articles/${article_id}/comments`,
        );
        if (!response.ok) {
          throw new Error("Not found");
        }
         const showsResult = await response.json();
         
        setComments(showsResult.comments ) 
        console.log(showsResult)
      } catch(error){
       setError( "Something went wrong")
       
      }
      finally{
         setLoading(false )
       }
      

      }
    fetchComment()
},[article_id]
)
if(loading) return <p>  Loading...</p>
if(error) return <p> {error} </p>

return (<div className="commentsGrid"> 
  {comments.map((comment)=>{ return(
<div key ={comment.comment_id}> <p className="commentNameAndCreation"> {comment.author}      Posted: {dateHandler(comment.created_at)} </p>
<p className="commentBody"> {comment.body}</p> 
<p className="commentVotes"> Votes: {comment.votes}</p></div>

  )})}
</div>)





}
export default CommentSection