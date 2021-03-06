import React,{useContext,useRef,useEffect,useState} from 'react'
import {Link ,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import M from 'materialize-css'
import logo from '../logo.png'
const NavBar = ()=>{
    const  searchModal = useRef(null)
    const [search,setSearch] = useState('')
    const [userDetails,setUserDetails] = useState([])
     const {state,dispatch} = useContext(UserContext)
     const history = useHistory()
     useEffect(()=>{
         M.Modal.init(searchModal.current)
     },[])
     const renderList = ()=>{
       if(state){
           return [
           // <li key="8" className="logo"><img src={logo} alt="logo"/></li>,
            <li key="1" ><i  data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>,
            <li key="8" ><Link to="/"><i className="material-icons">&#xe88a;</i></Link></li>,
            <li key="2" ><Link to="/profile"><i className="material-icons">&#xe7fd;</i></Link></li>,
            <li key="3" ><Link to="/create"><i style={{fontSize:'20px',height:"50%"}} className='fas'>&#xf067;</i></Link></li>,
            <li key="4"><Link to="/myfollowingpost"><i style={{fontSize:'20px',height:"50%"}} class='fas'>&#xf061;</i></Link></li>,
            <li  key="5">
             <button className="btn #c62828 red darken-3"
            onClick={()=>{
              localStorage.clear()
              dispatch({type:"CLEAR"})
              history.push('/signin')
            }}
            style={{marginLeft:"20px"}}>
                Logout
            </button>
            </li>
         
            
           ]
       }else{
         return [
          <li  key="6"><Link to="/signin">Signin</Link></li>,
          <li  key="7"><Link to="/signup">Signup</Link></li>
         
         ]
       }
     }


     const fetchUsers = (query)=>{
        setSearch(query)
        fetch('/search-users',{
          method:"post",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            query
          })
        }).then(res=>res.json())
        .then(results=>{
          setUserDetails(results.user)
        })
     }
    return(
        <div className="navbar-fixed">
        <nav>
        <div className="nav-wrapper white">
          <Link to={state?"/":"/signin"} className="brand-logo left"></Link>
          <ul id="nav-mobile" className="left">
             {renderList()}
  
          </ul>
        </div>
        <div id="modal1" className="modal" ref={searchModal} style={{color:"black"}}>
          <div className="modal-content">
          <input
            type="text"
            placeholder="search users"
            value={search}
            onChange={(e)=>fetchUsers(e.target.value)}
            />
             <ul className="collection">
               {userDetails.map(item=>{
                 return <Link to={item._id !== state._id ? "/profile/"+item._id:'/profile'} onClick={()=>{
                   M.Modal.getInstance(searchModal.current).close()
                   setSearch('')
                 }}><li className="collection-item">{item.email}</li></Link> 
               })}
               
              </ul>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>close</button>
          </div>
        </div>
      </nav>
    </div>
    )
}


export default NavBar
