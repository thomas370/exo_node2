import Nav from '../../components/nav_admin/Nav';
import Cards from "../../components/cards/Cards";
const Admin = () => {
    return (
        <div>
            <Nav />
            <div className="cards-container">
                <Cards />
            </div>
        </div>
    )
}

export default Admin;