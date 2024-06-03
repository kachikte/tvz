import authService from "../services/auth-service";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react"
import codeService from '../services/code_service';

export default function AdminDashboardPage() {

    let user = localStorage.getItem('user');

    let jsonUser = JSON.parse(user!)

    const [attempts, setAttempts] = useState([]);


  const navigate = useNavigate();

  const logoutFunc = async (event: any) => {
    event.preventDefault();

    try {
    authService.logout();
    navigate(`/login`, {replace: true})
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
    }
  };

  useEffect(() => {
    codeService.getAttempts().then(result => {
        console.log('Attempts - ', result['data']);
        setAttempts(result['data'])
    }).catch(err => {
        console.log('Attempts error - ', err.toString());
        
    })
  }, []);


    return (
      <>
      <div className='grid grid-cols-2'>
      <div className='bg-[#23272B] h-20 text-black static items-end text-end'>
               <button onClick={logoutFunc} className='bg-[#FD4F00] text-white rounded-xl h-10 py-2 text-sm m-4 items-end'>Logout</button>
              </div>
        <div>TVZ Code Challenge</div>
        <br />
        <div>Admin Dashboard</div>
        <br />


        <div>All Attempts.</div>
      <br />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right rounded-xl px-4">
        <thead className="text-xs text-black-500 uppercase bg-black border-2 rounded-xl">
            <tr>
            <th scope="col" className="px-6 py-3 uppercase">
                PROBLEM ID
                </th>
                <th scope="col" className="px-6 py-3 uppercase">
                CODE
                </th>
                <th scope="col" className="px-6 py-3 uppercase">
                COMPILER OUTPUT
                </th>
                <th scope="col" className="uppercase px-6 py-3">
                OUTPUT
                </th>
                <th scope="col" className="px-6 py-3 uppercase">
                RESULT
                </th>
                <th scope="col" className="px-6 py-3 uppercase">
                DATE
                </th>
                <th scope="col" className="px-6 py-3 uppercase">
                    DETAILS
                </th>
            </tr>
        </thead>
        <tbody>
        {attempts.map((item) => (
          <tr key={item['problemId']}  className={`${item['description'] === 'missed' ? 'bg-red-100' : 'bg-white'} ${item['description'] === 'missed' ? 'text-red-700' : 'text-black'} border-b ${item['description'] === 'missed' ? 'hover:bg-red-300' : 'hover:bg-[#F6F3E6]'}`}>
            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-black">
          {item['problemId']}
          </th>
          <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-black">
          {item['code']}
          </th>
          <td className="px-6 py-4">
          {item['coutput']}
          </td>
          <td className="px-6 py-4">
          {item['output']}
                          </td>
          <td className="px-2 py-4">
          {item['result']}
          </td>
          <td className="px-6 py-4">
          {(item['createdAt'] as string).split('T')[0]}
                  </td>
          <td className="px-6 py-4">
          <button  className='bg-[#FD4F00] text-white rounded-xl h-10 py-2 text-sm mx-1'>View Details</button>
          </td>
      </tr>
        ))}
        </tbody>
    </table>
</div>
        </div>
      </>
    )
  }