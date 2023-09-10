import { NextResponse, NextRequest } from 'next/server';

export const GET = async () => {
  try {
    const respnse = NextResponse.json({
      message: 'Logout succesfull',
      success: true,
    });
    respnse.cookies.set('token', '', { httpOnly: true, expires: new Date(0) });
    return respnse
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
};
