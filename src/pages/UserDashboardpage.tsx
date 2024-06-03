import { useNavigate } from 'react-router-dom';
import codeService from '../services/code_service';
import authService from '../services/auth-service';
import Editor from '@monaco-editor/react';
import { useEffect, useState } from "react"
import ProblemList from '../components/ProblemList';

type Problem = {
    id: number;
    title: string;
    description: string;
    platform: string;
  };


  type Attempt = {
    problemId: number;
    code: string;
    coutput: string;
    output: string;
    result: string;
    createdAt: string;
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

      const [attempts, setAttempts] = useState([]);

      const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
      const [selectedAttempt, setSelectedAttempt] = useState<Attempt | null>(null);

    const [code, setCode] = useState('function hello() {\n\tconsole.log("Hello, world!");\n}');
  const [output, setOutput] = useState('');
  const [result, setResult] = useState('');

    let user = localStorage.getItem('user');

    let jsonUser = JSON.parse(user!)
    console.log('THIS S THE USER --- ', jsonUser.firstname);
    

  const navigate = useNavigate();

  useEffect(() => {
    codeService.getUserAttempt(jsonUser.email).then(result => {
        console.log('Attempts - ', result['data']);
        setAttempts(result['data'])
    }).catch(err => {
        console.log('Attempts error - ', err.toString());
        
    })
  }, []);


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
        setResult(response['result'] == 'Success' ? 'Success' : 'Fail');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


  const submitCode = async () => {

    try {
      const response = await codeService.submitCode( code, selectedProblem!.id,  jsonUser.email);
      console.log('Submit code:', response);
      setOutput(response['output']);
      setResult(response['result'] == 'Success' ? 'Success' : 'Fail');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


  const handleProblemSelect = (problem: any) => {
    setSelectedProblem(problem);
    setCode(`// ${problem.title}\n\n`);
  };

  const handleViewDetails = (attempt: Attempt) => {
    setSelectedAttempt(attempt);
};

    return (
      <>
      <div className='bg-[#23272B] h-20 text-black static items-end text-end w-full'>
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
          <div style={{ height: '400px', margin: '20px', width: '1200px' }}>
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


<div className="flex space-x-3">
                <div className="flex-1 relative overflow-x-auto shadow-md sm:rounded-lg">
                    <h2>Your Attempts</h2>
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
                                <tr key={item['problemId']} className={'hover:bg-red-300'}>
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
                                        <button onClick={() => handleViewDetails(item)} className='bg-[#FD4F00] text-white rounded-xl h-10 py-2 text-sm mx-1'>View Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {selectedAttempt && (
                    <div className="flex-1 details-section bg-white shadow-md sm:rounded-lg p-4">
                        <h2>Attempt Details</h2>
                        <p><strong>Problem ID:</strong> {selectedAttempt.problemId}</p>
                        <p><strong>Code:</strong> {selectedAttempt.code}</p>
                        <p><strong>Compiler Output:</strong> {selectedAttempt.coutput}</p>
                        <p><strong>Output:</strong> {selectedAttempt.output}</p>
                        <p><strong>Result:</strong> {selectedAttempt.result}</p>
                        <p><strong>Date:</strong> {(selectedAttempt.createdAt as string).split('T')[0]}</p>
                    </div>
                )}
                </div>
      </>
    )
  }