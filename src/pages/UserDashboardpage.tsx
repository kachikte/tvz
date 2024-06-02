import { useNavigate } from 'react-router-dom';
import codeService from '../services/code_service';
import Editor from '@monaco-editor/react';
import { useState } from "react"


export default function UserDashboardPage() {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any>(null)

    const [code, setCode] = useState('function hello() {\n\tconsole.log("Hello, world!");\n}');
  const [output, setOutput] = useState('');
  const [result, setResult] = useState('');

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


  const runCode = async () => {

    setLoading(true)

    try {
      setError('')
      const response = await codeService.runCode({ code });
      console.log('Run code:', response);
      setOutput(response.data.output);
        setResult(response.data.result ? 'Success' : 'Fail');
    } catch (error) {
      setError('error');
      console.error('Error submitting form:', error);
    }
  };



    return (
      <>
      <div className='bg-[#23272B] h-20 text-black static items-end text-end'>
               <button onClick={logoutFunc} className='bg-[#FD4F00] text-white rounded-xl h-10 py-2 text-sm m-4 items-end'>Logout</button>
              </div>
        <div>TVZ Code Challenge</div>
        <br />
        <div>Welcome back, { jsonUser.lastname }</div>
        <br />
        <div>{ jsonUser.firstname}'s Dashboard</div>
        <br />



        <div style={{ height: '400px', margin: '20px', width: '1000px' }}>
        <Editor
          height="400px"
          language="javascript"
          value={code}
          onChange={(value) => setCode(value!)}
        />
      </div>
      <button onClick={runCode}>Run</button>
      {/* <button onClick={submitCode}>Submit</button> */}
      <div id="output">
        <h2>Output</h2>
        <pre>{output}</pre>
      </div>
      <div id="result">
        <h2>Result</h2>
        <pre>{result}</pre>
      </div>
      </>
    )
  }