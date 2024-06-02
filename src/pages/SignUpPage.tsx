import { useEffect, useState } from "react"
import Spinner from "../components/Spinner"
import authService from "../services/auth-service";
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  
    const [formData, setFormData] = useState({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      role: 2,
      image: '',
    });


  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (event: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: event.target.files[0],
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const data = new FormData();
    data.append('firstname', formData.firstname);
    data.append('lastname', formData.lastname);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('role', '2');
    data.append('image', formData.image);

    setLoading(true)



    try {
      setError('')
      const response = await authService.register(data);
      console.log('Form submitted successfully:', response);
      navigate('/login'); // Navigate to the About page
    } catch (error) {
      setError('error');
      console.error('Error submitting form:', error);
    } finally {
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        role: 2,
        image: '',
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
        <div>Sign up</div>
        <br />
          <div className='bg-white py-48 px-32 rounded-xl rounded-xl-tl'>
            { error ? <div className="text-red-500 font-bold">{error}</div> : <div></div> }
            <div className='w-100 h-100 bg-[#24282C] py-5 rounded-lg'>
            <div className='w-100 my-2'>
                <input className='rounded bg-[#8C8D8E] py-2 w-10/12 text-black px-2'  name="firstname" // Add name attribute
 value={formData.firstname} onChange={handleChange} type="text" placeholder='First name' />
              </div>
              <br />
              <div className='w-100 my-2'>
                <input className='rounded bg-[#8C8D8E] py-2 w-10/12 text-black px-2' name="lastname" value={formData.lastname} onChange={handleChange} type="text" placeholder='Last name' />
              </div>
              <br />
              <div className='w-100 my-2'>
                <input className='rounded bg-[#8C8D8E] py-2 w-10/12 text-black px-2' name="email" value={formData.email} onChange={handleChange} type="email" placeholder='Email' />
              </div>
              <br />
              <div className='w-100 my-2'>
                <input className='rounded bg-[#8C8D8E] py-2 w-10/12 px-2 text-black' name="password" type="password" value={formData.password} onChange={handleChange} placeholder='Password' />
              </div>
              <br />
              <div className='w-100 my-2'>
              <input type="file" onChange={handleFileChange} accept="image/*" required />
              </div>
              <br />
              <div className='space-x-3 my-8'>
                <button className='bg-orange-500 px-12 w-5/12' type="submit">{loading ? <Spinner /> : 'Sign In'}</button>
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