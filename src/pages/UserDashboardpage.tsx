import authService from "../services/auth-service";
import { useNavigate } from 'react-router-dom';

export default function UserDashboardPage() {

    let user = localStorage.getItem('user');

    let jsonUser = JSON.parse(user!)
    console.log('THIS S THE USER --- ', jsonUser.firstname);
    

  const navigate = useNavigate();

  const logoutFunc = () => {

    try {
    authService.logout();
    navigate(`/login`, {replace: true})
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
    }
  };



    return (
      <>
      <div className='grid grid-cols-2'>
      <div className='bg-[#23272B] h-20 text-black static items-end text-end'>
               <button onClick={logoutFunc} className='bg-[#FD4F00] text-white rounded-xl h-10 py-2 text-sm m-4 items-end'>Logout</button>
              </div>
        <div>TVZ Code Challenge</div>
        <br />
        <div>Welcome back, { jsonUser.lastname }</div>
        <br />
        <div>{ jsonUser.firstname}'s Dashboard</div>
        <br />
        </div>
      </>
    )
  }