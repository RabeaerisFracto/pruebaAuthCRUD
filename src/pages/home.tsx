// import { Auth } from "@supabase/auth-ui-react";
// import { ThemeSupa } from "@supabase/auth-ui-shared";
// import { client } from "../supabase/client";
// import { useNavigate } from "react-router-dom";
import Discrepancia from "../components/discrepancia";
import { useZustand } from "../store/loginDataStore";
import '../pages/stylesheets/pags.css'


function Home (){
    const folio1 = useZustand(state => state.folio1);
    const folio2 = useZustand(state => state.folio2);
    const folio3 = useZustand(state => state.folio3);
    const folio4 = useZustand(state => state.folio4);
    const folio5 = useZustand(state => state.folio5);
    return(
        <div className="Login">
            <h1 className='titulo'>Discrepancias</h1>
            <Discrepancia/>
            <h2>
                {folio1}<br/>
                {folio2}<br/>
                {folio3}<br/>
                {folio4}<br/>
                {folio5}<br/>
            </h2>
        </div>
    )
}

export default Home;