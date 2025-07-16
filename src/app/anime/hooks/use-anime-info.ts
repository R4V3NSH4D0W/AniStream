"use client";
import { getAnimeInfo } from '@/action/get-anime';
import { IAnimeResult } from '@consumet/extensions';
import  { useEffect, useState } from 'react'

export default function useAnimeInfo(id:string) {
    const [loading, setLoading]= useState(true);
    const [animeInfo, setAnimeInfo]= useState<IAnimeResult | undefined>()
    const [error,setError]= useState<string>();

    useEffect(()=>{
    const featchAnimeInfo=async()=>{ 
        if(!id){
            throw new Error("undefined Anime Id");
        }
        try{
            const response = await getAnimeInfo(id);
            if(response){
                setAnimeInfo(response);
            }
            setLoading(false);
        }catch(error){
            setLoading(false);
            setError(error as string);
        }
     }
        featchAnimeInfo();
    },[id])


  return {
    loading,animeInfo,error 
  }
}

