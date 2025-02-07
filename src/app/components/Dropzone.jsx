'use client'
import { CircleX } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import { useDropzone } from 'react-dropzone';
'../globals.css'

const Dropzone = () => {
    const [files, setFiles] = React.useState([])
    const [rejected, setRejected] = React.useState([])

    const onDrop = React.useCallback((acceptedFiles, rejectedFiles) => {
        if(acceptedFiles?.length){
            setFiles(previousFiles => [
                ...previousFiles,
                ...acceptedFiles.map(file => 
                    Object.assign(file, {preview: URL.createObjectURL(file)})
                )
            ])
        }
        
        if(rejectedFiles?.length){
            setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
        }
    },[])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({ 
        onDrop,
        accept: {
            'image/png': ['png', '.jpg'],
        },
        maxSize: 500 * 1000
    });

    const removeAccepted = (fileName) => {
        setFiles(files.filter(file => file.name !== fileName))
    }

    const removeRejected = name => {
        setRejected(files => files.filter(({ file }) => file.name !== name))
    }

  return ( <>
    <form>
      <div className='dropzone' {...getRootProps()}>
        <input {...getInputProps()} />
        {
            isDragActive ? (
                <p>Dropping the file here ...</p>
            ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
            )
        }
      </div>
    </form>
  
  {/* Accepted Files */}
  <h3 className='title text-lg font-semibold text-neutral-600 border-b-2 mt-[50px]'>
    Accepted Files
  </h3>
  <ul className='flex items-center gap-[40px] flex-wrap mt-[10px]'>
    {files.map(file => (
        <li 
        className='relative w-32 h-32 rounded-md shadow-lg' 
        key={file.name}
        >
            <Image
            src={file.preview} 
            alt={file.name} 
            width={100} 
            height={100} 
            onLoad={() => {
                URL.revokeObjectURL(file.preview)
            }}
            className='w-full h-full object-cover rounded-md'
            />
            <button 
            type='button' 
            className='absolute top-0 right-0 border-none bg-white p-[3px] pointer rounded-sm'
            onClick={() => removeAccepted(file.name)}>
                <CircleX/>
            </button>
            <p className='mt-[2px] text-neutral-500 text-[12px] font-medium'>
                {file.name}
            </p>
        </li>
    ))}
  </ul>


  {/* Rejected Files */}
  <h3 className='title text-lg font-semibold text-neutral-600 border-b-2 mt-[50px]'>
    Rejected Files
  </h3>
  <ul className='flex flex-col'>
    {rejected.map(({file, errors}) => (
        <li 
        className='flex items-center justify-between mt-2' 
        key={file.name}
        >
            <div>
                <p className='mt-[2px] text-neutral-500 text-sm font-medium'>
                    {file.name}
                </p>
                <ul className='text-[12px] text-red-500'>
                    {
                        errors.map(error => (
                            <li key={error.code}>{error.message}</li>
                        ))
                    }
                </ul>
            </div>
            <button 
            type='button' 
            className='border-[1px] border-red-500 p-[5px_20px] rounded-md uppercase text-red-500'
            onClick={() => removeRejected(file.name)}>
                remove
            </button>
        </li>
    ))}
  </ul>
  </>
  )
}

export default Dropzone
