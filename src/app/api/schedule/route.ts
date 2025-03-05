import { NextResponse } from 'next/server';
import { getSchedule } from '@/action/get-anime'; 
import { format } from 'date-fns';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date') || format(new Date(), 'yyyy-MM-dd');

  try {
    const data = await getSchedule(date);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching schedule:', error);
    return NextResponse.error();
  }
}
