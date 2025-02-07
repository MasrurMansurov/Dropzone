import Dropzone from './components/Dropzone';

export default function Home() {
  return (
    <div className='max-w-[1000px] m-auto'>
    <h1 className='font-black text-[25px]'>Upload File</h1>
    <Dropzone/>
    </div>
  );
}
