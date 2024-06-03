import { useEffect, useState } from "react"
import Spinner from "../components/Spinner"
import authService from "../services/auth-service";
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });


  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setLoading(true)



    try {
      setError('')
      const response = await authService.login(formData.email, formData.password);
      console.log('Login successful:', response.role);
      if (response.role == 1) {
        navigate('/admin-dashboard', {replace: true});
      } else {
        navigate('/user-dashboard', {replace: true});
      }
    } catch (error) {
      setError('error');
      console.error('Error submitting form:', error);
    } finally {
      setFormData({
        email: '',
        password: '',
      })
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('loading set');
    
  }, [loading])



    return (
      <>
      <form onSubmit={handleSubmit}>
      <div className='grid grid-cols-2'>
        <div>TVZ Code Challenge</div>
        <br />
        <div>Login</div>
        <br />
          <div className='bg-white py-48 px-32 rounded-xl rounded-xl-tl'>
            { error ? <div className="text-red-500 font-bold">{error}</div> : <div></div> }
            <div className='w-100 h-100 bg-[#24282C] py-5 rounded-lg'>
              <div className='w-100 my-2'>
                <input className='rounded bg-[#8C8D8E] py-2 w-10/12 text-black px-2' name="email" value={formData.email} onChange={handleChange} type="email" placeholder='Email' />
              </div>
              <br />
              <div className='w-100 my-2'>
                <input className='rounded bg-[#8C8D8E] py-2 w-10/12 px-2 text-black' name="password" type="password" value={formData.password} onChange={handleChange} placeholder='Password' />
              </div>
              <br />
              <div className='space-x-3 my-8'>
                <button className='bg-orange-500 px-12 w-5/12' type="submit">{loading ? <Spinner /> : 'Login'}</button>
              </div>

              <br />

              <div> Or </div>

              <br />

              <div className='space-x-3 my-8'>
                <button className='bg-orange-500 px-12 w-5/12' type="button" onClick={() => navigate('/signup')}>Signup</button>
              </div>

              <div className='text-white text-sm text-left p-8'>
              </div>
            </div>
          </div>
        </div>
      </form>
      </>
    )
  }