import { useNavigate } from 'react-router-dom';
import codeService from '../services/code_service';
import authService from '../services/auth-service';
import Editor from '@monaco-editor/react';
import { useState } from "react"
import ProblemList from '../components/ProblemList';

type Problem = {
    id: number;
    title: string;
    description: string;
    platform: string;
  };
  
export default function UserDashboardPage() {

    const sampleProblems: Problem[] = [
        {
          id: 1,
          title: 'Two Sum',
          description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n
          Example:
          Input: nums = [2,7,11,15], target = 9
          Output: [0,1]
          Because nums[0] + nums[1] == 9, we return [0, 1].`,
          platform: 'LeetCode',
        },
        {
          id: 2,
          title: 'Simple Array Sum',
          description: `Given an array of integers, find the sum of its elements.\n
          Example:
          Input: ar = [1, 2, 3, 4, 10, 11]
          Output: 31`,
          platform: 'HackerRank',
        },
      ];


      const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);

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

    try {
      const response = await codeService.runCode({ code });
      console.log('Run code:', response['output']);
      setOutput(response['output']);
        setResult(response['result'] == 'Accepted' ? 'Success' : 'Fail');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


  const submitCode = async () => {

    try {
      const response = await codeService.submitCode({ code });
      console.log('Submit code:', response);
    //   setOutput(response.data.output);
    //     setResult(response.data.result ? 'Success' : 'Fail');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


  const handleProblemSelect = (problem: any) => {
    setSelectedProblem(problem);
    setCode(`// ${problem.title}\n\n`);
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



        {selectedProblem ? (
        <>
          <div style={{ height: '400px', margin: '20px' }}>
            <Editor
              height="400px"
              language="javascript"
              value={code}
              onChange={(value) => setCode(value!)}
            />
          </div>
          <button onClick={runCode}>Run</button>
          <button onClick={submitCode}>Submit</button>
          <div id="output">
            <h2>Output</h2>
            <pre>{output}</pre>
          </div>
          <div id="result">
            <h2>Result</h2>
            <pre>{result}</pre>
          </div>
        </>
      ) : (
        <ProblemList problems={sampleProblems} onSelect={handleProblemSelect} />
      )}
      </>
    )
  }