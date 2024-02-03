import {useState ,  useCallback, useEffect, useRef} from 'react'
import './App.css'

function App() {
  const [length , setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [CharAllowed , setCharAllowed] = useState(false);
  const [password , setPassword] = useState(" ");

  // useRef hook 
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnpqrstwvxyz"

    if(numberAllowed) str +="0123456789";
    if(CharAllowed) str +="~!@#$%&*?/<>|";

    for(let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)

    }
    setPassword(pass)

  }, [length, numberAllowed,CharAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {passwordGenerator()} , [length, numberAllowed, CharAllowed, passwordGenerator])

  return (
    <>

      
      <div className='w-full max-w-md mx-auto shadow-lg rounded-lg px-4 py-8 my-8     text-500 bg-slate-800'> 

        <h2 className='text-4xl mt-7 text-center text-white mb-8'>Password Generator</h2>
        <div className='flex shadow-lg rounded-lg overflow-hidden mb-4'>     
        <input 
          type="text" 
          value={password}
          className='outline-none w-full py-2 px-2'
          placeholder='Password'
          readOnly
          ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard}
          className='outline-none bg-orange-500 text-white px-4 shrink-0 cursor-pointer'>Copy</button>
          
        </div>
        <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input type="range"
              min={6}
              max={100}
              value={length}
              className='cursor--pointer'
              onChange={(e) => {setLength(e.target.value)}}
              />
              <label className='text-orange-500'>Length: {length}</label>
            </div>

          <div className=' text-center gap-x-1 pl-3'>
            <input 
              type="Checkbox" 
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => {setNumberAllowed((prev) => !prev); }}
            />
          <label className='text-orange-500 ml-2'>Numbers</label>
        </div>
          <div className=' text-center gap-x-1 pl-4'>
          <input 
          type="Checkbox" 
          defaultChecked={CharAllowed}
          id='numberInput'
          onChange={() => {setNumberAllowed((prev) => !prev); }}
          />
          <label className='text-orange-500 ml-2'>Characters</label>
        </div>
        </div>
     </div> 
   
    </>
  )
}

export default App
