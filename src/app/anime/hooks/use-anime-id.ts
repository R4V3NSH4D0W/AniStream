import { useParams } from "next/navigation";
export const useAnimeId=()=>{
    const params= useParams();
    return params.id as string;
}