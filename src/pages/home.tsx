// import { Auth } from "@supabase/auth-ui-react";
// import { ThemeSupa } from "@supabase/auth-ui-shared";
// import { client } from "../supabase/client";
// import { useNavigate } from "react-router-dom";
import Discrepancia from "../components/discrepancia";

function Home (){
    return(
        <div className="Login">
            <h1>Discrepancias</h1>
            <Discrepancia/>
        </div>
    )
}

export default Home;