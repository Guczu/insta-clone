import { useNavigate } from "react-router-dom";

export default function useChangeRoute() {
    const navigate = useNavigate();
        
    function changeRoute(route) {
        navigate(route);
    }
    return changeRoute;
}