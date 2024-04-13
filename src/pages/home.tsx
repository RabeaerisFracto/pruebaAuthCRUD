// import { Auth } from "@supabase/auth-ui-react";
// import { ThemeSupa } from "@supabase/auth-ui-shared";
// import { client } from "../supabase/client";
// import { useNavigate } from "react-router-dom";
import Discrepancia from "../components/discrepancia";
import { useZustand } from "../store/loginDataStore";

function Home (){
    const count = useZustand(state => state.count2);
    return(
        <div className="Login">
            <h1>Discrepancias</h1>
            <Discrepancia/>
            <h1>{count}</h1>
        </div>
    )
}

export default Home;