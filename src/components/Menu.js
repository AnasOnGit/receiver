import React,{useState,useEffect} from "react"

function Menu({isMenuOpen}) {
    // states
    const [menuClass,setMenuClass] = useState("menu")

    //   functions
    const toggleMenuClass = () => {
        if(isMenuOpen === true){
            setMenuClass("menu open")
        }else{
            setMenuClass("menu")

        }
    }
    // effect
    useEffect(()=>{toggleMenuClass()},[isMenuOpen])

  return (
    <div className={menuClass}>
        <div className="menu-grabber">
            <span className="line"></span>
            <div className="menu-section"></div>
        </div>
    </div>
  );
}


export default Menu;
