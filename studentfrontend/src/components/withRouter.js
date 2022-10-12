import {useLocation,useNavigate, useParams } from 'react-router-dom';
function withRouter (Child) {
    return (props) =>{
        const location = useLocation();
        const history = useNavigate();
        const {id} = useParams();
        return <Child {...props} history={history} location={location} id={id} />;
    }
}
export default withRouter;